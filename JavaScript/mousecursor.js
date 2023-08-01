// 커서를 모래시계로 변경하는 함수
function changeCursor() {
  if (!document.getElementById("chat-content").value) {
    document.body.style.cursor = "wait";
  }
}
