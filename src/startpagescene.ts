class StartPageScene {
  /**
   * Instance of Gamehandler, sent through the IGame interface.
   */
  private game: IGame;
  /**
   * Button that starts the game.
   */
  public startButton: Button;
  /**
   * Button that pauses/plays background music.
   */
  private pauseMusicButton: Button;
  /**
   * Array with clouds.
  */
  private backgroundObjects: Gameobject[];

  constructor(game: IGame) {
    this.game = game;
    this.startButton = new Button("Start Game!", createVector(width / 2 - 80, height / 2 + 100), createVector(160, 50));
    this.pauseMusicButton = new Button("P", createVector(20, 20), createVector(40, 40), CORNER);
    this.backgroundObjects = [];
  }

  /**
   * Updates the page.
   */
  public update() {
    this.playAgain();
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.update(2);
    }
    this.createClouds();
    this.listenForPause();
  }

  /**
   * Draws the page.
   */
  public draw() {
    //Background color and clouds.
    background(50, 145, 300);
    for (const backgroundObject of this.backgroundObjects) {
      backgroundObject.draw();
    }

    //Logo and text field background.
    push();
    imageMode(CENTER);
    image(images.catlogo, width / 2, height / 2 - 160)
    image(images.textbackground, windowWidth / 2, windowHeight / 2 + 38, width / 2, height / 6);
    image(images.instructions, width / 2, windowHeight / 2 + 200);

    //Buttons
    this.startButton.draw();
    this.pauseMusicButton.draw();

    pop();
    //Text
    push();
    imageMode(CENTER);
    textAlign(CENTER);
    textSize(14)
    fill('white');
    textFont(fonts.strawberry);
    text("You are on a mission to save Gothenburg from invading seagulls.", width / 2, windowHeight / 2 + 5,)
    text("Fly your boat over the city, avoid crashing into buildings and shoot the seagulls before they kill you.", width / 2, windowHeight / 2 + 25,)
    image(images.donut, width / 2 - 140, windowHeight / 2 + 50, width / 55, height / 35)
    text("      = 5 seconds of immortality and unlimited bullets", width / 2, windowHeight / 2 + 55,)
    image(images.fisk, width / 2 - 70, windowHeight / 2 + 70, width / 50, height / 38)
    image(images.seagullstart, width / 2 - 20, windowHeight / 2 + 70, width / 50, height / 30)
    text("       +        = Extra points", width / 2, windowHeight / 2 + 75,)
    pop()
  }

  /**
   * Listens for button press and creates a new instance of the playing game scene.
  */
  public playAgain() {
    const wasPressed = this.startButton.update();
    if (wasPressed) {
      this.game.playAgain();
    }
  }

  /**
   * Listens for buttonpress and calls the playMusic funtion.
   */
  public listenForPause() {
    const wasPressed = this.pauseMusicButton.update()
    if (wasPressed)
      this.game.playMusic(sounds.another);
  }
  
  /**
   * Creates different types of clouds randomly and adds them to the backgroundObjects array.
   * The different types of clouds are determined by random values and they are initialized with random position and speed.
  */
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
      }
        
        
        
        