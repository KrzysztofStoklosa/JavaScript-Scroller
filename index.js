document.addEventListener("DOMContentLoaded", function () {
  const rootElement = document.querySelector("#root");
  const sections = document.querySelectorAll("section");
  let currentSectionIndex = 0;
  let isTrottled = false;

  document.addEventListener("mousewheel", function (event) {
    if (isTrottled) return;
    isTrottled = true;
    setTimeout(function () {
      isTrottled = false;
    }, 1000);
    const direction = event.wheelDelta < 0 ? 1 : -1;
    if (direction === 1) {
      const isLastSecion = currentSectionIndex === sections.length - 1;
      if (isLastSecion) return;
    } else if (direction === -1) {
      const isFirstSection = currentSectionIndex === 0;
      if (isFirstSection) return;
    }
    currentSectionIndex = currentSectionIndex + direction;
    console.log(currentSectionIndex);
    sections[currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
