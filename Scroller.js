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
    this.isTrottled = false;
    this.drawNavigation();
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
    this.selectActiveClassItem();
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  drawNavigation = () => {
    this.navigationContainer = document.createElement("aside");
    this.navigationContainer.setAttribute("class", "scroller__navigation");
    const list = document.createElement("ul");
    this.sections.forEach((section, index) => {
      const listItem = document.createElement("li");

      listItem.addEventListener("click", () => {
        this.currentSectionIndex = index;
        this.scrollToCurrentSection();
      });

      list.appendChild(listItem);
    });
    this.navigationContainer.appendChild(list);
    document.body.appendChild(this.navigationContainer);
    this.selectActiveClassItem();
  };
  selectActiveClassItem = () => {
    if (this.navigationContainer) {
      const navigationItems = this.navigationContainer.querySelectorAll("li");
      navigationItems.forEach((item, index) => {
        if (index === this.currentSectionIndex) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  };
}
