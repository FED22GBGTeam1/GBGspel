/// <reference path="animated-object.ts" />

class Enemy extends animatedObject{
    public framesDuration: any;
    public yVelocity:number

    constructor(
        position: p5.Vector,
        size: p5.Vector,
        image: p5.Image,
        velocity: number,
        totalFrames: number,
        frameDuration: number,
        frame:number
      ) {
        super(position, size, image, velocity, totalFrames,
          frameDuration,frame)
          this.yVelocity= (random(-2,2))
    }
    public update(startingSpeed: number) {
            super.update(startingSpeed);
            this.position.sub(this.velocity, this.yVelocity);
    }
    draw() {
        super.draw();
    }

}

