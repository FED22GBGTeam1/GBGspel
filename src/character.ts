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
    }
    if (keyIsDown(DOWN_ARROW) && this.y + this.size.y < height) {
      this.y += 10;
    }

    if (this.position === character.position) {
      this.x = 100;
    }
  }

  public draw() {
    // super.draw();
    image(this.image, this.x, this.y, this.size.x, this.size.y);
  }
}
