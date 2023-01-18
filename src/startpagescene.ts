class StartPageScene{
  
  public highScore: IGame;


  constructor(highScore: IGame){
     this.highScore = highScore;

   }

    public update() {
     
    }



    public draw() {
      background("blue");
    }

    public renderStartPage() {
        
    }
    public playGame() {

    }
    public displayCredits() {
        
    }
    
 }

 const testGame = new GameHandler();