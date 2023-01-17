class Game {
  // private gameOver: GameOver;
  // private highScore: number;
  public activeScene: string;
  // private music:string;
  
   constructor (activeScene: string) {
  //   this.highScore = 0;
     this.activeScene = activeScene;
     activeScene = "startScene";
  //   this.music = "music";
  //   this.gameOver = new GameOver()

   }

   


  public update() {
  
    let canvas = document.getElementById("defaultCanvas0");
    canvas?.addEventListener("click", () => {
      if (this.activeScene = "gameOverScene") {
        this.activeScene = "startScene";
      }
      console.log("hej");
      this.activeScene = "playingGameScene";
    })

  }
  
  public draw() {
    switch(this.activeScene) {
      case "startScene":
        startScene.draw()
        break;
      case "playingGameScene":
        playingGameScene.draw()
        break;
      case "gameOver":
        gameOverScene.draw();
        break;
      default:  
      //console.log("scene doesn't exist")     
    }
   
    
    // character.update();
    // character.draw();
    // building.draw();
    // building.update();
  }

  public openInstructions(){

  }
  public displayCredits(){

  }
  public toggleMusic() {

  }

}

 
    // this.drawText();
    // if (this.isCircleVisible) {
    //   this.drawCircle();
    // }
  // }

  // public drawText() {
    // push();
    // fill('white');
    // textSize(width * 0.1);
    // textStyle('bold');
    // textAlign('center');
    // text('Click & Drag', width * 0.5, height * 0.5);
    // pop();
  // }

  //public drawCircle() {
    // push();
    // fill('green');
    // stroke('white');
    // strokeWeight(width * 0.01);
    // circle(this.position.x, this.position.y, width * 0.2);
    // pop();
//   }
// }
