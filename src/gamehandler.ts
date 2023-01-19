class GameHandler implements IGame {

  //private music: string;

  //Ska bytas till highScore istället för nummer.
  public highScore: number;
  public activeScene: "start" | "play" | "over";

  private startPageScene: StartPageScene;
  private playingGameScene: PlayingGameScene;
  private gameOverScene: GameOverScene;

  constructor() {
    this.highScore = 0;
    this.activeScene = "start";
    //this.music = "music";
    this.startPageScene = new StartPageScene(this);
    this.playingGameScene = new PlayingGameScene();
    this.gameOverScene = new GameOverScene();
  }

  public playAgain() {
    this.playingGameScene = new PlayingGameScene();
    this.activeScene = "play";
  }

  /** Gör förändringar på klassens attribut */
  public update() {
    switch(this.activeScene) {
      case "start":
        this.startPageScene.update()
        break;
      case "play":
        this.playingGameScene.update()
        break;
      case "over":
        this.gameOverScene.update();
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

}

