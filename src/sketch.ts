//---- GLOBAL VARIABLES ----//
let startPageScene: StartPageScene;
let playingGameScene: PlayingGameScene;
let gameOverScene: GameOverScene;

let gameHandler: GameHandler;


let character: Character;
let building: Building;
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

  character = new Character(createVector(50,300), createVector(175, 125), "./assets/katt.png", 0,true);
  startPageScene = new StartPageScene();
  playingGameScene = new PlayingGameScene();
  gameOverScene = new GameOverScene();
  gameHandler = new GameHandler();

  

}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  gameHandler.draw();
  gameHandler.update();
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
