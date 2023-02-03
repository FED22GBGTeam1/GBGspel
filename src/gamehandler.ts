class GameHandler implements IGame {
  /**
   * Highest score stored in local storage.
   */
  public highScore: number;
  /**
   * Current scene being displayed.
   */
  private activeScene: "start" | "play" | "over";
  /**
  * How long the game went on for.
  */
  public elapsedTime: number;
  /**
   * Amount of fish gathered.
   */
  public collectedFish: number;
  /**
   * Amount of seagulls killed.
   */
  public seagullsKilled: number;
  /**
   * Start page.
   */
  private startPageScene: StartPageScene;
  /**
   * Game scene.
   */
  private playingGameScene: PlayingGameScene;
  /**
   * Game over page.
   */
  private gameOverScene: GameOverScene;
  /**
   * Checks if background music is currently playing.
   */
  public musicIsPlaying: boolean;
  /**
   * The background song currently being played.
   */
  public currentSong: p5.SoundFile;

  constructor() {
    this.highScore = 0;
    this.activeScene = "start";
    this.startPageScene = new StartPageScene(this);
    this.playingGameScene = new PlayingGameScene(this);
    this.gameOverScene = new GameOverScene(this);
    this.collectedFish = this.playingGameScene.getGameStats("fish");
    this.seagullsKilled = this.playingGameScene.getGameStats("birds");
    this.elapsedTime = this.playingGameScene.getGameStats("meter");
    this.musicIsPlaying = false;
    this.currentSong = sounds.another;
  }

  /**
   * Update the game state.
   */
  public update() {
    this.fetchHighScore();
    switch (this.activeScene) {
      case "start":
        this.startPageScene.update()
        break;
      case "play":
        this.playingGameScene.update()
        break;
      case "over":
        this.gameOverScene.update();
        this.elapsedTime = this.playingGameScene.getGameStats("meter");
        this.collectedFish = this.playingGameScene.getGameStats("fish");
        this.seagullsKilled = this.playingGameScene.getGameStats("birds");
        break;
      default:
    }
  }

  /**
   * Draws other the different pages.
   */
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

  //------------------------------------------------------SCENE SWAPS------------------------------------------------------------------//

  /**
   * Function to go to the playing game scene and play the 'hast' song.
   * The 'another' song is stopped.
   */
  public playAgain() {
    sounds.another.stop();
    this.musicIsPlaying = false;
    this.playingGameScene = new PlayingGameScene(this);
    this.activeScene = "play";
    this.playMusic(sounds.hast);
  }

  /**
   * Function to go to the start scene and play the 'another' song.
   * The 'another' song is stopped.
   */
  public goToStart() {
    sounds.another.stop();
    this.musicIsPlaying = false;
    this.startPageScene = new StartPageScene(this);
    this.activeScene = "start";
    this.playMusic(sounds.another);
  }

  /**
   * Function to go to the game over scene and play the 'another' song.
   * The 'hast' song is stopped.
   */
  public goToGameOver() {
    sounds.hast.stop();
    this.musicIsPlaying = false;
    this.gameOverScene = new GameOverScene(this);
    this.activeScene = "over";
    this.playMusic(sounds.another);
  }

  //------------------------------------------------------MUSIC------------------------------------------------------------------//

  /**
 * Play or stop the given music file, depending on the value of `musicIsPlaying`.
 * 
 * @param {p5.SoundFile} sound - The music file to be played or stopped.
 */
  public playMusic(sound: p5.SoundFile): void {
    if (this.musicIsPlaying === false) {
      sound.play();
      sound.loop();
      this.currentSong = sound;
      this.musicIsPlaying = true;
    } else {
      sound.stop();
      this.musicIsPlaying = false;
    }
  }

  //------------------------------------------------------HIGHSCORE------------------------------------------------------------------//

  /**
   * This function retrieves the high score stored in the local storage.
   */
  public fetchHighScore() {
    let storedScore = localStorage.getItem("highScore");
    if (storedScore) {
      this.highScore = parseInt(storedScore);
    }

  }
}


