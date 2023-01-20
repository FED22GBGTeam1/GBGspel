class GameOverScene {
 private game: IGame
  private playAgainButton: Button

    constructor(game: IGame) {
     this.game = game
     this.playAgainButton = new Button('Play Again', new p5.Vector(width / 2 -100, height / 2), new p5.Vector(200, 40));
    }

    public playGame() {

    }

    public startMenu() {

    }

    public finalResult () {

    }
   
    public update() {
      this.playAgainButton.update()
    }

    public draw() {
      background(50, 145, 300)
      //text game over
      push()
      textAlign(CENTER)
      textSize(42)
      text('GAME OVER', width / 2, height / 2 - 100)
      //play button
      textSize(32)
      this.playAgainButton.draw();
      //highSCore
      textSize(32)
      text("High Score: " + this.game.highScore.valueOf(), width / 2, height / 2 -45);
      pop()
    } 
}











