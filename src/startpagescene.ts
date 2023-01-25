class StartPageScene {
  private game: IGame
  public startButton: Button;

  constructor(game: IGame) {
    this.game = game;
    this.startButton = new Button("Start Game!", createVector(width/2-100, height/2-50), createVector(200,100));
  }

  public playAgain() {
    
    const wasPressed = this.startButton.update();
    if (wasPressed) {
      this.game.playAgain();
    }

  }


  public draw() {
    background(50, 145, 300);
    textSize(32);
    textAlign(CENTER, CENTER)
    text("Flying Cat Game", width/2, height/2-200);

    this.startButton.draw();
    image(images.controls, width/2-(1508/5), height/2+100, 1508/2.5, 586/2.5);

  }

  public renderStartPage() {}
  public playGame() {}
  public displayCredits() {}



}


