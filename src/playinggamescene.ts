class PlayingGameScene {
//   private score: number;
//   private distance: number;
//   private fishAmount: number;

//   public isGameOver: boolean;
//   public isGamePaused: boolean;

//   private startingSpeed: number;
//   private currentSpeed: number;
//   private acceleration: number;

//   private gameObjects: Gameobject[];
//   private backgroundObjects: Gameobject[];

//   private timeElapsed: number;

//   constructor(
//     score: 0,
//     distance: 0,
//     fishAmount: 0,
//     isGameOver: false,
//     isGamePaused: false,
//     currentSpeed: currentSpeed
//   ) {
//     this.score = score;
//     this.distance = distance;
//     this.fishAmount = fishAmount;
//     this.isGameOver = isGameOver;
//     this.isGamePaused = isGamePaused;
//     this.currentSpeed = currentSpeed;
//     this.startingSpeed = currentSpeed;
//     this.acceleration = 0;
//     this.gameObjects = [];
//     this.backgroundObjects = [];
//     this.timeElapsed = 0;

    
//   }
  public update() {
    //Pausa spel, Rör på banan, öka accelation, uppdatera score/fiskar, pause/unpause. 
    // this.spawnObjects();
  }
  public draw() {
    background("green");
    character.draw();
    character.update();
    building.draw();
    building.update();

    //Rita ut spelobjekt och bakgrundsobjekt, samt karaktär
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
