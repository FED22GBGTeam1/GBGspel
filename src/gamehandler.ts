class GameHandler implements IGame {

  //private music: string;
  
  //Ska bytas till highScore istället för nummer.
  public highScore: number;
  public activeScene: "start" | "play" | "over";
  private startTime: number;

  private startPageScene: StartPageScene;
  private playingGameScene: PlayingGameScene;
  private gameOverScene: GameOverScene;

  constructor() {
    this.highScore = 0;
    this.activeScene = "start";
    this.startTime = Date.now();
    //this.music = "music";
    this.startPageScene = new StartPageScene(this);
    this.playingGameScene = new PlayingGameScene();
    this.gameOverScene = new GameOverScene(this);
  }

  public playAgain() {
    this.playingGameScene = new PlayingGameScene();
    this.activeScene = "play";
  }

  public goToStart() {
    this.startPageScene = new StartPageScene(this);
    this.activeScene = "start";
  }

  /** Gör förändringar på klassens attribut */
  public update() {
    switch(this.activeScene) {
      case "start":
        this.startPageScene.update()
        break;
      case "play":
        this.playingGameScene.update()
        this.trackTime();
        break;
      case "over":
        this.gameOverScene.startMenu();
        this.gameOverScene.update();
        this.stopTimeTracking();
        break;
      default:  
    }
  }

  /** Ritar ut baserat på klassens attribut */
  public draw() {
    switch(this.activeScene) {
      case "start":
        this.startPageScene.draw()
        break;
      case "play":
        this.playingGameScene.draw()
        break;
      case "over":
        this.gameOverScene.draw();
        break;
      default:  
    }
  }

  public toggleMusic() {

  }

  private trackTime() {
    let elapsedTime = Date.now() - this.startTime;
    console.log(elapsedTime);
  }

  //Ska användas för att stanna timern när man får gameover.
  private stopTimeTracking() {
    
  }

}

