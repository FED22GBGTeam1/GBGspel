class StartPageScene {
  private game: IGame
  public startButton: Button;
  private musicTimeout: number;


  constructor(game: IGame) {
    this.game = game;

    this.musicTimeout = 1200000;
    this.startButton = new Button("Start Game!", createVector(width/2-100, height/2-50), createVector(200,100));

    this.startButton = new image((images.startButton), createVector(width/2-100, height/2-50), createVector(200,100));

  }

  public playAgain() {
    
    const wasPressed = this.startButton.update();
    if (wasPressed) {
      sounds.another.stop();
      this.game.playAgain();
    }

  }

  public update() {
    this.musicTimeout += deltaTime;
    this.playBackgroundMusic(sounds.another);
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

  public playBackgroundMusic(sound: p5.SoundFile) {
    if (this.musicTimeout > 1200000) {
      sound.play();
      sound.loop();
      this.musicTimeout = 0;
    }
  }

}


