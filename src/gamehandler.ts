class GameHandler implements IGame {

  //private music: string;

  //Ska bytas till highScore istället för nummer.
  public highScore: number;
  public activeScene: any;

  constructor() {
    this.highScore = 0;
    this.activeScene = "playingGameScene";
    //this.music = "music";¨
  }

  public update() {
  

  }

  public draw() {
    switch(this.activeScene) {
      case "startScene":
        startPageScene.draw()
        break;
      case "playingGameScene":
        playingGameScene.draw()
        break;
      case "gameOverScene":
        gameOverScene.draw();
        gameOverScene.playAgain();
        break;
      default:  
    }
   
  }

  public toggleMusic() {

  }

}

