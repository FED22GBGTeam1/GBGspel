class GameHandler implements IGame {

  //private music: string;
  
  //Ska bytas till highScore istället för nummer.
  public highScore: number;
  public activeScene: "start" | "play" | "over";
  /**
   * Checks the time when the game starts.
   */
  private startTime: number;
  /**
   * How long the game went on for.
   */
  public elapsedTime: number;
  public collectedFish: number;

  private startPageScene: StartPageScene;
  private playingGameScene: PlayingGameScene;
  private gameOverScene: GameOverScene;
  

  constructor() {
    this.highScore = 0;
    this.activeScene = "start";
    this.startTime = Date.now();
    this.elapsedTime = 2;
    //this.music = "music";
    this.startPageScene = new StartPageScene(this);
    this.playingGameScene = new PlayingGameScene();
    this.gameOverScene = new GameOverScene(this);
    this.collectedFish = this.playingGameScene.fishAmount;

    //this.playing = sounds.hast.isPlaying();
    
    
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
        this.startPageScene.playAgain()
        this.startPageScene.update()
        break;
      case "play":
        //sounds.hast.play();
        this.playingGameScene.update()
        this.trackTime();
        //this.playBackgroundMusic();
        break;
        case "over":
          this.gameOverScene.startMenu();
          this.gameOverScene.playAgain();
          this.gameOverScene.update();
          this.stopTimeTracking();
          this.collectedFish = this.playingGameScene.fishAmount;
          //console.log('test 2 =' + this.collectedFish);
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
            //this.playBackgroundMusic(sounds.hast);
        break;
      case "over":
        this.gameOverScene.draw();
        break;
      default:  
    }
  }

  public toggleMusic() {

  }

  /**
   * Calculates how long the game went on for.
   */
  private trackTime() {
    this.elapsedTime = Date.now() - this.startTime;
    //console.log(this.elapsedTime);

  }

  //Ska användas för att stanna timern när man får gameover.
  private stopTimeTracking() {
    
  }

  // public playBackgroundMusic() {
  //   if (this.playing === false) {
  //     sounds.hast.play();
  //   }
  // }

  

}



