//---- GLOBAL VARIABLES ----//
let gameHandler: GameHandler;

interface Sounds {
  weee: p5.SoundFile;
  wooo: p5.SoundFile;
}
let sounds: Sounds;

let weee: p5.SoundFile;
let wooo: p5.SoundFile;
let canPlay = true;

interface Images {
  boat: p5.Image;
  buildings: p5.Image;
  controls: p5.Image;
  fisk: p5.Image;
  cloud1: p5.Image;
  cloud2: p5.Image;
  cloud3: p5.Image;
  katt: p5.Image;
  kattPower:p5.Image;
  shoot: p5.Image;
  explosion:p5.Image;
  redExplosion:p5.Image;
  enemy: p5.Image;
  animation:p5.Image;
  shootGreen: p5.Image;

}
let images: Images;


// function mouseClicked(event:string) {
//   console.log(event)
// }


/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 * 
 */
function preload() {
  sounds = {
    weee: loadSound('assets/weee.mp3'),
    wooo: loadSound('assets/wooo.mp3'),
  };
  weee = loadSound('assets/weee.mp3');
  wooo = loadSound('assets/wooo.mp3');
  
  images = {
    boat: loadImage('assets/boat.png'),
    buildings: loadImage('assets/building.png'),
    controls: loadImage('assets/controls.png'),
    fisk: loadImage('assets/fisk.jpg'),
    cloud1: loadImage('assets/cloud1.png'),
    cloud2: loadImage('assets/cloud2.png'),
    cloud3: loadImage('assets/cloud3.png'),
    katt: loadImage('assets/fly.png'),
    kattPower: loadImage('assets/fly-powerup.png'),
    animation: loadImage('assets/animation.png'),
    shoot: loadImage('assets/cat-shoot.png'),
    explosion: loadImage('assets/exp.png'),
    redExplosion: loadImage('assets/exp-red.png'),
    enemy: loadImage('assets/seagull.png'),
    shootGreen: loadImage('assets/cat-shoot-green.png'),
    };
  // sound: p5.SoundFile = loadSound('../assets/mySound.wav');
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  // configure default volume
  
  gameHandler = new GameHandler();
  
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  gameHandler.update();
  gameHandler.draw();
   // game.update();
  // game.draw();
  
  // character.update();
  // character.draw();
  // building.draw();
  // building.update();
  // building.mousePressed();

}


/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
