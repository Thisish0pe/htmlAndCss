$(function () {
  let $menu = $("#top_menu ul li"),
    $contents = $("#contents > div");

  //menu클릭 시 해당 요소 클래스명 on 추가
  $menu.click(function (x) {
    x.preventDefault();
    let idx = $(this).index();
    let section = $contents.eq(idx);
    let sectionDistance = section.offset().top;
    $("html,body").stop().animate({ scrollTop: sectionDistance });
  });
  // 스크롤 혹은 메뉴 바 선택 시 메뉴 버튼 색상 변경
  $(window).scroll(function () {
    $contents.each(function () {
      if ($(this).offset().top <= $(window).scrollTop()) {
        let idx = $(this).index();
        $menu.removeClass("on");
        $menu.eq(idx).addClass("on");
      }
    });
  });
});
