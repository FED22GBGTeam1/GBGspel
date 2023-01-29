class Button {
  private text: string;
  private position: p5.Vector;
  private size: p5.Vector;
  private mouseWasPressed: boolean;
  private color: string;

  constructor(text: string, position: p5.Vector, size: p5.Vector) {
    this.text = text;
    this.position = position;
    this.size = size;
    this.mouseWasPressed = false;
    this.color = "rgb(253,2,47)";
  }

  public update() {

    
    const leftSide = this.position.x;
    const rightSide = this.position.x + this.size.x;
    const topSide = this.position.y;
    const bottomSide = this.position.y + this.size.y;


    // hover-effect:
    if (mouseX > leftSide && mouseX < rightSide && mouseY > topSide && mouseY < bottomSide) {
      this.color = "rgb(225, 199, 0)";
    } else {
      this.color = "rgb(253,2,47)";
    }

    // hur vet jag om användaren tryckte på knappen?
    const isMousePressed = !this.mouseWasPressed && mouseIsPressed;

    if (isMousePressed) {

      if (mouseX > leftSide && mouseX < rightSide && mouseY > topSide && mouseY < bottomSide) {
        return true;
      }
    }

    this.mouseWasPressed = mouseIsPressed;
    return false;
  }

  public draw() {
    push()
    stroke(225, 199, 0)
    strokeWeight(3)
    fill(this.color);
    rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
    //fill('black')
    pop()

    push()
    fill(255,255,255)
    textAlign(CENTER, CENTER)
    textFont(fonts.strawberry);
    textSize(26);
    text(this.text, this.position.x, this.position.y, this.size.x, this.size.y);
    pop();
  }
}