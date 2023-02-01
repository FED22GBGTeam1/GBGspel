//---- GLOBAL VARIABLES ----//
//????
let gameHandler: GameHandler;

interface Sounds {
  hast: p5.SoundFile;
  another: p5.SoundFile;
  deadseagull: p5.SoundFile;
  meow: p5.SoundFile;
  pewpew: p5.SoundFile;
  kaka: p5.SoundFile;
  boom: p5.SoundFile;
  mums: p5.SoundFile;
}

interface Images {
  donut: p5.Image;
  building: p5.Image;
  lipstick:p5.Image
  torn:p5.Image;
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

let canPlay = true;
let sounds: Sounds;
let images: Images;
let fonts: Fonts;

/**
 * Built in preload function in P5. 
 */
function preload() {
  sounds = {
    hast: loadSound('assets/Hast.mp3'),
    another: loadSound('assets/Another.mp3'),
    deadseagull: loadSound('assets/seagulldeath.mp3'),
    meow: loadSound('assets/meow.mp3'),
    pewpew: loadSound('assets/pewpew.mp3'),
    kaka: loadSound('assets/kaka.mp3'),
    boom: loadSound('assets/boom.mp3'),
    mums: loadSound('assets/mums.mp3'),
    
  };

  images = {
    donut: loadImage('assets/donut.png'),
    building: loadImage('assets/hus.png'),
    lipstick: loadImage('assets/lipstick.png'),
    torn: loadImage('assets/torn.png'),
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
}

/**
 * Built in setup function in P5.
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  
  //Sound volume
  sounds.hast.setVolume(0.06);
  sounds.another.setVolume(0.06);
  sounds.deadseagull.setVolume(0.2);
  sounds.meow.setVolume(0.2);
  sounds.pewpew.setVolume(0.2);
  sounds.kaka.setVolume(0.3);
  sounds.mums.setVolume(0.2);
  sounds.boom.setVolume(0.2);
  
  //images size
  images.catlogo.resize(230,0);
  images.instructions.resize(300,0);
  images.gameover.resize(400,0);

  gameHandler = new GameHandler();

}

/**
 * Built in draw function in P5.
 */
function draw() {
  gameHandler.update();
  gameHandler.draw();
}

/**
 *  Built in windowResize listener function in P5.
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
