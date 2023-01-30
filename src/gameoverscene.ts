class GameOverScene {
  /**
   * Gamehandler being sent over through IGame.
   */
  private game: IGame
  private playAgainButton: Button
  private goToStartButton: Button
  /**
   * Fish and distance added together.
   */
  private finalScore: number;
  private backgroundObjects: Gameobject[];

  /**
   * constructor for the GameOverScene class
   * @param game 
   */
  constructor(game: IGame) {
    this.game = game
    this.finalScore = 0;

    this.playAgainButton = new Button("Play Again", new p5.Vector(width / 2 - 100, height / 2), new p5.Vector(200, 40));
    this.goToStartButton = new Button("Startmenu", createVector(width / 2 - 100, height / 2 +50), createVector(200, 40));
    this.backgroundObjects = [];
  }

  public update() {
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.update(3);
    }

    this.loadStartMenu();
    this.replayGame();
    this.calculateScore();
    this.checkAndSaveScore();
    this.game.fetchHighScore();
    this.createClouds();

    // console.log("test gameover = " + this.game.collectedFish.valueOf())
    // console.log(this.game.elapsedTime.valueOf());
    // console.log(this.finalScore);

  }

  /**
   * Method to draw the gameOverScene
   */
  public draw() {
    background(50, 145, 300)
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.draw();
    }

    //text game over
    push()
    textAlign(CENTER)
    fill(255)
    textSize(42)
    textFont(fonts.strawberry);
    text('GAME OVER', width / 2, height / 2 - 100)
    //buttons
    textSize(32)
    this.playAgainButton.draw();
    this.goToStartButton.draw();
    //highSCore
    textSize(32)
    //text("High Score: " + this.game.highScore.valueOf(), width / 2, height / 2 -45);
    text("Final Score: " + this.finalScore.valueOf(), width / 2, height / 2 - 60);
    text("Fish: " + this.game.collectedFish.valueOf(), width / 2, height / 2 - 140);
    pop()
  }

  /**
  * method to update handle the playAgain button
  */
  public replayGame() {
    const wasPressed = this.playAgainButton.update();
    if (wasPressed) {
      this.game.playAgain();
    }
  }

  /**
   * Method to handle the start menu button
   */
  public loadStartMenu() {
    const wasPressed = this.goToStartButton.update();
    if (wasPressed) {
      this.game.goToStart();
    }
  }

  /**
   * Takes the fish * 200 + distance travelled.
   * @returns number
   */
  public calculateScore() {
    const fishScore = this.game.collectedFish.valueOf() * 200;
    const birdScore = this.game.seagullsKilled.valueOf() * 100;
    this.finalScore = fishScore + birdScore + this.game.elapsedTime.valueOf();
    return this.finalScore;
  }

  public checkAndSaveScore() {
    if (this.finalScore > this.game.highScore) {
      localStorage.setItem("highScore", this.finalScore.toString());
      this.game.highScore = this.finalScore;
    }
  }

  private createClouds() {
    if (random(2) < 0.009) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(180, 450), random(100, 370)),
          images.cloud1,
          random(3),
          random(3)
        )
      );
    } else if (random(15) > 14.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(250, 400), random(90, 150)),
          images.cloud2,
          random(3),
          random(3)
        )
      );
    } else if (random(10) > 9.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(250, 650), random(100, 250)),
          images.cloud3,
          random(3),
          random(3)
        )
      );
    }
  }

}
