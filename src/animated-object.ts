/// <reference path="gameobject.ts"/>

class animatedObject extends Gameobject {
  private frameCounter: number;
  protected frameDuration: number;
  protected lastFrameTime: number;
  protected frame: number;
  public totalFrames: number;

  constructor(
    position: p5.Vector,
    size: p5.Vector,
    imagePath: string,
    velocity: number,
    totalFrames: number,
    frameDuration: number
  ) {
    super(position, size, imagePath, velocity);
    this.position = position;
    this.size = size;
    this.image = loadImage(imagePath);
    this.velocity = velocity;
    this.totalFrames = totalFrames;
    this.frameCounter = 0;
    this.frameDuration = frameDuration;
    this.lastFrameTime = performance.now();
    this.frame = 0;
  }

  public update() {
    this.frameCounter++;
    if (this.frameCounter >= this.frameDuration) {
      this.frameCounter = 0;
      this.frame++;
      this.frame = this.frame % this.totalFrames;
    }
  }
  public draw() {
    let frameWidth, frameHeight;
    frameWidth = this.image.width / this.totalFrames;
    frameHeight = this.image.height;

    let currentTime = performance.now();

    let deltaTime = currentTime - this.lastFrameTime;
    if (deltaTime >= this.frameDuration) {
      this.frame = (this.frame + 1) % this.totalFrames;
      this.lastFrameTime = currentTime;
    }
    let x = this.frame * frameWidth;
    image(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
      x,
      0,
      frameWidth,
      frameHeight
    );
  }
}
