/// <reference path="gameobject.ts"/>

class animatedObject extends Gameobject {
  /**
   *  A variable to keep track of the current frame
   * */
  private frameCounter: number;

  /**
   * The time when the last frame was displayed
   * */ 
  protected frameDuration: number;

  /**
   * The time when the last frame was displayed
   * */ 
  protected lastFrameTime: number;

  /**
   * The current frame number
   **/ 
  private frame: number;
  /**
   * Total number of frames in the animation
   */
  public totalFrames: number;

  constructor(
    position: p5.Vector,
    size: p5.Vector,
    image: p5.Image,
    velocity: number,
    totalFrames: number,
    frameDuration: number
  ) {
    super(position, size, image, velocity);

    this.position = position;
    this.size = size;
    this.image = image;
    this.velocity = velocity;
    this.totalFrames = totalFrames;

    // Initialize the frameCounter to 0
    this.frameCounter = 0;

    this.frameDuration = frameDuration;

    // Set the time when the last frame was displayed to the current time
    this.lastFrameTime = performance.now();

    // Start with the first frame
    this.frame = 0;
  }
  /**
   * 
   * Increases the frames until it hits the totalframes amount
   */
  public update(startingSpeed: number) {
    super.update(startingSpeed);
    // Increase the frameCounter by 1
    this.frameCounter++;

    // If the frameCounter is equal or greater than the frameDuration, it's time to change the frame
    if (this.frameCounter >= this.frameDuration) {
      // Reset the frameCounter to 0
      this.frameCounter = 0;
      // Increase the frame number by 1
      this.frame++;
      // Use the modulo operator to ensure that the frame number stays within the range of totalFrames
      this.frame = this.frame % this.totalFrames;
    }
  }
  /**
   * 
   * Draws out the image with the new position
   */
  public draw() {
    // Calculate the width and height of each frame
    let frameWidth, frameHeight;
    frameWidth = this.image.width / this.totalFrames;
    frameHeight = this.image.height;

    // Get the current time
    let currentTime = performance.now();

    // Calculate the time elapsed since the last frame was displayed
    let deltaTime = currentTime - this.lastFrameTime;

    // If the elapsed time is equal or greater than the frameDuration, it's time to change the frame
    if (deltaTime >= this.frameDuration) {
      // Increase the frame number by 1
      this.frame = (this.frame + 1) % this.totalFrames;

      // Update the time when the last frame was displayed to the current time
      this.lastFrameTime = currentTime;
    }
    let x = this.frame * frameWidth;
    image(this.image,this.position.x,this.position.y,this.size.x,this.size.y,x,0,frameWidth,frameHeight
    );
  }
}
