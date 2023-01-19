/// <reference path="gameobject.ts" />

class Character extends Gameobject {
  // public isAlive: boolean;

  constructor(
    position: p5.Vector,
    size: p5.Vector,
    imagePath: string,
    velocity: number,
    // isAlive: boolean
  ) {
    super(position, size, imagePath, velocity);
    // this.isAlive = true;
  }

  public update() {
    if (keyIsDown(UP_ARROW) && this.position.y > 0) {
      this.position.y -= 10;
      this.playSound(weee);
    }
    if (keyIsDown(DOWN_ARROW) && this.position.y + this.size.y < height) {
      this.position.y += 10;
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
    
  }

  public playSound(sound: p5.SoundFile) {
    if (canPlay) {
      sound.play();
      canPlay = false;
      setTimeout(() => {
        canPlay = true;
      }, 3000);

    }
  }
  
}
