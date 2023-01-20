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
