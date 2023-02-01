class StartPageScene {
  private game: IGame
  public startButton: Button;
  private backgroundObjects: Gameobject[];
  private pauseMusicButton: Button;

  constructor(game: IGame) {
    this.game = game;
    this.startButton = new Button("Start Game!", createVector(width/2-80, height/2 +100), createVector(160,50));
    this.pauseMusicButton = new Button("P", createVector(20, 20), createVector(40, 40), CORNER);
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
    this.listenForPause();
  }

  public draw() {
    background(50, 145, 300);
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.draw();
    }
    push();
    imageMode(CENTER);
    image(images.catlogo, width /2, height / 2 - 160)
    image(images.textbackground, windowWidth/2, windowHeight/2 + 38, width/2, height/6);
    image(images.instructions, width/2, windowHeight/2 + 200);
    this.startButton.draw();
    this.pauseMusicButton.draw();
    pop();
    push();
    imageMode(CENTER);
    textAlign(CENTER);
    textSize(14)
    fill('white');
    textFont(fonts.strawberry);
    text("You are on a mission to save Gothenburg from invading seagulls.", width/2, windowHeight/2 +5,)
    text("Fly your boat over the city, avoid crashing into buildings and shoot the seagulls before they kill you.", width/2, windowHeight/2 + 25,)
    image(images.donut, width/2 -140, windowHeight/2 + 50, width/55, height/35)
    text("      = 5 seconds of immortality and unlimited bullets", width/2, windowHeight/2 + 55,)
    image(images.fisk, width/2 -70, windowHeight/2 + 70, width/50, height/38)
    image(images.seagullstart, width/2 -20, windowHeight/2 + 70, width/50, height/30)
    text("       +        = Extra points", width/2, windowHeight/2 + 75,)
    pop()
  }

  public renderStartPage() {}
  public playGame() {}
  public displayCredits() {}
  private createClouds() {
    if (random(2) < 0.009) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(180, 450), random(100, 370)),
          images.cloud1,
          random(3),
        )
      );
    } else if (random(15) > 14.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(250, 400), random(90, 150)),
          images.cloud2,
          random(3),
        )
      );
    } else if (random(10) > 9.99) {
      this.backgroundObjects.push(
        new Cloud(
          new p5.Vector(width, random(height)),
          new p5.Vector(random(250, 650), random(100, 250)),
          images.cloud3,
          random(3),
        )
      );
    }
  }
  public listenForPause() {
    const wasPressed = this.pauseMusicButton.update()
    if (wasPressed)
    this.game.playMusic(sounds.another);
  }
}


