/// <reference path="gameobject.ts" />

class Cloud extends Gameobject {
    private oppositeMovementSpeed: number;

    constructor(position: p5.Vector, size: p5.Vector, imagePath:string, velocity: number, oppositeMovementSpeed: number) {
        super(position, size, imagePath, velocity)
        this.oppositeMovementSpeed = oppositeMovementSpeed;

    }
}
