/// <reference path="animated-object.ts" />

class Enemy extends animatedObject{
    public framesDuration: any;
    public yVelocity:number;
    public isEnemyDead: boolean;

    constructor(
        position: p5.Vector,
        size: p5.Vector,
        image: p5.Image,
        velocity: number,
        totalFrames: number,
        frameDuration: number,
        frame:number,
        yVelocity:number,
        isEnemyDead: boolean
      ) {
        super(position, size, image, velocity, totalFrames,
          frameDuration,frame)
          this.yVelocity= yVelocity;
          this.isEnemyDead = isEnemyDead;
    }
    public update(startingSpeed: number) {
            super.update(startingSpeed);
            this.position.sub(this.velocity, this.yVelocity);
    }
    draw() {
        super.draw();
    }

}

