//kan jag ärva från en redan ärvd klass? Ärva från Item. Skapa en egen fil för Powerup
//duration: number, först eller sist?
class Powerup extends Item {

    private duration: number;

    constructor(position: p5.Vector, size: p5.Vector, imagePath: string, velocity: number, duration: number) {
        super (position, size, imagePath, velocity)
        this.duration = duration;
    }
}