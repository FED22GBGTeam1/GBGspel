/// <reference path="gameobject.ts" />

class Character extends Gameobject {
  // public isAlive: boolean;
  public isAlive: boolean;
  private soundTimeout: number;
  private speed: number;
  private maxSpeed: number;

  constructor(
    position: p5.Vector,
    size: p5.Vector,
    imagePath: string,
    velocity: number,
  ) {
    super(position, size, imagePath, velocity);
     this.isAlive = true;
     this.soundTimeout = 2000;
     this.speed = 4;
     this.maxSpeed = 15;
  }

  public update() {
    this.soundTimeout -= deltaTime;
    
    if (keyIsDown(UP_ARROW) && this.position.y > 0) {
      if (this.speed < this.maxSpeed) {
        this.speed += 0.1;
      }
      this.position.y -= this.speed;
      this.playSound(weee);
    }
    if (keyIsDown(DOWN_ARROW) && this.position.y + this.size.y < height) {
      if (this.speed < this.maxSpeed) {
        this.speed += 0.1;
      }
      this.position.y += this.speed;
      this.playSound(wooo);
    }
    if (keyIsDown(RIGHT_ARROW) && this.position.x + this.size.x < width) {
      this.position.x += 10;
      this.playSound(wooo);
    }
    if (keyIsDown(LEFT_ARROW) && this.position.x > 0) {
      this.position.x -= 10;
      this.playSound(wooo);
    }

    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
      this.speed = 4;
    }
    
  }

  public playSound(sound: p5.SoundFile) {
    if (this.soundTimeout < 0) {
      sound.play();
      this.soundTimeout = 2000;
    }
  }
  
}
