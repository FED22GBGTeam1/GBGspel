/// <reference path="gameobject.ts" />

class Character extends Gameobject {
  public isAlive: boolean;

  public x: number;
  public y: number;

  constructor(
    position: p5.Vector,
    size: p5.Vector,
    imagePath: string,
    velocity: number,
    isAlive: boolean
  ) {
    super(position, size, imagePath, velocity);
    this.x = position.x;
    this.y = position.y;
    this.isAlive = true;
  }

  public update() {
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y -= 10;
      this.playSound(weee);
    }
    if (keyIsDown(DOWN_ARROW) && this.y + this.size.y < height) {
      this.y += 10;
      this.playSound(wooo);
    }

    if (this.position === character.position) {
      this.x = 100;
    }
  }

  public draw() {
    // super.draw();
    image(this.image, this.x, this.y, this.size.x, this.size.y);
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
