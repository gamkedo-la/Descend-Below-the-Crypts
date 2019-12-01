class GameState {
  constructor() {
    if (this.constructor === GameState)
      throw new TypeError("Cannot construct abstract class");
  }

  draw() {
    colorRect(0,0,canvas.width,canvas.height, 'black');
  }

  // Abstract functions
  onMouseClick(mouseX, mouseY) {
    throw new TypeError("Do not call static abstract method from child");
  }

  onMouseMove(mouseX, mouseY) {
    throw new TypeError("Do not call static abstract method from child");
  }

  onKeyPress(evt) {
    throw new TypeError("Do not call static abstract method from child");
  }

  onKeyReleased(evt) {
    throw new TypeError("Do not call static abstract method from child");
  }
}
