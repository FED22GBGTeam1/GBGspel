class PlayingGameScene {
  /**
   * The speed at which entities travel across the screen.
   */
  public startingSpeed: number;
  /**
   * The rate of acceleration of the game entities.
   */
  private acceleration: number;
  /**
   * Instance of Gamehandler, sent through the IGame interface.
   */
  private game: IGame;
  /**
   * The playable character.
   */
  private character: Character;
  /**
   * Array with clouds.
   */
  private backgroundObjects: Gameobject[];
  /**
   * Building entity.
   */
  private building: Building;
  /**
   * Array with enemies.
   */
  private enemies: Enemy[];
  /**
   * Array with bullets.
   */
  private bullets: Bullet[];
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
   * Amount of enemies killed.
   */
  public seagullsKilled: number;
  /**
   * Array of power ups.
   */
  private powerUps: Powerup[];
  /**
   * Tracks the duration for the powerup.
   */
  private time: number;
  /**
   * Image of the city.
   */
  public bg1: CityBackground;
  /**
   * Image of the city.
   */
  public bg2: CityBackground;
  /**
   * Button that will load in the game over scene.
   */
  private calcScoreGameOverButton: Button;
  /**
   * Button that pauses/plays background music.
   */
  private pauseMusicButton: Button;
  /**
   * Checks if a seagull is dead or not.
   */
  public isEnemyDead: boolean;
  /**
   * A timeout for sound effects. (1000 ms)
   */
  private soundEffectTimeOut: number;

  constructor(game: IGame) {
    this.game = game;
    this.startingSpeed = 7;
    this.acceleration = 0;
    this.character = new Character(
      createVector(50, 300),
      createVector(width / 9, height / 10),
      images.katt,
      10,
      8,
      80
    );
    this.bullets = [];
    this.backgroundObjects = [];
    this.enemies = [];
    this.building = new Building(
      createVector(width, height),
      createVector(140, height),
      images.building,
      0
    );
    this.fishes = [];
    this.fishAmount = 0;
    this.seagullsKilled = 0;

    this.acceleration = 0.1;

    this.powerUps = [];
    this.isEnemyDead = false;
    this.time = 0;
    this.soundEffectTimeOut = 1000;
    this.isEnemyDead = false

    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.calcScoreGameOverButton = new Button(
      "Calculate Score",
      new p5.Vector(width / 2, height / 3),
      new p5.Vector(300, 50)
    );
    this.bg1 = new CityBackground(
      createVector(0, 0),
      createVector(width, height),
      images.city,
      1 + this.acceleration
    );
    this.bg2 = new CityBackground(
      createVector(width, 0),
      createVector(width, height),
      images.city,
      1 + this.acceleration
    );
    this.pauseMusicButton = new Button("P", createVector(20, 20), createVector(40, 40), CORNER);
  }

  public update() {
    this.time -= deltaTime;
    this.soundEffectTimeOut -= deltaTime;
    this.acceleration += 0.001;
    this.trackTime();

    this.createClouds();
    this.createEnemys();
    this.createFish();
    this.createPowerUp();

    this.character.update();
    this.updateEntities();

    this.detectCollision();
    this.collectedItem();
    this.collectedPowerup();
    this.spawnBullets();
    this.enemyCrash();
    this.enemyShot();
    this.enemyCrash();
    this.detectOverlap(this.building, this.fishes);

    this.bg1.update();
    this.bg2.update();

    this.removeShootTimeOut();
    this.amIPowerful();
    this.amIAlive();
    this.listenForPause();
  }

  /**
   * Draws the scene.
   */
  public draw() {
    background(50, 145, 300);
    this.bg1.draw();
    this.bg2.draw();
    this.drawEntities();
    this.character.draw();
    this.showCurrentStats();
    this.pauseMusicButton.draw();
    if (this.character.isAlive === false) {
      this.calcScoreGameOverButton.draw();
    }
  }

  /**
   * Displays the current stats of the game, meters run, number of seagulls killed and amount of fish collected
   */
  private showCurrentStats() {
    //Meters
    push();
    image(images.stats, width / 2 - 750 / 2, 0, 750, 41);
    pop();
    push();
    textAlign(LEFT);
    textSize(18);
    fill(255);
    text("Meters: " + this.elapsedTime, width / 2 - 750 / 2 + 20, 28);
    pop();
    //Seagulls
    push();
    textAlign(LEFT);
    textSize(18);
    fill(255);
    text(this.seagullsKilled, width / 2 - 750 / 2 + 540, 28);
    pop();
    //Fish
    push();
    textAlign(LEFT);
    textSize(18);
    fill(255);
    text(this.fishAmount, width / 2 - 750 / 2 + 680, 28);
    pop();
  }

  //------------------------------------------------------TIME TRACKER------------------------------------------------------------------//

  /**
   * Calculates how long the game went on for.
  */
  private trackTime() {
    if (this.character.isAlive) {
      this.elapsedTime = Math.floor(Date.now() - this.startTime) / 10;
      this.elapsedTime = Math.round(this.elapsedTime);
    }
  }

  /**
   * Removes the timeout on shooting, so you can spray and pray while powered up.
   */
  removeShootTimeOut() {
    if (this.character.poweredUp === true) {
      this.character.shootTimeout = 0;
    }
  }

  //------------------------------------------------------CREATE ENTITIES------------------------------------------------------------------//

  /**
   * Checks for updates to the different game objects.
   */
  private updateEntities() {
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.update((this.startingSpeed + this.acceleration) / 5);
    }
    for (const fish of this.fishes) {
      fish.update(this.startingSpeed + this.acceleration);
    }

    for (const powerup of this.powerUps) {
      powerup.update(this.startingSpeed + this.acceleration);
    }
    for (const enemy of this.enemies) {
      enemy.update(this.startingSpeed);
    }
    for (const bullet of this.bullets) {
      bullet.update();
    }
    this.building.update(this.startingSpeed + this.acceleration);
  }

  /**
   * Creates bullets when the character is shooting.
   */
  public spawnBullets() {
    if (this.character.isShooting === true && this.character.shootTimeout < 0) {
      this.bullets.push(
        new Bullet(
          new p5.Vector(
            this.character.position.x + this.character.size.x - 45,
            this.character.position.y + 20
          ),
          new p5.Vector(width / 150, height / 100),
          images.bullet,
          width / 100
        )
      );
      this.character.shootTimeout = 500;
      setTimeout(() => {
        this.character.isShooting = false;
      }, 500);
    }
  }

  /**
   * Create clouds and push them into an array.
   */
  private createClouds() {
    if (random(2) < 0.004) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height / 10) - 20),
          new p5.Vector(
            random(width / 10, width / 4),
            random(height / 10, height / 8)
          ),
          images.cloud1,
          random(3)
        )
      );
    } else if (random(15) > 14.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height / 10) - 20),
          new p5.Vector(
            random(width / 10, width / 4),
            random(height / 10, height / 8)
          ),
          images.cloud2,
          random(3)
        )
      );
    } else if (random(10) > 9.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height / 10) - 20),
          new p5.Vector(
            random(width / 10, width / 4),
            random(height / 10, height / 8)
          ),
          images.cloud3,
          random(3)
        )
      );
    }
  }

  /**
   * Creates enemies (seagulls) and pushes them into an array.
   * After having played for 30 seconds red seagulls will start to spawn.
   */
  private createEnemys() {
    if (random(2) < 0.015) {
      this.enemies.push(
        new Enemy(
          new p5.Vector(width, random(height)),
          new p5.Vector(width / 19, height / 10),
          images.enemy,
          this.startingSpeed + this.acceleration + random(-2, 1),
          4,
          200,
          random(-2, 2),
          false
        )
      );
    }
    if (this.elapsedTime > 3000 && random(2) < 0.009) {
      this.enemies.push(
        new Enemy(
          new p5.Vector(width, random(height)),
          new p5.Vector(width / 19, height / 10),
          images.redEnemy,
          this.startingSpeed + this.acceleration + random(4, 6),
          4,
          200,
          random(3),
          false
        )
      );
      if (this.character.isAlive === true) {
        this.playSoundEffect(sounds.kaka);
      }
    }
  }

  /**
   * Creates fish and pushes them into an array.
   */
  private createFish() {
    if (random(2) < 0.040) {
      this.fishes.push(
        new Item(
          new p5.Vector(width, random(height)),
          new p5.Vector(width / 30, height / 25),
          images.fisk,
          random(3)
        )
      );
    }
  }
  
  /**
   * Creates powerups and pushes them into an array.
   */
  private createPowerUp() {
    if (random(2) < 0.001) {
      this.powerUps.push(
        new Powerup(
          new p5.Vector(width, random(height)),
          new p5.Vector(width / 36, height / 22),
          images.donut,
          this.startingSpeed + this.acceleration,
        )
      );
    }
  }

  //------------------------------------------------------DRAW ENTITES------------------------------------------------------------------//
  
  /**
   * Draws out the gamescene entities (minus the character).
   */
  private drawEntities() {
    this.building.draw();

    for (const enemies of this.enemies) {
      enemies.draw();
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
  }

  //------------------------------------------------------COLLISION CHECKS------------------------------------------------------------------//

  /**
   * Checks for collision between the character and buildings.
   * If it occurs and the character is not powered up the character dies.
   */
  private detectCollision() {
    if (
      this.character.position.x + this.character.size.x >
      this.building.position.x &&
      this.character.position.x <
      this.building.position.x + this.building.size.x &&
      this.character.position.y + this.character.size.y >
      this.building.position.y &&
      this.character.position.y <
      this.building.position.y + this.building.size.y
    ) {
      if (this.character.poweredUp === false) {
        this.character.isAlive = false;
      }
    }
  }

  /**
   * Checks for collision between the character and collectable fish.
   * If there is a collision the fish is deleted.
   */
  private collectedItem() {
    for (let i = 0; i < this.fishes.length; i++) {
      if (
        this.character.position.x + this.character.size.x >
        this.fishes[i].position.x &&
        this.character.position.x <
        this.fishes[i].position.x + this.fishes[i].size.x &&
        this.character.position.y + this.character.size.y >
        this.fishes[i].position.y &&
        this.character.position.y <
        this.fishes[i].position.y + this.fishes[i].size.y
      ) {
        this.fishAmount += 1;
        this.fishes.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Checks for collision between the character and collectable powerups.
   * If there is a collision the donut is deleted and character is set to powered up for 5 seconds.
   */
  private collectedPowerup() {
    for (let i = 0; i < this.powerUps.length; i++) {
      if (
        this.character.position.x + this.character.size.x >
        this.powerUps[i].position.x &&
        this.character.position.x <
        this.powerUps[i].position.x + this.powerUps[i].size.x &&
        this.character.position.y + this.character.size.y >
        this.powerUps[i].position.y &&
        this.character.position.y <
        this.powerUps[i].position.y + this.powerUps[i].size.y
      ) {
        this.time = 5000;
        this.powerUps.splice(i, 1);
        this.character.poweredUp = true;
        this.playSoundEffect(sounds.mums);

        break;
      }
    }
  }

  /**
   * Checks for overlap between a building and fish.
   * If an overlap is detected, the overlapping fish will be removed.
   * @param building The building to check for overlap.
   * @param fishes The array of fish to check for overlap.
   */
  private detectOverlap(building: Building, fishes: Item[]) {
    for (let i = 0; i < fishes.length; i++) {
      if (
        building.position.x + building.size.x > fishes[i].position.x &&
        building.position.x < fishes[i].position.x + fishes[i].size.x &&
        building.position.y + building.size.y > fishes[i].position.y &&
        building.position.y < fishes[i].position.y + fishes[i].size.y
      ) {
        fishes.splice(i, 1);
        break;
      }
    }
  }
  
  /**
   * Checks for collision between the character and seagulls.
   * If it occurs and the character is not powered up the character dies.
   */
  public enemyCrash() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (
        !this.enemies[i].isEnemyDead &&
        this.character.position.x + this.character.size.x >
        this.enemies[i].position.x &&
        this.character.position.x <
        this.enemies[i].position.x + this.enemies[i].size.x &&
        this.character.position.y + this.character.size.y >
        this.enemies[i].position.y &&
        this.character.position.y <
        this.enemies[i].position.y + this.enemies[i].size.y &&
        this.character.poweredUp === false
      ) {
        this.enemies[i].image = images.redExplosion;
        this.enemies[i].totalFrames = 8;
        this.enemies[i].framesDuration = 80;
        this.character.isAlive = false;
        this.enemies[i].image = images.redExplosion;
        this.enemies[i].totalFrames = 8;
        this.enemies[i].framesDuration = 80;
        break;
      }
    }
  }

  /**
   * Checks for collision between the bullet and seagulls.
   * If they collide the seagull dies.
   */
  public enemyShot() {
    let collisionDistance = 80;
    for (let i = 0; i < this.bullets.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (!this.bullets[i] || !this.enemies[j]) {
          continue;
        }
        if (
          this.bullets[i].position.dist(this.enemies[j].position) <
          collisionDistance &&
          !this.enemies[j].isEnemyDead
        ) {
          this.bullets.splice(i, 1);
          this.playSoundEffect(sounds.deadseagull);
          this.enemies[j].image = images.redExplosion;
          this.enemies[j].totalFrames = 8;
          this.enemies[j].framesDuration = 90;
          this.enemies[j].velocity = 0;
          this.enemies[j].yVelocity = 0;
          this.enemies[j].isEnemyDead = true;
          setTimeout(() => {
            this.enemies.splice(j, 1);
            this.seagullsKilled += 1;
          }, 450);
        }
      }
    }
  }

  //------------------------------------------------------STATES------------------------------------------------------------------//
  /**
   * Checks if the player have the immortal powerup active or not.
   */
  private amIPowerful() {
    if (this.time < 0) {
      this.character.poweredUp = false;
    }
  }
  /**
   * Checks if the character is alive or not.
   * If not the game ends and a button leading to game over appear.
   * It also makes the building and background stop moving when you have crashed.
   */
  private amIAlive() {
    if (this.character.isAlive === false) {
      this.startingSpeed = 0;
      this.acceleration = 0;
      this.bg1.velocity = 0;
      this.bg2.velocity = 0;
      this.building.velocity = 0;

      for (const enemy of this.enemies) {
        enemy.velocity = 0;
      }
      this.gameOverButton();
    }
  }

  /**
   * Checks if the soundEffectTimeout has counted town to 0 before playing a sound effect.
   */
  public playSoundEffect(sound: p5.SoundFile) {
    if (this.soundEffectTimeOut < 0) sound.play();
    this.soundEffectTimeOut = 1000;
  }

  //------------------------------------------------------BUTTONS------------------------------------------------------------------//

 /**
   * Listens for button press and creates a new instance of the game over page.
   */
  private gameOverButton() {
    const wasPressed = this.calcScoreGameOverButton.update();
    if (wasPressed) {
      this.game.goToGameOver();
    }
  }

  /**
   * Listens for buttonpress and calls the playMusic funtion.
   */
  public listenForPause() {
    const wasPressed = this.pauseMusicButton.update()
    if (wasPressed)
      this.game.playMusic(sounds.hast);
  }
}
