//---- GLOBAL VARIABLES ----//
let game: Game;
let character: Character;
let building: Building;




/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 * 
 */
function preload() {

 
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
  background('gray');
  character = new Character(createVector(50,300), createVector(150, 150), "./assets/boat.png", 0);
  building = new Building(createVector(windowWidth, windowHeight-400), createVector(200,400), "./assets/building.png", 5, false);
 
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  
  game.update();
  game.draw();
  
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
