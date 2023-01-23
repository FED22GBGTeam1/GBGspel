
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
  private backgroundObjects: Gameobject[];
  private character: Character;
  //private animation : animatedObject

  //   private timeElapsed: number;

  constructor() {
    this.startingSpeed = 5;
    this.position = createVector(0, 0);
    this.character = new Character(
      createVector(50, 300),
      createVector(195, 100),
      "./assets/fly.png",
      10,
      8,
      80
    );
    this.gameObjects = [];
    this.backgroundObjects = [];
    //this.animation = new animatedObject(createVector(50,300), createVector(195, 100), "./assets/fly.png", 0, 8,90)
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
  //     this.timeElapsed = 0;

  public update() {
    //Pausa spel, Rör på banan, öka accelation, uppdatera score/fiskar, pause/unpause.
    // this.spawnObjects();
    this.character.update();
    //this.animation.update();
    this.createClouds();
    this.createBuildings();
    this.updateEntities();
    this.detectCollision();
  }

  private updateEntities() {
    for (const gameObject of this.gameObjects) {
      gameObject.update(this.startingSpeed);
    }
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.update(this.startingSpeed);
    }
  }
  private createBuildings() {
    if (random(2) < 0.015) {
      this.gameObjects.push(
        new Building(
          createVector(windowWidth, windowHeight - random(50, 700)),
          createVector(random(150, 350), 700),
          "assets/building.png",
          0
        )
      );
    }
  }
  private createClouds() {
    if (random(2) < 0.004) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height / 3)),
          new p5.Vector(random(180, 350), random(100, 270)),
          "assets/cloud1.png",
          random(3),
          random(3)
        )
      );
    } else if (random(15) > 14.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height / 3)),
          new p5.Vector(random(250, 400), random(90, 150)),
          "assets/cloud2.png",
          random(3),
          random(3)
        )
      );
    } else if (random(10) > 9.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height / 3)),
          new p5.Vector(random(250, 450), random(100, 150)),
          "assets/cloud3.png",
          random(3),
          random(3)
        )
      );
    }
  }

  public draw() {
    background(50, 145, 300);
    this.character.draw();
    //this.animation.draw();
    this.drawEntities();
  }

  private drawEntities() {
    for (const gameObject of this.gameObjects) {
      gameObject.draw();
    }
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.draw();
    }
  }
  private detectCollision() {
    //upptäck kollision mellan spelare och byggnader/fiender

    for (const gameObject of this.gameObjects) {
      if (
        this.character.position.x + this.character.size.x >
          gameObject.position.x &&
        this.character.position.x < gameObject.position.x + gameObject.size.x &&
        this.character.position.y + this.character.size.y >
          gameObject.position.y &&
        this.character.position.y < gameObject.position.y + gameObject.size.y
      ) {
        this.character.isAlive = false;
      }
    }
    if (this.character.isAlive === false) {
      this.startingSpeed = 0;
      setTimeout(() => {
        gameHandler.activeScene = "over";
      }, 450);
    }
  }
}
