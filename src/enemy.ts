/// <reference path="gameobject.ts"/>


class Enemy extends Gameobject{
     
    
     constructor(
        position: p5.Vector, 
        size: p5.Vector, 
        velocity: number, 
        oppositeMovementSpeed: number
        ) {
        super(
            position, 
            size,
            'assets/seagull.png', 
            velocity
            )
        

    }
}






//create the enemy (change to img after)
//enemy move on the y axis
//enemy get hit by bullet
//enemy death count in to scoreboard