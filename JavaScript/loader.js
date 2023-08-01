//로딩화면 띠우는 함수
function loader() {
  let isLoading = false;

  // "일정 생성" 버튼 클릭 시 로딩 화면을 표시
  $(".submit-button").on("click", function () {
    isLoading = true;
    $(".loader").fadeIn();
  });

  // 결과값이 출력되는 시점에 로딩 화면을 사라지게 함
  function hideLoader() {
    if (isLoading) {
      $(".loader").fadeOut();
      isLoading = false;
    }
  }

  // 결과값 출력 시 로딩 화면 사라지게 함
  $("#chat-content").on("input", function () {
    hideLoader();
  });
}
loader();
