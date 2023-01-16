// import { Gameobject } from './gameobject.ts'

class Building extends Gameobject {
    // Gör att man kan stänga av dödligheten vid krock (powerup).
    private deadlyCollision: boolean;

    constructor(position: p5.Vector, size: p5.Vector, imagePath: string, velocity: number, deadlyCollision: boolean) {
        super(position, size, imagePath, velocity);
        this.deadlyCollision = deadlyCollision;
    }

    public update() {
        

    }

    public draw() {
        
    }
}