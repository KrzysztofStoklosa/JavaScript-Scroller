class Swiper {
  constructor() {
    this.initialX = null;
    this.initialY = null;

    document.addEventListener("touchstart", (event) => this.startTouch(event));
    document.addEventListener("touchmove", (event) => this.moveTouch(event));

    // custom events
    this.events = {
      swipeUp: new Event("swipeUp"),
      swipeDown: new Event("swipeDown"),
      swipeLeft: new Event("swipeLeft"),
      swipeRight: new Event("swipeRight"),
    };
  }
  startTouch(event) {
    event.preventDefault();
    this.initialX = event.touches[0].clientX;
    this.initialY = event.touches[0].clientY;
  }
  moveTouch(event) {
    if (!this.initialX || !this.initialY) return;
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const diffX = this.initialX - currentX;
    const diffY = this.initialY - currentY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      //we are in left-right swipe
      if (diffX > 0) {
        //left swipe
        document.dispatchEvent(this.events.swipeLeft);
      } else {
        //right swipe
        document.dispatchEvent(this.events.swipeRight);
      }
    } else {
      //up-down swipe
      if (diffY > 0) {
        //up swipe
        document.dispatchEvent(this.events.swipeUp);
      } else {
        //down swipe
        document.dispatchEvent(this.events.swipeDown);
      }
    }
    this.initialX = null;
    this.initialY = null;
  }
}
new Swiper();
