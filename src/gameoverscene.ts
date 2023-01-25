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

  /**
   * constructor for the GameOverScene class
   * @param game 
   */
  constructor(game: IGame) {
    this.game = game
    this.finalScore = 0;

    this.playAgainButton = new Button("Play Again", new p5.Vector(width / 2 - 100, height / 2), new p5.Vector(200, 40));
    this.goToStartButton = new Button("Startmenu", createVector(width / 2 - 100, height / 2 + 100), createVector(200, 40));
  }

   /**
   * method to update handle the playAgain button
   */
  public replay() {
    const wasPressed = this.playAgainButton.update();
    if (wasPressed) {
      this.game.playAgain();
    }
  }


/**
 * Method to handle the start menu button
 */
  public startMenu() {
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
    this.finalScore = fishScore + this.game.elapsedTime.valueOf();
    return this.finalScore;
  }

 
  public update() {
  
    //this.playMusic(sounds.another);

    this.calculateScore();

    // console.log("test gameover = " + this.game.collectedFish.valueOf())
    // console.log(this.game.elapsedTime.valueOf());
    // console.log(this.finalScore);

  }

  /**
   * Method to draw the gameOverScene
   */
  public draw() {
    background(50, 145, 300)
    //text game over
    push()
    textAlign(CENTER)
    textSize(42)
    text('GAME OVER', width / 2, height / 2 - 100)
    //buttons
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

  public playMusic(sound: p5.SoundFile) {
    if (this.game.musicIsPlaying === false) {
      sound.play();
      this.game.musicIsPlaying = true;
    }
  }
}











