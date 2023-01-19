class StartPageScene {
  private game: IGame
  
  constructor(game: IGame) {
    this.game = game;
  }

  public update() {
    // this.game.playAgain()
  }

  public draw() {
    background("blue");
  }

  public renderStartPage() {}
  public playGame() {}
  public displayCredits() {}
}
