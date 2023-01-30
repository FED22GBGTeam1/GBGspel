/// <reference path="gameobject.ts" />

class Cloud extends Gameobject {
    private oppositeMovementSpeed: number;

    constructor(position: p5.Vector, size: p5.Vector, image:p5.Image, velocity: number, oppositeMovementSpeed: number) {
        super(position, size, image, velocity)
        this.oppositeMovementSpeed = oppositeMovementSpeed;

    }
}
