class StartPageScene {
  private game: IGame
  public startButton: Button;
  
  constructor(game: IGame) {
    this.game = game;
    this.startButton = new Button("Start Game!", createVector(width/2-100, height/2-50), createVector(200,100));

  }

  public update() {

    this.startButton.update();
    // // this.game.playAgain()
    // let canvas = document.getElementById("defaultCanvas0");
    // canvas?.addEventListener("click", () => {
    //   gameHandler.activeScene = "play";
    //   });
  }

  public draw() {
    background("blue");
    this.startButton.draw();
  }

  public renderStartPage() {}
  public playGame() {}
  public displayCredits() {}
}
