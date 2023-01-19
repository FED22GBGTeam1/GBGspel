class Button {
  private text: string;
  private position: p5.Vector;
  private size: p5.Vector;

  constructor(text: string, position: p5.Vector, size: p5.Vector) {
    this.text = text;
    this.position = position;
    this.size = size;
  }

  public update() {
    // hur vet jag om användaren tryckte på knappen?
    if (mouseIsPressed) {

      const leftSide = this.position.x;
      const rightSide = this.position.x + this.size.x;
      const topSide = this.position.y;
      const bottomSide = this.position.y + this.size.y;
      console.log(leftSide);
      console.log(rightSide);
      console.log(topSide);
      console.log(bottomSide);
      if (mouseX > leftSide && mouseX < rightSide && mouseY > topSide && mouseY < bottomSide) {
        gameHandler.activeScene = "play";
      }
    }
  }

  public draw() {
    push()
    
    fill('red')
    rect(this.position.x, this.position.y, this.size.x, this.size.y);

    fill("black");
    textSize(28);
    textAlign(CENTER, CENTER)
    text(this.text, this.position.x+100, this.position.y+50);

    pop();
  }
}