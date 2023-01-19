class StartPageScene {
  private game: IGame
  
  constructor(game: IGame) {
    this.game = game;
  }

  public update() {
    // this.game.playAgain()
    let canvas = document.getElementById("defaultCanvas0");
    canvas?.addEventListener("click", () => {
      gameHandler.activeScene = "play";
      });
  }

  public draw() {
    background("blue");
  }

  public renderStartPage() {}
  public playGame() {}
  public displayCredits() {}
}
