let blocks: Building[] = []

class PlayingGameScene {
  //   private score: number;
  //   private distance: number;
  //   private fishAmount: number;

  //   public isGameOver: boolean;
  //   public isGamePaused: boolean;

   private startingSpeed: number;
  //   private currentSpeed: number;
  //   private acceleration: number;

  //   private gameObjects: Gameobject[];
  //   private backgroundObjects: Gameobject[];

  //   private timeElapsed: number;

  constructor(startingSpeed: number)  {
    this.startingSpeed = 2;
  }
  //     score: 0,
  //     distance: 0,
  //     fishAmount: 0,
  //     isGameOver: false,
  //     isGamePaused: false,
  //     currentSpeed: currentSpeed
    //     this.score = score;
    //     this.distance = distance;
    //     this.fishAmount = fishAmount;
    //     this.isGameOver = isGameOver;
    //     this.isGamePaused = isGamePaused;
    //     this.currentSpeed = currentSpeed;
    
    //     this.acceleration = 0;
    //     this.gameObjects = [];
    //     this.backgroundObjects = [];
    //     this.timeElapsed = 0;
  
  public update() {




    //Pausa spel, Rör på banan, öka accelation, uppdatera score/fiskar, pause/unpause.
    // this.spawnObjects();
  }
  public draw() {
    background(50, 145, 300);
    character.draw();
    character.update();


    if(random(2) < 0.01) {
      blocks.push(new Building(createVector(windowWidth, windowHeight-400), createVector(random(150,200),random(200,400)), "./assets/building.png", random(5,10), true))
    }
    
    for(building of blocks) {
      building.draw();
      building.update();
    }
  }
  //   public spawnObjects() {
  //     this.timeElapsed += deltaTime
  //     if (this.timeElapsed > 1000) {

  //     }
  //     //spawna nya spelobjekt
  //   }
  //   public detectCollision() {
  //     //upptäck kollision mellan spelare och byggnader/fiender
  //   }
}
