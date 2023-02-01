class Button {
  /**
   * Inner text of the button.
   */
  private text: string;
  /**
   * Buttons position.
   */
  private position: p5.Vector;
  /**
   * Buttons size.
   */
  private size: p5.Vector;
  /**
   * Checks if the mouse was pressed or not.
   */
  private mouseWasPressed: boolean;
  /**
   * Inner color of the button.
   */
  private color: string;
  /**
   * The alignment mode for the object.
   */
  private align: p5.RECT_MODE;

  constructor(
    text: string,
    position: p5.Vector,
    size: p5.Vector,
    align: p5.RECT_MODE = CENTER
  ) {
    this.text = text;
    this.position = position;
    this.size = size;
    this.align = align;
    this.mouseWasPressed = false;
    this.color = "rgb(253,2,47)";
  }

  /**
   * Updates the position of the object based on the given `xPos` value
   * and updates the color based on the mouse position.
   * Also checks if the mouse was released and returns `true`
   * if the mouse was released inside the object.
   * @param xPos {number} - The new x position of the object.
   * @returns {boolean} - `true` if the mouse was released inside the object.
   */
  public update(xPos?: number) {
    if (xPos) {
      this.position.x = xPos;
    }

    // Update the calculation of the sides
    let x = this.position.x;
    let y = this.position.y;
    if (this.align !== CORNER) {
      x = this.position.x - this.size.x * 0.5;
      y = this.position.y - this.size.y * 0.5;
    }
    const leftSide = x;
    const rightSide = x + this.size.x;
    const topSide = y;
    const bottomSide = y + this.size.y;

    // Hover-effect:
    if (
      mouseX > leftSide &&
      mouseX < rightSide &&
      mouseY > topSide &&
      mouseY < bottomSide
    ) {
      this.color = "rgb(225, 199, 0)";
    } else {
      this.color = "rgb(253,2,47)";
    }

    // Check if mouse was released:
    const isMouseReleased = this.mouseWasPressed && !mouseIsPressed;
    this.mouseWasPressed = mouseIsPressed;

    if (isMouseReleased) {
      if (
        mouseX > leftSide &&
        mouseX < rightSide &&
        mouseY > topSide &&
        mouseY < bottomSide
      ) {
        return true;
      }
    }
    return false;
  }
  /**
   * Draw the buttons 
   */
  public draw() {
    push();
    rectMode(this.align);
    stroke(225, 199, 0);
    strokeWeight(3);
    fill(this.color);
    rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
    pop();

    push();
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    textFont(fonts.strawberry);
    textSize(26);
    const x = this.align === CORNER ? this.position.x : this.position.x - this.size.x * 0.5;
    const y = this.align === CORNER ? this.position.y : this.position.y - this.size.y * 0.5;
    text(this.text, x, y, this.size.x, this.size.y);
    pop();
  }
}
