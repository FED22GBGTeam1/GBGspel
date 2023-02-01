/// <reference path="gameobject.ts"/>

class Bullet extends Gameobject {
  constructor(
    position: p5.Vector,
    size: p5.Vector,
    image: p5.Image,
    velocity: number
  ) {
    super(position, size, image, velocity);
    this.velocity = 30;
  }
  public draw() {
    image(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }
  public update(startingSpeed: number) {
    this.position.add(this.velocity, 0);
  }
}
