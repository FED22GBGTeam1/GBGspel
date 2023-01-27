/// <reference path="animated-object.ts" />

class Enemy extends animatedObject{
    framesDuration: any;
    private yVelocity:number
    private amplitude:number
    constructor(
        position: p5.Vector,
        size: p5.Vector,
        imagePath: string,
        velocity: number,
        totalFrames: number,
        frameDuration: number,
        frame:number
      ) {
        super(position, size, imagePath, velocity, totalFrames,
          frameDuration,frame)
          this.yVelocity= (random(-2,2))
          this.amplitude = random(10,20);
    }
    public update(startingSpeed: number) {
            super.update(startingSpeed);
            this.position.sub(this.velocity, this.yVelocity);
    }
    draw() {
        super.draw();
    }

}

