/// <reference path="animated-object.ts" />

class Enemy extends animatedObject{
    public framesDuration: any;
    public yVelocity:number;
    public killed: boolean;

    constructor(
        position: p5.Vector,
        size: p5.Vector,
        image: p5.Image,
        velocity: number,
        totalFrames: number,
        frameDuration: number,
        frame:number,
        yVelocity:number
      ) {
        super(position, size, image, velocity, totalFrames,
          frameDuration,frame)
          this.yVelocity= yVelocity
          this.killed = false
    }
    public update(startingSpeed: number) {
            super.update(startingSpeed);
            this.position.sub(this.velocity, this.yVelocity);
    }
    draw() {
        super.draw();
    }

}

