class StartPageScene {
  private game: IGame
  public startButton: Button;
  private backgroundObjects: Gameobject[];

  constructor(game: IGame) {
    this.game = game;
    this.startButton = new Button("Start Game!", createVector(width/2-100, height/2-100), createVector(200,100));
    this.backgroundObjects = [];
  }

  public playAgain() {
    
    const wasPressed = this.startButton.update();
    if (wasPressed) {
      this.game.playAgain();
    }
    
  }
  
  public update() {
    this.playAgain();
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.update(2);
    }
    this.createClouds();
  }

  //You are on a mission to save Gothenburg from the evil seagulls.
  //Fly your boat over the city, avoid crashing into buildings and shoot the seagulls before they kill you.
  //{Donut} = 5 seconds of immortality
  //{Fish} & {Seagull} = Extra points..


  public draw() {
    background(50, 145, 300);
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.draw();
    }
    //textSize(32);
    //text("Flying Cat Game", width/2, height/2-200);
    
    this.startButton.draw();
    //image(images.controls, width/2-(1508/2-380), height/2-290);
    push();
    imageMode(CENTER);
    image(images.instructions, width/2, 800);
    image(images.textbackground, windowWidth/2, 630);
    pop();
    push();
    textAlign(CENTER);
    textSize(20)
    textFont(fonts.strawberry);
    text("You are on a mission to save Gothenburg from invading seagulls.", width/2, 600,)
    text("Fly your boat over the city, avoid crashing into buildings and shoot the seagulls before they kill you.", width/2, 630,)
    text("{Donut} = 5 seconds of immortality", width/2, 670,)
    text("{Fish} & {Seagull} = Extra points", width/2, 700,)
    pop()



  }

  public renderStartPage() {}
  public playGame() {}
  public displayCredits() {}
  private createClouds() {
    if (random(2) < 0.002) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(180, 450), random(100, 370)),
          "assets/cloud1.png",
          random(3),
          random(3)
        )
      );
    } else if (random(15) > 14.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(250, 400), random(90, 150)),
          "assets/cloud2.png",
          random(3),
          random(3)
        )
      );
    } else if (random(10) > 9.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(250, 650), random(100, 250)),
          "assets/cloud3.png",
          random(3),
          random(3)
        )
      );
    }
  }
}


