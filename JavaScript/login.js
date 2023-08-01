function modal(id) {
  let zIndex = 9999;
  let modal = document.getElementById(id);

  // 모달 div 뒤 희미한 레이어
  let bg = document.createElement("div");
  bg.setStyle({
    position: "fixed",
    zIndex: zIndex,
    left: "0px",
    top: "0px",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.4)",
  });
  document.body.append(bg);

  // 닫기 버튼 처리, 희미한 레이어와 모달 div 지우기
  modal
    .querySelector(".modal-close-btn")
    .addEventListener("click", function () {
      bg.remove();
      modal.style.display = "none";
    });

  modal.setStyle({
    position: "fixed",
    display: "block",

    // 희미한 레이어 위에 보이기
    zIndex: zIndex + 1,

    // div center 정렬
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });
}

// Element 에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function (styles) {
  for (let k in styles) this.style[k] = styles[k];
  return this;
};

document.getElementById("login-btn").addEventListener("click", function () {
  // 모달창 띄우기
  modal("login-modal");
});

// DRF 로그인 유저 데이터 가져오기
const $loginForm = document.querySelector("#login-form");
const login = async (id,pw)=>{
  const res = await fetch("http://127.0.0.1:8000/user/auth/",{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username:id,
      password:pw
    })
  })
  const json = await res.json()
  localStorage.setItem("token",json.token.access)
}
$loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const id = document.querySelector("#user-id").value
  const pw = document.querySelector("#user-pw").value
  login(id,pw)
})