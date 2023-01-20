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
    this.color = "white";
  }

  public update() {

    
    const leftSide = this.position.x;
    const rightSide = this.position.x + this.size.x;
    const topSide = this.position.y;
    const bottomSide = this.position.y + this.size.y;


    // hover-effect:
    if (mouseX > leftSide && mouseX < rightSide && mouseY > topSide && mouseY < bottomSide) {
      this.color = "lightgray";
    } else {
      this.color = "white";
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

    fill(this.color);
    rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);

    fill('black')
    textAlign(CENTER, CENTER)
    textSize(26);
    text(this.text, this.position.x, this.position.y, this.size.x, this.size.y);
    

    pop();
  }
}