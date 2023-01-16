class GameScene {
  private score: number;
  private distance: number;
  private fishAmount: number;

  public isGameOver: boolean;
  public isGamePaused: boolean;

  private startingSpeed: number;
  private currentSpeed: number;
  private acceleration: number;

  private gameObjects: Gameobject[];
  private backgroundObjects: Gameobject[];

  constructor(
    score: number,
    distance: number,
    fishAmount: number,
    isGameOver: boolean,
    isGamePaused: boolean,
    currentSpeed: number
  ) {
    this.score = score;
    this.distance = distance;
    this.fishAmount = fishAmount;
    this.isGameOver = isGameOver;
    this.isGamePaused = isGamePaused;
    this.currentSpeed = currentSpeed;
    this.startingSpeed = currentSpeed;
    this.acceleration = 0;
    this.gameObjects = [];
    this.backgroundObjects = [];
  }
  public update() {
    //Pausa spel, Rör på banan, öka accelation, uppdatera score/fiskar, pause/unpause. 

  }
  public draw() {
    //Rita ut spelobjekt och bakgrundsobjekt, samt karaktär
  }
  public spawnObjects() {
    //spawna nya spelobjekt
  }
  public detectCollision() {
    //upptäck kollision mellan spelare och byggnader/fiender
  }
}
