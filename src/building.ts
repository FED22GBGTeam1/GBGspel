/// <reference path="gameobject.ts"/>

class Building extends Gameobject {
  position: p5.Vector;
  size: p5.Vector;
  image: p5.Image;
  velocity: number;


  // Gör att man kan stänga av dödligheten vid krock (powerup)
  // private deadlyCollision: boolean;

  constructor(position: p5.Vector, size: p5.Vector, imagePath: string, velocity: number) {
    super(position, size, imagePath, velocity);
    this.position = position;
    this.size = size;
    this.image = loadImage(imagePath);
    this.velocity = 0
  }

  public update(startingSpeed: number) {
    super.update(startingSpeed);

    if(this.position.x + this.size.x < 0) {
      
      this.position.x = width;
      this.size.x = random(90,160);
      this.size.y = random(height/4, height*3/4);
      this.position.y = height - this.size.y;
    }
  }
    public draw() {
      image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
    // gör extra saker för just Building
}

  // public draw() {
  //   super.draw()
  //   // lägg till en färgad ram omkring...
  // }

