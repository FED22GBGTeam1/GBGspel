class Cloud extends Gameobject {
    private oppositeMovementSpeed: number;

    constructor  (position: p5.Vector, size: p5.Vector, imagePath: string, velocity: number, oppositeMovementSpeed: number) {
        super(position, size, imagePath, velocity)
        this.oppositeMovementSpeed = oppositeMovementSpeed;
    }


    
}



// Pick randomly sizes and speed for the clouds to be rendered on the DOM.
let clouds: Cloud[] = [];

