/// <reference path="gameobject.ts"/>

class Building extends Gameobject {
  position: p5.Vector;
  size: p5.Vector;
  image: p5.Image;
  velocity: number;

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
  /**
   * 
   * Method returns a random image and the size the building gets if  the case goes to that picture. Case 1,2 and 3 gets the regular "house, so it's more commonly occuring"
   */
  private getRandomImage(): p5.Image {
    let r = Math.floor(Math.random() * 5) + 1;
    switch (r) {
      case 1:
      case 2:
      case 3:
        this.size = createVector(random(width/6,width/10), random(200,height/2));
        this.position = createVector(width, height - this.size.y);
        return images.building;
      case 4:
        this.size = createVector(width/6, height/2);
        this.position = createVector(width, height - this.size.y);
        return images.lipstick;
      case 5:
        this.size = createVector(width/24, height/2+height/4);
        this.position = createVector(width, height - this.size.y);
        return images.torn;
      default:
        this.size = createVector(140, 140 * (678 / 146));
        this.position = createVector(width, height - this.size.y);
        return images.building;
    }
  }
}


