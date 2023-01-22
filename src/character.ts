/// <reference path="animated-object.ts" />

class Character extends animatedObject {
  // public isAlive: boolean;
  public isAlive: boolean;
  private soundTimeout: number;

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
     this.soundTimeout = 2000;
  }

  public update() {
    this.soundTimeout -= deltaTime;
    if (keyIsDown(UP_ARROW) && this.position.y > 0 && this.isAlive === true) {
      this.position.y -= this.velocity;
      this.playSound(weee);
    }
    if (keyIsDown(DOWN_ARROW) && this.position.y + this.size.y < height && this.isAlive === true) {
      this.position.y += this.velocity;
      this.playSound(wooo);
    }
    if (keyIsDown(RIGHT_ARROW) && this.position.x + this.size.x < width && this.isAlive === true) {
      this.position.x += this.velocity;
      this.playSound(wooo);
    }
    if (keyIsDown(LEFT_ARROW) && this.position.x > 0 && this.isAlive === true) {
      this.position.x -= this.velocity;
      this.playSound(wooo);
    }


  }
  public draw() {
    super.draw();

    if (this.isAlive === false) {
      this.image = loadImage('assets/exp.png');
      this.frameDuration = 90
    }
  }

  public playSound(sound: p5.SoundFile) {
    if (this.soundTimeout < 0) {
      sound.play();
      this.soundTimeout = 2000;
    }
  }
  
}
