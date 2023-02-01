/// <reference path="gameobject.ts" />

class Cloud extends Gameobject {
    constructor(position: p5.Vector, size: p5.Vector, image:p5.Image, velocity: number,) {
        super(position, size, image, velocity)
    }
}
