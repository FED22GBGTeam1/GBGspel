//kan jag ärva från en redan ärvd klass? Ärva från Item. Skapa en egen fil för Powerup
//duration: number, först eller sist?
class Powerup extends Item {

    constructor(position: p5.Vector, size: p5.Vector, image:p5.Image, velocity: number, duration: number) {
        super (position, size, image, velocity)
    }
    public update(startingSpeed: number) {
        this.position.sub(startingSpeed, 0);
    }

    public draw() {
        //ritar ut bilden vid objectets position och med samma storlek som objektet(?)
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
}