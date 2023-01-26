/// <reference path="animated-object.ts" />

class Enemy extends animatedObject{
    framesDuration: any;
    constructor(
        position: p5.Vector,
        size: p5.Vector,
        imagePath: string,
        velocity: number,
        totalFrames: number,
        frameDuration: number
      ) {
        super(position, size, imagePath, velocity, totalFrames,
          frameDuration)
    }
    public update(startingSpeed: number) {
        super.update(startingSpeed);
        this.position.sub(this.velocity, 0);

        if (random(2) > 1) {
            this.position.y += (random(3))
        }    
    }
    draw() {
        super.draw();
    }

}

