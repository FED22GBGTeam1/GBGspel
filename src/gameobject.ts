abstract class Gameobject {
    public position: p5.Vector;
    public size: p5.Vector;
    public image: p5.Image;
    public velocity: number;
    

    constructor(position: p5.Vector, size: p5.Vector, imagePath: string, velocity: number) {
        this.position = position;
        this.size = size;
        this.image = loadImage(imagePath);
        this.velocity = velocity
    }

    public update(startingSpeed: number) {
        this.position.sub(startingSpeed, 0);
    }

    public draw() {
        //ritar ut bilden vid objectets position och med samma storlek som objektet(?)
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
  
}



