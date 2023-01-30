//import { Font } from "p5";

//---- GLOBAL VARIABLES ----//
let gameHandler: GameHandler;

interface Sounds {
  weee: p5.SoundFile;
  wooo: p5.SoundFile;
  hast: p5.SoundFile;
  another: p5.SoundFile;
}
let sounds: Sounds;

let weee: p5.SoundFile;
let wooo: p5.SoundFile;
let canPlay = true;

interface Images {
  donut: p5.Image;
  building: p5.Image;
  lipstick:p5.Image
  torn:p5.Image;
  controls: p5.Image;
  fisk: p5.Image;
  cloud1: p5.Image;
  cloud2: p5.Image;
  cloud3: p5.Image;
  katt: p5.Image;
  kattPower: p5.Image;
  shoot: p5.Image;
  explosion: p5.Image;
  redExplosion: p5.Image;
  enemy: p5.Image;
  redEnemy:p5.Image;
  shootGreen: p5.Image;
  bullet: p5.Image;
  city: p5.Image;
  stats: p5.Image;
  instructions: p5.Image;
  textbackground: p5.Image;
  catlogo: p5.Image;
  seagullstart: p5.Image;
  gameover: p5.Image;
}

interface Fonts {
  strawberry: p5.Font
}

let images: Images;
let fonts: Fonts;


// function mouseClicked(event:string) {
//   console.log(event)
// }

//test


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
    hast: loadSound('assets/Hast.mp3'),
    another: loadSound('assets/Another.mp3'),
  };
  weee = loadSound('assets/weee.mp3');
  wooo = loadSound('assets/wooo.mp3');
  images = {
    donut: loadImage('assets/donut.png'),
    building: loadImage('assets/hus.png'),
    lipstick: loadImage('assets/lipstick.png'),
    torn: loadImage('assets/torn.png'),
    controls: loadImage('assets/newPicturee.png'),
    fisk: loadImage('assets/fisk.png'),
    cloud1: loadImage('assets/cloud1.png'),
    cloud2: loadImage('assets/cloud2.png'),
    cloud3: loadImage('assets/cloud3.png'),
    katt: loadImage('assets/fly.png'),
    kattPower: loadImage('assets/fly-powerup.png'),
    shoot: loadImage('assets/skjut.png'),
    explosion: loadImage('assets/exp.png'),
    redExplosion: loadImage('assets/exp-red.png'),
    enemy: loadImage('assets/seagull.png'),
    redEnemy: loadImage('assets/RedSeagull.png'),
    shootGreen: loadImage('assets/skjut-green.png'),
    bullet: loadImage('assets/bullet.png'),
    city: loadImage('assets/city.png'),
    stats: loadImage('assets/stats.png'),
    instructions: loadImage('assets/instructions.png'),
    textbackground: loadImage('assets/textbackground.png'),
    catlogo: loadImage('assets/catlogo.png'),
    seagullstart: loadImage('assets/seagullstart.png'),
    gameover: loadImage('assets/gameover.png')
  };
  fonts = {
    strawberry: loadFont('assets/strawberry.ttf'),
  }
  // sound: p5.SoundFile = loadSound('../assets/mySound.wav');
}

/**
 * Built in setup function in P5.
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  // configure default volume
  //sounds.hast.play();


  sounds.hast.setVolume(0.06);
  sounds.another.setVolume(0.06);
  images.catlogo.resize(230,0);
  images.instructions.resize(300,0);
  images.gameover.resize(400,0);
  //images.textbackground.resize(860,100);
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
