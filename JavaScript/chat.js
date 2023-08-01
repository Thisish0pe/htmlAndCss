// openAI API
// URL 주소 변경 
let url = `http://127.0.0.1:8000/chatbot/`;

let $form = document.querySelector(".chat-form");

// 사용자의 질문
let question;

// 사용자의 질문을 객체를 만들어서 push
const makePrompt = function () {
  // 국가/지역 값 읽어오기
  let cityInput = document.getElementById("chat-city");
  let city = cityInput.value;

  // 여행 기간 값 읽어오기
  let dateInput = document.getElementById("chat-date");
  let date = dateInput.value;

  // 희망 여행 테마 값 읽어오기
  let themeInput = document.getElementById("chat-theme");
  let theme = themeInput.value;

  // 자동차 유무 값 읽어오기
  let carOptionInputs = document.getElementsByName("car-option");
  let carOption;
  for (let i = 0; i < carOptionInputs.length; i++) {
    if (carOptionInputs[i].checked) {
      carOption = carOptionInputs[i].value;
      break;
    }
  }

  // 메세지 전달 형식 : From user to API
  data.push({
    role: "user",
    content: `여행계획을 만들어줘. 기간:${date}, 지역:${city}, 희망여행테마:${theme},자동차유무:${carOption} \n 이 내용을 기반으로 여행계획을 만들어줘`,
  });
  // console.log(data);
};

// api 요청보내는 함수
const apiPost = async () => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 로컬스토리지 속 토큰에서 유저 토큰 가져오기
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    // DRF 유저 질문 가져오기 (prompt)
    body: JSON.stringify({prompt:data})
  });
  const resultJson = await result.json();
  return resultJson;
};

// submit
$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  makePrompt();
  const resultJson = await apiPost();
  // message에서 text로 변경
  printAnswer(resultJson.choices[0].text);
  document.body.style.cursor = "default";
  $(".loader").fadeOut();
});

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
  let chat_content = document.getElementById("chat-content");
  chat_content.value = answer;
  chat_content.style.fontFamily = "'IBM Plex Sans KR', sans-serif";
  chat_content.style.fontSize = "16px";
};

// 챗 답변들 그려주는 함수 - chatlist
// const test=async()=>{
//   const result = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.getItem("token")}`
//     }
//   });
//   const resultJson = await result.json();
//   document.querySelector("#getlist").append(JSON.stringify(resultJson));
// }

// test()