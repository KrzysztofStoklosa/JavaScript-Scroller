document.addEventListener("DOMContentLoaded", function () {
  scroller = new Scroller("#root");

  document.addEventListener("mousewheel", scroller.listenScroll);
});
