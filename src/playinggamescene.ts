
class PlayingGameScene {

  //   private score: number;
  //   private distance: number;

  //   public isGameOver: boolean;
  //   public isGamePaused: boolean;

  public startingSpeed: number;
  private acceleration: number;

  private game: IGame
  //   private currentSpeed: number;

  public position: p5.Vector;
  private gameObjects: Gameobject[];
  private backgroundObjects: Gameobject[];
  private character: Character;
  private buildings: Building;

  private enemies: Enemy[];
  private bullets: Bullet[];

  private musicTimeout: number;

   /**
   * Checks the time when the game starts.
   */
   private startTime: number;
   /**
    * How long the game went on for.
    */
   public elapsedTime: number;

  /**
   * Array of fish.
   */
  private fishes: Item[];
  /**
   * Amount of fish gathered.
   */
  public fishAmount: number;
  /**
   * Array of power ups.
   */
  private powerUps: Powerup[];

  private time: number;
  

  //   private timeElapsed: number;
  //public timeElapsed: number

  constructor(game: IGame) {
    this.game = game
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
    this.bullets = []
    this.gameObjects = [];
    this.backgroundObjects = [];
    this.enemies = [];
    this.buildings =  new Building(createVector(width, height-100*(678/146)), createVector(100, 100*(678/146)), 'assets/building.png', -1);

    this.fishes = [];
    this.fishAmount = 0;

    this.acceleration = 0.1; 

    this.powerUps = [];

    this.time = 0;

    this.musicTimeout = 1200000;

    this.startTime = Date.now();
    this.elapsedTime = 0;
  }
  
  //     currentSpeed: currentSpeed
  //     this.currentSpeed = currentSpeed;
  
  //     this.gameObjects = [];
  //     this.backgroundObjects = [];
  
  
  public update() {
    this.time -= deltaTime;
    this.musicTimeout += deltaTime;
    this.trackTime();
    this.playBackgroundMusic(sounds.hast);
    //Pausa spel, Rör på banan, öka accelation, uppdatera score/fiskar, pause/unpause.
    // this.spawnObjects();
    this.character.update();
    this.createClouds();
    // this.createBuildings();
    this.createEnemys();
    this.createFish();
    this.createPowerUp();
    this.updateEntities();
    this.detectCollision();
    this.collectedItem();
    
    this.acceleration += 0.0001;
    
    this.collectedPowerup();
    this.amIPowerful();
    //this.updateCharacterImage();  
    this.renderBullets();
    this.enemyCrash();
    this.enemyShot();

  }

  /**
   * Calculates how long the game went on for.
   */
  private trackTime() {
    this.elapsedTime = Date.now() - this.startTime;
    //console.log(this.elapsedTime);

  }

  /**
   * Checks for updates to the different game objects.
   */
  private updateEntities() {
    for (const gameObject of this.gameObjects) {
      gameObject.update(this.startingSpeed + this.acceleration);
    }
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.update(this.startingSpeed + this.acceleration);
    }
    for (const fish of this.fishes) {
      fish.update(this.startingSpeed + this.acceleration);
    }

