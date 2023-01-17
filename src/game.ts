class Game {
  private gameOver: GameOver;
  private highScore: number;
  private activeScene:string;
  private music:string;
  
  constructor () {
    this.highScore = 0;
    this.activeScene = "start";
    this.music = "music";
    this.gameOver = new GameOver()

  }

  public update() {
   
    this.gamescene.update()
  }

  public draw() {
    this.cloud.draw()
    background('darkblue');
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
