/// <reference path="gameobject.ts"/>


class Enemy extends Gameobject{
    protected deadlyCollision: boolean;
    
    constructor(
        position: p5.Vector,
        size: p5.Vector,
        imagePath: string,
        velocity: number,
        deadlyCollision: boolean,

    ) {
        super(position, size, imagePath, velocity);
        this.deadlyCollision = false;
        this.velocity = velocity;
        this.size = size;
    }
}

function draw(){
    rect(200, 200,25)
}

for (let i = 0; i < 10; i++){
    let enemy = {
        x: random(0, width),
    }
}




//create the enemy (change to img after)
//enemy move on the y axis
//enemy get hit by bullet
//enemy death count in to scoreboard