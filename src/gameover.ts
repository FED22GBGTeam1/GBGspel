class GameOverScene {

    
    constructor(){
   

    }

    public update() {
        let canvas = document.getElementById("defaultCanvas0");
        canvas?.addEventListener("click", () => {
          console.log("TJOBRE");
   
          game.activeScene = "startScene";
        })
     
    }
    public draw() {
      background("red");
      let s = "You lost"
      textSize(32);
      fill(50);
      text(s, 100, 100, 200, 200);
    }

    public playAgain() {
        
    }    
}