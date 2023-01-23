
class PlayingGameScene {
  //   private score: number;
  //   private distance: number;

  //   public isGameOver: boolean;
  //   public isGamePaused: boolean;

  public startingSpeed: number;
  private acceleration: number;
  //   private currentSpeed: number;
  public position: p5.Vector;
  private gameObjects: Gameobject[];
  private backgroundObjects: Gameobject[];
  private character: Character;

  private fishes: Item[]; //ska det vata item?
  public fishAmount: number;


  //   private timeElapsed: number;


  constructor() {
    this.startingSpeed = 5;
    this.acceleration = 0;
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

    this.fishes = [];
    this.fishAmount = 0;
    this.acceleration = 0.1;
    

  }
  //     score: 0,
  //     distance: 0,
  //     isGameOver: false,
  //     isGamePaused: false,
  //     currentSpeed: currentSpeed
  //     this.score = score;
  //     this.distance = distance;
  //     this.fishAmount = fishAmount;
  //     this.isGameOver = isGameOver;
  //     this.isGamePaused = isGamePaused;
  //     this.currentSpeed = currentSpeed;

  //     this.gameObjects = [];
  //     this.timeElapsed = 0;

  public update() {
    //Pausa spel, Rör på banan, öka accelation, uppdatera score/fiskar, pause/unpause.
    // this.spawnObjects();
    this.character.update();
    //this.animation.update();
    this.createClouds();
    this.createBuildings();
    this.createEnemys();
    this.createFish();
    this.updateEntities();
    this.detectCollision();
    this.collectedItem();
    this.acceleration += 0.01;
  }

  private updateEntities() {
    for (const gameObject of this.gameObjects) {
      gameObject.update(this.startingSpeed + this.acceleration);
    }
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.update(this.startingSpeed + this.acceleration);
    }
    for (const fish of this.fishes) {
      fish.update(this.startingSpeed);
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

  private createEnemys(){
    if (random(2) < 0.015){
      this.gameObjects.push(new Enemy(
        new p5.Vector(width, random(height/3)),
        new p5.Vector(random(50,150), random(50, 150)),

        random(3),
        //random(3),
      ))
    }
  }

  private createFish() {
    if (random(2) < 0.012){
      this.fishes.push(new Item(
        new p5.Vector(width, random(height/3)),
        new p5.Vector(random(50,150), random (50, 150)),
        "assets/fisk.jpg",
        random(3),
      ))
    }
  }

  public draw() {
    background(50, 145, 300);
    this.drawEntities();
    this.character.draw();
  }

  private drawEntities() {
    for (const gameObject of this.gameObjects) {
      gameObject.draw();
    }
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.draw();
    }
    for (const fish of this.fishes) {
      fish.draw();
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

  private collectedItem() {
    for (let i = 0; i < this.fishes.length; i++) {
      if (
        this.character.position.x + this.character.size.x > this.fishes[i].position.x &&
        this.character.position.x < this.fishes[i].position.x + this.fishes[i].size.x &&
        this.character.position.y + this.character.size.y > this.fishes[i].position.y &&
        this.character.position.y < this.fishes[i].position.y + this.fishes[i].size.y
      ) {
        this.fishAmount += 1;
        console.log(this.fishAmount);
        this.fishes.splice(i, 1);
        break;
      }
    }
  }
}
