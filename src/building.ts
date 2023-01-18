/// <reference path="gameobject.ts"/>

class Building extends Gameobject {

    public x: number;
    public y: number;
    protected deadlyCollision: boolean;
    
    
      // Gör att man kan stänga av dödligheten vid krock (powerup)
      // private deadlyCollision: boolean;
  
      constructor(position: p5.Vector, size: p5.Vector, imagePath: string, velocity: number, deadlyCollision: boolean) {
          super(position, size, imagePath, velocity);
          this.deadlyCollision = deadlyCollision;
          this.size = size;
          this.x = position.x;
          this.y = position.y;
          this.velocity = velocity;
      }
      
      public update() {
  
        console.log(this.deadlyCollision);
        this.x -= this.velocity;
  
        if (this.x + this.size.x < 0) {
            this.x = width;
            this.y = random(0, height);
          }
  
        if(character.x+110 > this.x && character.x < this.x + this.size.x && character.y+120 > this.y && character.y < this.y + this.size.y){
          this.deadlyCollision = true;
        }
  
        if (this.deadlyCollision) {
          this.x = width;
          gameHandler.activeScene = "gameOverScene";
          
        }
        
      }
  
      public draw() {
        // super.draw();
        image(this.image, this.x, this.y, this.size.x, this.size.y);  
      }
  }
