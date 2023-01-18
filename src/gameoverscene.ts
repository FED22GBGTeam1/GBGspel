class GameOverScene {

    constructor(){
   
    }

    public update() {

    }

    

    public draw() {
      background("red");
      let s = "You lost"
      textSize(32);
      fill(50);
      text(s, 100, 100, 200, 200);
    }

    public playAgain() {
      setTimeout(reload, 2000);
    }    
}

const reload = function() {
  location.reload();
}

