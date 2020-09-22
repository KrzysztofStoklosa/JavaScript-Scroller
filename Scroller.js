class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector);
    this.sections = document.querySelectorAll("section");
    //change type for array
    this.sectionArr = [...this.sections];

    const currentSectionIndex = this.sectionArr.findIndex(
      this.isScrolledInToView
    );
    this.currentSectionIndex = Math.max(currentSectionIndex, 0);
    // this.currentSectionIndex =
    //  currentSectionIndex < 0 ? 0 : currentSectionIndex;
    console.log(this.currentSectionIndex);
    this.isTrottled = false;
  }

  isScrolledInToView = (el) => {
    // get current el coordination
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = Math.floor(rect.bottom);
    //check is element vissible
    const isVissible = elemTop >= 0 && elemBottom <= window.innerHeight;
    return isVissible;
  };

  listenScroll = (event) => {
    if (this.isTrottled) return;
    this.isTrottled = true;
    setTimeout(() => {
      this.isTrottled = false;
    }, 1000);
    const direction = event.wheelDelta < 0 ? 1 : -1;
    this.scroll(direction);
  };
  scroll(direction) {
    if (direction === 1) {
      const isLastSecion =
        this.currentSectionIndex === this.sections.length - 1;
      if (isLastSecion) return;
    } else if (direction === -1) {
      const isFirstSection = this.currentSectionIndex === 0;
      if (isFirstSection) return;
    }
    this.currentSectionIndex = this.currentSectionIndex + direction;
    this.scrollToCurrentSection();
  }

  scrollToCurrentSection = () => {
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
}
