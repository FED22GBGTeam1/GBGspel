/// <reference path="gameobject.ts"/>

class Building extends Gameobject {
  position: p5.Vector;
  size: p5.Vector;
  image: p5.Image;
  velocity: number;


  // Gör att man kan stänga av dödligheten vid krock (powerup)
  // private deadlyCollision: boolean;

  constructor(position: p5.Vector, size: p5.Vector, image: p5.Image, velocity: number) {
    super(position, size, image, velocity);
    this.position = position;
    this.size = size;
    this.velocity = 0
    this.image = this.getRandomImage()
  }

  public update(startingSpeed: number) {
    super.update(startingSpeed);

    if(this.position.x + this.size.x < 0) {
      this.image = this.getRandomImage()
    }
  }
  private getRandomImage(): p5.Image {
    let r = Math.floor(Math.random() * 5) + 1;
    switch (r) {
      case 1:
      case 2:
      case 3:
        this.size = createVector(random(140,325), random(200,height/2));
        this.position = createVector(width, height - this.size.y);
        return images.building;
      case 4:
        this.size = createVector(width/6, height/2);
        this.position = createVector(width, height - this.size.y);
        return images.lipstick;
      case 5:
        this.size = createVector(60, height/2+height/4);
        this.position = createVector(width, height - this.size.y);
        return images.torn;
      default:
        this.size = createVector(140, 140 * (678 / 146));
        this.position = createVector(width, height - this.size.y);
        return images.building;
    }
  }
    // public draw() {
    //   image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    // }
    // gör extra saker för just Building
}

  // public draw() {
  //   super.draw()
  //   // lägg till en färgad ram omkring...
  // }

