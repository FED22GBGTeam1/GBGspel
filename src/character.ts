/// <reference path="animated-object.ts" />

class Character extends animatedObject {
  /**
   * Is character alive or not
   */
  public isAlive: boolean;
  /**
   * Starts at 2000. At 0 sounds can be played.
   */
  public soundTimeout: number;
  /**
   * Makes sure the death sound is only played once.
   */
  private deathSoundTO: boolean;
  /**
   * Is character poweredup or not
   */
  public poweredUp: Boolean;
  /**
   * Is character shooting or not
   */
  public isShooting: boolean;
  /**
   * Is the space bar pressed or not
   */
  public isSpaceBarPressed: boolean;
  /**
   * A number indicating a timeout for shooting
   */
  public shootTimeout: number;
  /**
   * -----------------------------------------------
   */
  public characterGravity: number;
  /**
   * -----------------------------------------------
   */
  public characterVelocity: number;
  /**
   * -----------------------------------------------
   */
  public maxFallingVelocity: number;

  constructor(
    position: p5.Vector,
    size: p5.Vector,
    image: p5.Image,
    velocity: number,
    totalFrames: number,
    frameDuration: number
  ) {
    super(position, size, image, velocity, totalFrames, frameDuration);
    this.isAlive = true;
    this.poweredUp = false;
    this.isShooting = false;
    this.soundTimeout = 1500;
    this.shootTimeout = 0;
    this.isSpaceBarPressed = false;
    this.characterGravity = 0.02;
    this.characterVelocity = 0;
    this.maxFallingVelocity = 2;
    this.deathSoundTO = true;
  }

  public update() {
    this.soundTimeout -= deltaTime;
    this.shootTimeout -= deltaTime;
    this.moveCharacter();
    this.swapCharacterImage();
    this.shoot();
  }

  /**
   * Function to handle shooting for the player.
   * The shooting is triggered by the spacebar and the shooting timeout must be negative.
   * If the conditions are met, the player starts shooting and the 'pewpew' sound is played.
   */
  public shoot() {
    if (keyIsDown(32) && this.shootTimeout < 0 && this.isShooting === false) {
      this.isShooting = true;
      this.playSound(sounds.pewpew);
    }
  }
  
  /**
   * Moves the character based on arrow key inputs and gravity.
   */
  private moveCharacter() {
    if (keyIsDown(UP_ARROW) && this.position.y > 0 && this.isAlive === true) {
      this.position.y -= this.velocity;
    }
    if (
      keyIsDown(DOWN_ARROW) &&
      this.position.y + this.size.y < height &&
      this.isAlive === true
    ) {
      this.playSound(sounds.meow);
      this.position.y += this.velocity;
    }
    if (
      keyIsDown(RIGHT_ARROW) &&
      this.position.x + this.size.x < width &&
      this.isAlive === true
    ) {
      this.position.x += this.velocity;
    }
    if (keyIsDown(LEFT_ARROW) && this.position.x > 0 && this.isAlive === true) {
      this.position.x -= this.velocity;
    }
    if (this.position.y + this.size.y < height) {
      // remove the check for this.position.y > 0
      this.characterVelocity += this.characterGravity;
      this.characterVelocity = constrain(
        this.characterVelocity,
        this.maxFallingVelocity,
        this.maxFallingVelocity
      );
      this.position.y += this.characterVelocity;
    }

    if (keyIsDown(UP_ARROW) && this.position.y == 0) {
      this.maxFallingVelocity = 0;
    } else if (this.position.y >= 0) {
      this.maxFallingVelocity = 2;
    }
  }  
  
  /**
   * Changes the cat sprite depending on if its dead, poweredeup or shooting.
   */
  public swapCharacterImage() {
    if (
      this.isAlive === true &&
      this.poweredUp === true &&
      this.isShooting === false
    ) {
      this.image = images.kattPower;
    }
    if (
      this.isAlive === true &&
      this.poweredUp === false &&
      this.isShooting === false
    ) {
      this.image = images.katt;
    }
    if (this.isAlive === false) {
      this.deathSound();
      this.image = images.explosion;
      this.totalFrames = 8;
    }
    if (
      this.isAlive === true &&
      this.poweredUp === false &&
      this.isShooting === true
    ) {
      this.image = images.shoot;
    }
    if (
      this.isAlive === true &&
      this.poweredUp === true &&
      this.isShooting === true
    ) {
      this.image = images.shootGreen;
    }
  }

  /**
   * Checks if 2 seconds have passed since last sound was played,
   * and then plays another sound.
   * @param sound
   */
  public playSound(sound: p5.SoundFile) {
    if (this.soundTimeout < 0) {
      sound.play();
      this.soundTimeout = 5000;
    }
  }

  /**
   * Plays a sound when the character dies.
   */
  public deathSound() {
    if (this.deathSoundTO == true) {
      sounds.boom.play();
      this.deathSoundTO = false;
    }
  }
}
