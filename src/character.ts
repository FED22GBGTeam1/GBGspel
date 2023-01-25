/// <reference path="animated-object.ts" />

class Character extends animatedObject {
  /**
   * Checks if the character is alive.
   */
  public isAlive: boolean;
  /**
   * Starts at 2000. At 0 sounds can be played.
   */
  private soundTimeout: number;
  /**
   * 
   */
  //private speed: number;
  /**
   * 
   */
  //private maxSpeed: number;
  /**
   * Checks if the character got an active powerup or not.
   */
  public poweredUp: Boolean;
  public isShooting: boolean;

  constructor(
    position: p5.Vector,
    size: p5.Vector,
    imagePath: string,
    velocity: number,
    totalFrames: number,
    frameDuration: number
  ) {
    super(position, size, imagePath, velocity, totalFrames,
      frameDuration)
    this.isAlive = true;

    this.poweredUp = false;
    this.isShooting = false;

    this.soundTimeout = 2000;
    //this.speed = 4;
    //this.maxSpeed = 15;
  }

  public update() {
    this.soundTimeout -= deltaTime;
    this.moveCharacter();
    this.swapCharacterImage();
    this.shoot();


}
  public shoot() {
    if (keyIsPressed) {
      if (key === " " && this.isAlive === true) {
        this.isShooting = true;
      } 
      else {
        this.isShooting = false   
      }
  }

  }
  private moveCharacter() {
    if (keyIsDown(UP_ARROW) && this.position.y > 0 && this.isAlive === true) {
      this.position.y -= this.velocity;
      //this.playSound(weee);
    }
    if (keyIsDown(DOWN_ARROW) && this.position.y + this.size.y < height && this.isAlive === true) {
      this.position.y += this.velocity;

    }
    if (keyIsDown(RIGHT_ARROW) && this.position.x + this.size.x < width && this.isAlive === true) {
      this.position.x += this.velocity;
      //this.playSound(wooo);
    }
    if (keyIsDown(LEFT_ARROW) && this.position.x > 0 && this.isAlive === true) {
      this.position.x -= this.velocity;
      //this.playSound(wooo);
    }

  }
  
  public swapCharacterImage() {
    if (this.isAlive === true && this.poweredUp === true && this.isShooting=== false)  {
      this.image = images.kattPower
      this.frameDuration = 90
    }
    if (this.isAlive === true && this.poweredUp === false && this.isShooting === false)  {
      this.image = images.katt
      this.frameDuration = 90
    }
    if (this.isAlive === false) {
      this.image = images.explosion
      this.frameDuration = 90
    }
  } 

  public draw() {
    super.draw();
  }

  /**
   * Checks if 2 seconds have passed since last sound was played,
   * and then plays another sound.
   * @param sound 
   */
  public playSound(sound: p5.SoundFile) {
    if (this.soundTimeout < 0) {
      sound.play();
      this.soundTimeout = 2000;
    }
  }


}
