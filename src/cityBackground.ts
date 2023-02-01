class CityBackground extends Gameobject {

    constructor(position: p5.Vector, size: p5.Vector, image:p5.Image, velocity: number) {
        super (position, size, image, velocity);
    }
    public update() {
      //placerar bild 2 när bild 1 tar slut, sedan bild 1 när bild 2 tar slut för en evig loop.
        this.position.x -= this.velocity;
        this.position.x -= this.velocity;
        if (this.position.x <= -this.size.x) {
          this.position.x = this.size.x;
        }
        if (this.position.x <= -this.size.x) {
          this.position.x = this.size.x;
        }
    }
    public draw() {
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
}