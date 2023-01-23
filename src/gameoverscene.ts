class GameOverScene {
  private game: IGame
  private playAgainButton: Button
  private goToStartButton: Button
  private finalScore: number;

  // private collectedFish: number;
  // private elapsedTime;

  constructor(game: IGame) {
    this.game = game

    this.finalScore = 0;
    //  this.collectedFish = game;
    //  this.elapsedTime = game;

    this.playAgainButton = new Button("Play Again", new p5.Vector(width / 2 - 100, height / 2), new p5.Vector(200, 40));
    this.goToStartButton = new Button("Startmenu", createVector(width / 2 - 100, height / 2 + 100), createVector(200, 40));
  }

  // public playAgain() {
  //   const wasPressed = this.playAgainButton.update();
  //   if (wasPressed) {
  //     this.game.playAgain();
  //   }
  // }

  //Till Lisa, varför kan startmenu vara en egen funktion, men playAgain måste ligga i update för att fungera? Se gamehandler, ~rad 24. (this)

  public startMenu() {
    const wasPressed = this.goToStartButton.update();
    if (wasPressed) {
      this.game.goToStart();
    }
  }

  public calculateScore() {
    const fishScore = this.game.collectedFish.valueOf() * 200;
    this.finalScore = fishScore + this.game.elapsedTime.valueOf();
    return this.finalScore;
  }

  public update() {

    const wasPressed = this.playAgainButton.update();
    if (wasPressed) {
      this.game.playAgain();
    }

    this.calculateScore();

    //console.log("test gameover = " + this.game.collectedFish.valueOf())
    // console.log(this.game.elapsedTime.valueOf());
    // console.log(this.finalScore);

  }

  public draw() {
    background(50, 145, 300)
    //text game over
    push()
    textAlign(CENTER)
    textSize(42)
    text('GAME OVER', width / 2, height / 2 - 100)
    //play button
    textSize(32)
    this.playAgainButton.draw();
    this.goToStartButton.draw();
    //highSCore
    textSize(32)
    //text("High Score: " + this.game.highScore.valueOf(), width / 2, height / 2 -45);

    text("Final Score: " + this.finalScore.valueOf(), width / 2, height / 2 - 60);

    text("Fish: " + this.game.collectedFish.valueOf(), width / 2, height / 2 -140);
    pop()
  }
}











