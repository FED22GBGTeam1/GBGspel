export class Character {
  private x: number;
  private y: number;
  private img: p5.Image;

  constructor(x: number, y: number, img: p5.Image) {
      this.x = x;
      this.y = y;
      this.img = img;
  }

  public draw() {
      image(this.img, this.x, this.y);
  }
}

