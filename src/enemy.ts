/// <reference path="animated-object.ts" />

class Enemy extends animatedObject{
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
    update() {
        super.update();
        this.position.sub(this.velocity, 0);
    }
    draw() {
        super.draw();
    }

}






//create the enemy (change to img after)
//enemy move on the y axis
//enemy get hit by bullet
//enemy death count in to scoreboard