    for (const powerup of this.powerUps) {
      powerup.update(this.startingSpeed);
    }
    for (const enemy of this.enemies) {
      enemy.update(this.startingSpeed);
      
    }
    for (const bullet of this.bullets) {
      bullet.update(bullet.velocity);
    }
    this.buildings.update(this.startingSpeed + this.acceleration);
    console.log(this.character.isShooting)
  }

  /**
   * creates bullets when the character is shooting
   */
  public renderBullets() {
    if(this.character.isShooting === true && this.character.shootTimeout < 0) {
      this.bullets.push(new Bullet(new p5.Vector(this.character.position.x, this.character.position.y),
      new p5.Vector(10, 10),
      "assets/bullet.png",
      30))
      //this.character.shootTimeout = 1000;
      this.character.isShooting = false;
    }
}
  /**
   * Creates buildings and pushes them into an array.
   */
  // private createBuildings() {

  //   // new Building(createVector(width+width, height-100*(678/146)), createVector(100, 100*(678/146)), 'assets/building.png', 0));
    
  // }

  /**
   * Create clouds and push them into an array.
   */
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

  /**
   * Creates enemies and pushes them into an array.
   */
  private createEnemys() {
    if (random(2) < 0.015) {
      this.enemies.push(new Enemy(
        new p5.Vector(width, random(height)),
        new p5.Vector(100, 100),
        "assets/seagull.png",
        random(6),
        4,
        200
      ))
    }
  }

  /**
   * Creates fish and pushes them into an array.
   */
  private createFish() {
    if (random(2) < 0.012) {
      this.fishes.push(new Item(
        new p5.Vector(width, random(height)),
        new p5.Vector(150*(449/384), 150),
        "assets/fisk.jpg",
        random(3),
      ))
    }
  }
  /**
   * Creates powerups and pushes them into an array.
  */
 private createPowerUp() {
   if (random(2) < 0.012) {
     this.powerUps.push(new Powerup(
       new p5.Vector(width, random(height)),
       new p5.Vector(150*(612/408), 150),
       "assets/boat.png",
       random(3),
       5000,
      ))
    }
  }

  /**
   * Draws out the gamescene.
   */
  public draw() {
    background(50, 145, 300);
    //sounds.hast.play();
    this.drawEntities();
    this.character.draw();
    
  }

  private drawEntities() {
    for (const gameObject of this.gameObjects) {
      gameObject.draw();
    }
    for (const enemies of this.enemies) {
      enemies.draw();
    }
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.draw();
    }
    for (const fish of this.fishes) {
      fish.draw();
    }
    for (const powerup of this.powerUps) {
      powerup.draw();
    }
    for (const bullet of this.bullets) {
      bullet.draw();
    }
    this.buildings.draw();

  }

  /**
   * Checks for collisions with deadly objects.
   */
  private detectCollision() {
    //upptäck kollision mellan spelare och byggnader/fiender
    if (
      this.character.position.x + this.character.size.x >
      this.buildings.position.x &&
      this.character.position.x < this.buildings.position.x + this.buildings.size.x &&
      this.character.position.y + this.character.size.y >
      this.buildings.position.y &&
      this.character.position.y < this.buildings.position.y + this.buildings.size.y
    ) {if (this.character.poweredUp === false) {
        this.character.isAlive = false;
      }
    }

    for (const gameObject of this.gameObjects) {
      if (
        this.character.position.x + this.character.size.x >
        gameObject.position.x &&
        this.character.position.x < gameObject.position.x + gameObject.size.x &&
        this.character.position.y + this.character.size.y >
        gameObject.position.y &&
        this.character.position.y < gameObject.position.y + gameObject.size.y
      ) {if (this.character.poweredUp === false) {
          this.character.isAlive = false;
        }
      }
    }
    for (const enemy of this.enemies) {
      if (
        this.character.position.x + this.character.size.x >
        enemy.position.x &&
        this.character.position.x < enemy.position.x + enemy.size.x &&
        this.character.position.y + this.character.size.y >
        enemy.position.y &&
        this.character.position.y < enemy.position.y + enemy.size.y
      ) {if (this.character.poweredUp === false) {
          this.character.isAlive = false;
        }
      }
    }
    if (this.character.isAlive === false && this.character.poweredUp === false) {
      this.startingSpeed = 0;
      for (const gameobject of this.gameObjects) {
        gameobject.velocity = 0
        
      } 
      for (const enemy of this.enemies) {
        enemy.velocity = 0
        
      } 
      setTimeout(() => {
        sounds.hast.stop();
        //Behöver skapa en ny instans av gameover vid varje gameover.
        //this.playBackgroundMusic(sounds.another);
        this.game.goToGameOver();
        //gameHandler.activeScene = "over";
      }, 450);
    }
  }
  /**
   * Checks for collisions with collectable fish.
   */
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

  /**
   * Checks for collision with collectable powerups.
   */
  private collectedPowerup() {

    for (let i = 0; i < this.powerUps.length; i++) {
      if (
        this.character.position.x + this.character.size.x > this.powerUps[i].position.x &&
        this.character.position.x < this.powerUps[i].position.x + this.powerUps[i].size.x &&
        this.character.position.y + this.character.size.y > this.powerUps[i].position.y &&
        this.character.position.y < this.powerUps[i].position.y + this.powerUps[i].size.y
      ) {
        ;
        this.time = 5000;
        this.powerUps.splice(i, 1);
        this.character.poweredUp = true;
        break;
      }
    }
  }
  private enemyCrash() {
    
    for (let i = 0; i < this.enemies.length; i++) {
      if ( 
        this.character.position.x + this.character.size.x > this.enemies[i].position.x &&
        this.character.position.x < this.enemies[i].position.x + this.enemies[i].size.x &&
        this.character.position.y + this.character.size.y > this.enemies[i].position.y &&
        this.character.position.y < this.enemies[i].position.y + this.enemies[i].size.y
        && this.character.poweredUp === false
      ) {
        this.enemies[i].image = images.redExplosion
        this.enemies[i].totalFrames = 8
        this.enemies[i].framesDuration = 80
        //this.enemies.splice(i, 1)
        break;
      }
    }
  }
  
  public enemyShot() {
    let collisionDistance = 100
    for (let i = 0; i < this.bullets.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        
        if (this.bullets[i].position.dist(this.enemies[j].position) < collisionDistance) {
          this.bullets.splice(i, 1);
         
          //i--;
          this.enemies.splice(j, 1);
          //j--;
          //if (this.bullets[i].position.x > width || this.bullets[i].position.x < 0) {
          //  this.bullets.splice(i, 1);
          //}
        }
      }

    }
  }
  /**
   * Checks if the player have the immortal powerup active or not.
   */
  private amIPowerful() {
    if (this.time < 0) {
      this.character.poweredUp = false;
    }
  }

  public playBackgroundMusic(sound: p5.SoundFile) {
    if (this.musicTimeout > 1200000) {
      sound.play();
      sound.loop();
      this.musicTimeout = 0;
    }
  }

}


