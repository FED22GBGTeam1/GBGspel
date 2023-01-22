/// <reference path="gameobject.ts" />

class Cloud extends Gameobject {
    private oppositeMovementSpeed: number;

    constructor(position: p5.Vector, size: p5.Vector, velocity: number, oppositeMovementSpeed: number) {
        super(position, size, "assets/fluffyCloud.png", velocity)
        this.oppositeMovementSpeed = oppositeMovementSpeed;

    }
}
