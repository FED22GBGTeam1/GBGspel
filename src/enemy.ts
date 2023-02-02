/// <reference path="animated-object.ts" />

class Enemy extends animatedObject{
    public framesDuration: any;
    //yVelocity gets a random number and  makes every seagull fly upwards or downwards in that speed
    public yVelocity:number;
    //isEnemtDead gets a random number and  makes every seagull fly upwards or downwards in that speed
    public isEnemyDead: boolean;

    constructor(
        position: p5.Vector,
        size: p5.Vector,
        image: p5.Image,
        velocity: number,
        totalFrames: number,
        frameDuration: number,
        yVelocity:number,
        isEnemyDead: boolean
      ) {
        super(position, size, image, velocity, totalFrames,
          frameDuration)
          this.yVelocity= yVelocity;
          this.isEnemyDead = isEnemyDead;
    }
    //makes the seagull move both sideways and up och down
    public update(startingSpeed: number) {
            super.update(startingSpeed);
            this.position.sub(this.velocity, this.yVelocity);
    }
    draw() {
        super.draw();
    }

}

