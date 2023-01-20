
class PlayingGameScene {
  //   private score: number;
  //   private distance: number;
  //   private fishAmount: number;
  
  //   public isGameOver: boolean;
  //   public isGamePaused: boolean;
  
  public startingSpeed: number;
  //   private currentSpeed: number;
  //   private acceleration: number;
  public position: p5.Vector;
  private gameObjects: Gameobject[];
  //   private backgroundObjects: Gameobject[];
  private character: Character;

  //   private timeElapsed: number;
  public timeElapsed: number

  constructor() {
    this.startingSpeed = 4;
    this.position = createVector(0, 0)
    this.character = new Character(createVector(50,300), createVector(175, 85), "./assets/katt.png", 0);
    this.gameObjects = [];
    this.timeElapsed = 0;
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
 

  public update() {
    //Pausa spel, Rör på banan, öka accelation, uppdatera score/fiskar, pause/unpause.
    // this.spawnObjects();
    this.character.update();


    for (const gameObject of this.gameObjects) {
      gameObject.update(this.startingSpeed);
    }
    this.detectCollision();
    this.spawnObjects();

 
    
  }
  public draw() {
    background(50, 145, 300);
    this.character.draw();
    for (const gameObject of this.gameObjects) {
      gameObject.draw();
    }

  }


  public spawnObjects() {
      this.timeElapsed += deltaTime;
      if (this.timeElapsed > 1000) {
              if (random(2) < 0.015) {
                  this.gameObjects.push(
                      new Building(createVector(windowWidth, windowHeight - random(50, 600)),
                          createVector(random(150, 350), 700),
                          "assets/building.png", 0)
                  );
              } else if (random(10) > 0.015 && random(10) < 0.020) {
                  this.gameObjects.push(
                      new Building(createVector(windowWidth, windowHeight - random(100, 500)),
                          createVector(random(100, 350), 500),
                          "assets/tower.png", 0)
                  );
              } else if (random(10) > 0.030 && random(10) < 0.032) {
                  this.gameObjects.push(
                      new Building(createVector(windowWidth, windowHeight - 200),
                          createVector(random(200, 450), 200),
                          "assets/vagn.png", 0)
                  );
                  
              }

          }
      }
  public detectCollision() {
    //upptäck kollision mellan spelare och byggnader/fiender
    for (const gameObject of this.gameObjects ) {
      if (
        this.character.position.x + 125 > gameObject.position.x &&
        this.character.position.x < gameObject.position.x + gameObject.size.x &&
        this.character.position.y +75 > gameObject.position.y &&
        this.character.position.y < gameObject.position.y + gameObject.size.y
      ) {
        this.character. isAlive = false;
      }
    }  
    if (this.character.isAlive === false) {
      gameHandler.activeScene = "over";
    }
    if (this.character.isAlive === true) {
      gameHandler.activeScene = "play";
    }
  }
}

