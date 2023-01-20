/// <reference path="gameobject.ts"/>

class Building extends Gameobject {
  protected deadlyCollision: boolean;

  // Gör att man kan stänga av dödligheten vid krock (powerup)
  // private deadlyCollision: boolean;

  constructor(
    position: p5.Vector,
    size: p5.Vector,
    imagePath: string,
    velocity: number,
  ) {
    super(position, size, imagePath, velocity);
    this.deadlyCollision = false;
    this.size = size;
    this.deadlyCollision = true
    this.velocity = 0
  }
  public update(startingSpeed: number) {
    super.update(startingSpeed);
    // gör extra saker för just Building
  }

  // public draw() {
  //   super.draw()
  //   // lägg till en färgad ram omkring...
  // }
}
