class GameHandler implements IGame {

  //private music: string;

  //Ska bytas till highScore istället för nummer.
  public highScore: number;
  public activeScene: any;
  public gameScene: string;

  constructor() {
    this.highScore = 0;
    this.activeScene = "startScene";
    this.gameScene = "gameScene";
    //this.music = "music";¨
  }

  public update() {
  
    let canvas = document.getElementById("defaultCanvas0");
    canvas?.addEventListener("click", () => {
      this.activeScene = "playingGameScene";
      }); 
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

