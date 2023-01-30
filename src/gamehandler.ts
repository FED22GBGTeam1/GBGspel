class GameHandler implements IGame {

  //private music: string;

  //Ska bytas till highScore istället för nummer.
  public highScore: number;
  public activeScene: "start" | "play" | "over";
  /**
  * How long the game went on for.
  */
  public elapsedTime: number;
  public collectedFish: number;
  public seagullsKilled: number;

  private startPageScene: StartPageScene;
  private playingGameScene: PlayingGameScene;
  private gameOverScene: GameOverScene;

  public musicIsPlaying: boolean;
  public currentSong: p5.SoundFile;


  constructor() {
    this.highScore = 0;
    this.activeScene = "over";
    this.startPageScene = new StartPageScene(this);
    this.playingGameScene = new PlayingGameScene(this);
    this.gameOverScene = new GameOverScene(this);
    this.collectedFish = this.playingGameScene.fishAmount;
    this.seagullsKilled = this.playingGameScene.seagullsKilled;
    this.elapsedTime = this.playingGameScene.elapsedTime;

    this.musicIsPlaying = false;
    this.currentSong = sounds.hast;

  }

  /** Gör förändringar på klassens attribut */
  public update() {
    this.fetchHighScore();

    switch (this.activeScene) {
      case "start":
        //this.startPageScene.playAgain()
        this.startPageScene.update()
        break;
      case "play":
        this.playingGameScene.update()
        break;
      case "over":
        this.gameOverScene.update();
        this.elapsedTime = this.playingGameScene.elapsedTime;
        this.collectedFish = this.playingGameScene.fishAmount;
        this.seagullsKilled = this.playingGameScene.seagullsKilled;
        break;
      default:
    }
  }


  /** Ritar ut baserat på klassens attribut */
  public draw() {
    switch (this.activeScene) {
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

  public playAgain() {
    sounds.another.stop();
    this.musicIsPlaying = false;
    this.playingGameScene = new PlayingGameScene(this);
    this.activeScene = "play";
    this.playMusic(sounds.hast);
  }

  public goToStart() {
    sounds.another.stop();
    this.musicIsPlaying = false;
    this.startPageScene = new StartPageScene(this);
    this.activeScene = "start";
    this.playMusic(sounds.another);
  }

  public goToGameOver() {
    sounds.hast.stop();
    this.musicIsPlaying = false;
    this.gameOverScene = new GameOverScene(this);
    this.activeScene = "over";
    this.playMusic(sounds.another);
  }

  public playMusic(sound: p5.SoundFile) {
    if (this.musicIsPlaying === false) {
      sound.play();
      sound.loop();
      this.currentSong = sound;
      this.musicIsPlaying = true;
    }
  }

  public pauseMusic() {
    if (this.musicIsPlaying === true) {
      this.currentSong.pause();
      this.musicIsPlaying = false;
    } else {
      this.currentSong.play();
      this.musicIsPlaying = true;
    }
  }

  public fetchHighScore() {
    let storedScore = localStorage.getItem("highScore");
    if (storedScore) {
      this.highScore = parseInt(storedScore);
    }

  }
}


