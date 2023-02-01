class GameOverScene {
  /**
   * Gamehandler being sent over through IGame.
   */
  private game: IGame
  private playAgainButton: Button
  private goToStartButton: Button
  private fishScore: number;
  private birdScore: number;
  private scoreColor: string;
  /**
   * Fish and distance added together.
   */
  private finalScore: number;
  private backgroundObjects: Gameobject[];

  private scoreFade: number;
  private pauseMusicButton: Button;

  /**
   * constructor for the GameOverScene class
   * @param game 
   */
  constructor(game: IGame) {
    this.game = game
    this.finalScore = 0;
    this.fishScore = 0;
    this.birdScore = 0;
    this.scoreColor = 'white';
    this.scoreFade = 0;

    this.playAgainButton = new Button("Play Again", new p5.Vector(width / 2 - 100, height / 2 + 150), new p5.Vector(200, 40));
    this.goToStartButton = new Button("Startmenu", createVector(width / 2 - 100, height / 2 + 200), createVector(200, 40));
    this.pauseMusicButton = new Button("Pause", createVector(width / 2 - 100, height / 2 + 250), createVector(200, 40), CORNER);
    this.backgroundObjects = [];
  }

  public update() {
    this.scoreFade += deltaTime;
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.update(3);
    }

    this.loadStartMenu();
    this.replayGame();
    this.calculateScore();
    this.checkAndSaveScore();
    this.game.fetchHighScore();
    this.createClouds();
    this.pauseTheMusic();

  }

  /**
   * Method to draw the gameOverScene
   */
  public draw() {
    background(50, 145, 300)
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.draw();
    }

    push();
    imageMode(CENTER);
    image(images.textbackground, windowWidth / 2, windowHeight / 2 + 5, width / 3, height / 3 + 10);
    image(images.gameover, width / 2, height / 2 - 200)
    pop();
    push();
    imageMode(CENTER);
    textAlign(CENTER);
    textSize(20);
    fill('white');
    textFont(fonts.strawberry);
    text("Current highscore: " + this.game.highScore.valueOf(), width / 2, windowHeight / 2 - 70,)
    textSize(16);
    textAlign(LEFT);
    if (this.scoreFade > 200) {
      text(": " + this.fishScore + " points", width / 2 - 25, windowHeight / 2 + -30,)
      image(images.fisk, width / 2 - 45, windowHeight / 2 - 36, width / 50, height / 38)
    };
    if (this.scoreFade > 700) {
      textAlign(CENTER);
      text("+", width / 2 - 10, windowHeight / 2 + -10,)
    }
    if (this.scoreFade > 1300) {
      textAlign(LEFT);
      image(images.seagullstart, width / 2 - 40, windowHeight / 2 + 5, width / 50, height / 30)
      text(": " + this.birdScore + " points", width / 2 - 25, windowHeight / 2 + 10,)      
    }
    if (this.scoreFade > 1800) {
      textAlign(CENTER);
      text("+", width / 2 - 10, windowHeight / 2 + 30,)           
    }
    if (this.scoreFade > 2300) {
      text("Distance travelled: " + this.game.elapsedTime.valueOf() + " meter", width / 2, windowHeight / 2 + 50,)
      text("=", width / 2 - 10, windowHeight / 2 + 70,)                
    }
    if (this.scoreFade > 2800) {
      textSize(20);
      fill(this.scoreColor);
      text("Your score: " + this.finalScore + "!", width / 2, windowHeight / 2 + 90,)              
    }
      this.goToStartButton.draw();
      this.playAgainButton.draw();
      this.pauseMusicButton.draw();
      pop()                  
    
  }
  /**
  * method to update handle the playAgain button
  */
  public replayGame() {
    const wasPressed = this.playAgainButton.update(width * 0.5);
    if (wasPressed) {
      this.game.playAgain();
    }
  }

  /**
   * Method to handle the start menu button
   */
  public loadStartMenu() {
    const wasPressed = this.goToStartButton.update(width * 0.5);
    if (wasPressed) {
      this.game.goToStart();
    }
  }

  public pauseTheMusic() {
    const wasPressed = this.pauseMusicButton.update()
    if (wasPressed)
    this.game.pauseMusic();
  }

  /**
   * Takes the fish * 200 + distance travelled.
   * @returns number
   */
  public calculateScore() {
    this.fishScore = this.game.collectedFish.valueOf() * 200;
    this.birdScore = this.game.seagullsKilled.valueOf() * 100;
    this.finalScore = this.fishScore + this.birdScore + this.game.elapsedTime.valueOf();
    return this.finalScore;
  }

  public checkAndSaveScore() {
    if (this.finalScore > this.game.highScore) {
      localStorage.setItem("highScore", this.finalScore.toString());
      this.game.highScore = this.finalScore;
      this.scoreColor = 'lightgreen';
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
        )
      );
    } else if (random(15) > 14.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(250, 400), random(90, 150)),
          images.cloud2,
          random(3),
        )
      );
    } else if (random(10) > 9.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(250, 650), random(100, 250)),
          images.cloud3,
          random(3),
        )
      );
    }
  }

}
