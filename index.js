document.addEventListener("DOMContentLoaded", () => {
  scroller = new Scroller("#root");

  document.addEventListener("wheel", (event) => scroller.listenScroll(event));
});
