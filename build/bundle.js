"use strict";
class Gameobject {
    constructor(position, size, image, velocity) {
        this.position = position;
        this.size = size;
        this.image = image;
        this.velocity = velocity;
    }
    update(startingSpeed) {
        this.position.sub(startingSpeed, 0);
    }
    draw() {
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
}
class animatedObject extends Gameobject {
    constructor(position, size, image, velocity, totalFrames, frameDuration) {
        super(position, size, image, velocity);
        this.position = position;
        this.size = size;
        this.image = image;
        this.velocity = velocity;
        this.totalFrames = totalFrames;
        this.frameCounter = 0;
        this.frameDuration = frameDuration;
        this.lastFrameTime = performance.now();
        this.frame = 0;
    }
    update(startingSpeed) {
        super.update(startingSpeed);
        this.frameCounter++;
        if (this.frameCounter >= this.frameDuration) {
            this.frameCounter = 0;
            this.frame++;
            this.frame = this.frame % this.totalFrames;
        }
    }
    draw() {
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
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y, x, 0, frameWidth, frameHeight);
    }
}
class Building extends Gameobject {
    constructor(position, size, image, velocity) {
        super(position, size, image, velocity);
        this.position = position;
        this.size = size;
        this.velocity = 0;
        this.image = this.getRandomImage();
    }
    update(startingSpeed) {
        super.update(startingSpeed);
        if (this.position.x + this.size.x < 0) {
            this.image = this.getRandomImage();
        }
    }
    getRandomImage() {
        let r = Math.floor(Math.random() * 5) + 1;
        switch (r) {
            case 1:
            case 2:
            case 3:
                this.size = createVector(random(width / 6, width / 10), random(200, height / 2));
                this.position = createVector(width, height - this.size.y);
                return images.building;
            case 4:
                this.size = createVector(width / 6, height / 2);
                this.position = createVector(width, height - this.size.y);
                return images.lipstick;
            case 5:
                this.size = createVector(width / 24, height / 2 + height / 4);
                this.position = createVector(width, height - this.size.y);
                return images.torn;
            default:
                this.size = createVector(140, 140 * (678 / 146));
                this.position = createVector(width, height - this.size.y);
                return images.building;
        }
    }
}
class Bullet extends Gameobject {
    constructor(position, size, image, velocity) {
        super(position, size, image, velocity);
        this.velocity = 30;
    }
    draw() {
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
    update() {
        this.position.add(this.velocity, 0);
    }
}
class Button {
    constructor(text, position, size, align = CENTER) {
        this.text = text;
        this.position = position;
        this.size = size;
        this.align = align;
        this.mouseWasPressed = false;
        this.color = "rgb(253,2,47)";
    }
    update(xPos) {
        if (xPos) {
            this.position.x = xPos;
        }
        let x = this.position.x;
        let y = this.position.y;
        if (this.align !== CORNER) {
            x = this.position.x - this.size.x * 0.5;
            y = this.position.y - this.size.y * 0.5;
        }
        const leftSide = x;
        const rightSide = x + this.size.x;
        const topSide = y;
        const bottomSide = y + this.size.y;
        if (mouseX > leftSide &&
            mouseX < rightSide &&
            mouseY > topSide &&
            mouseY < bottomSide) {
            this.color = "rgb(225, 199, 0)";
        }
        else {
            this.color = "rgb(253,2,47)";
        }
        const isMouseReleased = this.mouseWasPressed && !mouseIsPressed;
        this.mouseWasPressed = mouseIsPressed;
        if (isMouseReleased) {
            if (mouseX > leftSide &&
                mouseX < rightSide &&
                mouseY > topSide &&
                mouseY < bottomSide) {
                return true;
            }
        }
        return false;
    }
    draw() {
        push();
        rectMode(this.align);
        stroke(225, 199, 0);
        strokeWeight(3);
        fill(this.color);
        rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
        pop();
        push();
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        textFont(fonts.strawberry);
        textSize(26);
        const x = this.align === CORNER ? this.position.x : this.position.x - this.size.x * 0.5;
        const y = this.align === CORNER ? this.position.y : this.position.y - this.size.y * 0.5;
        text(this.text, x, y, this.size.x, this.size.y);
        pop();
    }
}
class Character extends animatedObject {
    constructor(position, size, image, velocity, totalFrames, frameDuration) {
        super(position, size, image, velocity, totalFrames, frameDuration);
        this.isAlive = true;
        this.poweredUp = false;
        this.isShooting = false;
        this.soundTimeout = 1500;
        this.shootTimeout = 0;
        this.isSpaceBarPressed = false;
        this.characterGravity = 0.02;
        this.characterVelocity = 0;
        this.maxFallingVelocity = 2;
        this.deathSoundTO = true;
    }
    update() {
        this.soundTimeout -= deltaTime;
        this.shootTimeout -= deltaTime;
        this.moveCharacter();
        this.swapCharacterImage();
        this.shoot();
    }
    shoot() {
        if (keyIsDown(32) && this.shootTimeout < 0 && this.isShooting === false) {
            this.isShooting = true;
            this.playSound(sounds.pewpew);
        }
    }
    moveCharacter() {
        if (keyIsDown(UP_ARROW) && this.position.y > 0 && this.isAlive === true) {
            this.position.y -= this.velocity;
        }
        if (keyIsDown(DOWN_ARROW) &&
            this.position.y + this.size.y < height &&
            this.isAlive === true) {
            this.playSound(sounds.meow);
            this.position.y += this.velocity;
        }
        if (keyIsDown(RIGHT_ARROW) &&
            this.position.x + this.size.x < width &&
            this.isAlive === true) {
            this.position.x += this.velocity;
        }
        if (keyIsDown(LEFT_ARROW) && this.position.x > 0 && this.isAlive === true) {
            this.position.x -= this.velocity;
        }
        if (this.position.y + this.size.y < height) {
            this.characterVelocity += this.characterGravity;
            this.characterVelocity = constrain(this.characterVelocity, this.maxFallingVelocity, this.maxFallingVelocity);
            this.position.y += this.characterVelocity;
        }
        if (keyIsDown(UP_ARROW) && this.position.y == 0) {
            this.maxFallingVelocity = 0;
        }
        else if (this.position.y >= 0) {
            this.maxFallingVelocity = 2;
        }
    }
    swapCharacterImage() {
        if (this.isAlive === true &&
            this.poweredUp === true &&
            this.isShooting === false) {
            this.image = images.kattPower;
        }
        if (this.isAlive === true &&
            this.poweredUp === false &&
            this.isShooting === false) {
            this.image = images.katt;
        }
        if (this.isAlive === false) {
            this.deathSound();
            this.image = images.explosion;
            this.totalFrames = 8;
        }
        if (this.isAlive === true &&
            this.poweredUp === false &&
            this.isShooting === true) {
            this.image = images.shoot;
        }
        if (this.isAlive === true &&
            this.poweredUp === true &&
            this.isShooting === true) {
            this.image = images.shootGreen;
        }
    }
    playSound(sound) {
        if (this.soundTimeout < 0) {
            sound.play();
            this.soundTimeout = 5000;
        }
    }
    deathSound() {
        if (this.deathSoundTO == true) {
            sounds.boom.play();
            this.deathSoundTO = false;
        }
    }
}
class CityBackground extends Gameobject {
    constructor(position, size, image, velocity) {
        super(position, size, image, velocity);
    }
    update() {
        this.position.x -= this.velocity;
        this.position.x -= this.velocity;
        if (this.position.x <= -this.size.x) {
            this.position.x = this.size.x;
        }
        if (this.position.x <= -this.size.x) {
            this.position.x = this.size.x;
        }
    }
    draw() {
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
}
class Cloud extends Gameobject {
    constructor(position, size, image, velocity) {
        super(position, size, image, velocity);
    }
}
class Enemy extends animatedObject {
    constructor(position, size, image, velocity, totalFrames, frameDuration, yVelocity, isEnemyDead) {
        super(position, size, image, velocity, totalFrames, frameDuration);
        this.yVelocity = yVelocity;
        this.isEnemyDead = isEnemyDead;
    }
    update(startingSpeed) {
        super.update(startingSpeed);
        this.position.sub(this.velocity, this.yVelocity);
    }
    draw() {
        super.draw();
    }
}
class GameHandler {
    constructor() {
        this.highScore = 0;
        this.activeScene = "start";
        this.startPageScene = new StartPageScene(this);
        this.playingGameScene = new PlayingGameScene(this);
        this.gameOverScene = new GameOverScene(this);
        this.collectedFish = this.playingGameScene.fishAmount;
        this.seagullsKilled = this.playingGameScene.seagullsKilled;
        this.elapsedTime = this.playingGameScene.elapsedTime;
        this.musicIsPlaying = false;
        this.currentSong = sounds.another;
    }
    update() {
        this.fetchHighScore();
        switch (this.activeScene) {
            case "start":
                this.startPageScene.update();
                break;
            case "play":
                this.playingGameScene.update();
                break;
            case "over":
                this.gameOverScene.update();
                this.elapsedTime = this.playingGameScene.elapsedTime;
                this.collectedFish = this.playingGameScene.fishAmount;
                this.seagullsKilled = this.playingGameScene.seagullsKilled;
                break;
            default:
        }
    }
    draw() {
        switch (this.activeScene) {
            case "start":
                this.startPageScene.draw();
                break;
            case "play":
                this.playingGameScene.draw();
                break;
            case "over":
                this.gameOverScene.draw();
                break;
            default:
        }
    }
    playAgain() {
        sounds.another.stop();
        this.musicIsPlaying = false;
        this.playingGameScene = new PlayingGameScene(this);
        this.activeScene = "play";
        this.playMusic(sounds.hast);
    }
    goToStart() {
        sounds.another.stop();
        this.musicIsPlaying = false;
        this.startPageScene = new StartPageScene(this);
        this.activeScene = "start";
        this.playMusic(sounds.another);
    }
    goToGameOver() {
        sounds.hast.stop();
        this.musicIsPlaying = false;
        this.gameOverScene = new GameOverScene(this);
        this.activeScene = "over";
        this.playMusic(sounds.another);
    }
    playMusic(sound) {
        if (this.musicIsPlaying === false) {
            sound.play();
            sound.loop();
            this.currentSong = sound;
            this.musicIsPlaying = true;
        }
        else {
            sound.stop();
            this.musicIsPlaying = false;
        }
    }
    fetchHighScore() {
        let storedScore = localStorage.getItem("highScore");
        if (storedScore) {
            this.highScore = parseInt(storedScore);
        }
    }
}
class GameOverScene {
    constructor(game) {
        this.game = game;
        this.finalScore = 0;
        this.fishScore = 0;
        this.birdScore = 0;
        this.scoreColor = 'white';
        this.scoreFade = 0;
        this.playAgainButton = new Button("Play Again", new p5.Vector(width / 2 - 100, height / 2 + 150), new p5.Vector(200, 40));
        this.goToStartButton = new Button("Startmenu", createVector(width / 2 - 100, height / 2 + 200), createVector(200, 40));
        this.pauseMusicButton = new Button("P", createVector(20, 20), createVector(40, 40), CORNER);
        this.backgroundObjects = [];
    }
    update() {
        this.scoreFade += deltaTime;
        for (const backgroundObject of this.backgroundObjects) {
            backgroundObject.update(3);
        }
        this.loadStartMenu();
        this.replayGame();
        this.calculateScore();
        this.checkAndSaveScore();
        this.game.fetchHighScore();
        this.createClouds();
        this.listenForPause();
    }
    draw() {
        background(50, 145, 300);
        for (const backgroundObject of this.backgroundObjects) {
            backgroundObject.draw();
        }
        push();
        imageMode(CENTER);
        image(images.textbackground, windowWidth / 2, windowHeight / 2 + 5, width / 3, height / 3 + 10);
        image(images.gameover, width / 2, height / 2 - 200);
        pop();
        push();
        imageMode(CENTER);
        textAlign(CENTER);
        textSize(20);
        fill('white');
        textFont(fonts.strawberry);
        text("Current highscore: " + this.game.highScore.valueOf(), width / 2, windowHeight / 2 - 70);
        textSize(16);
        textAlign(LEFT);
        if (this.scoreFade > 200) {
            text(": " + this.fishScore + " points", width / 2 - 25, windowHeight / 2 + -30);
            image(images.fisk, width / 2 - 45, windowHeight / 2 - 36, width / 50, height / 38);
        }
        ;
        if (this.scoreFade > 700) {
            textAlign(CENTER);
            text("+", width / 2 - 10, windowHeight / 2 + -10);
        }
        if (this.scoreFade > 1300) {
            textAlign(LEFT);
            image(images.seagullstart, width / 2 - 40, windowHeight / 2 + 5, width / 50, height / 30);
            text(": " + this.birdScore + " points", width / 2 - 25, windowHeight / 2 + 10);
        }
        if (this.scoreFade > 1800) {
            textAlign(CENTER);
            text("+", width / 2 - 10, windowHeight / 2 + 30);
        }
        if (this.scoreFade > 2300) {
            text("Distance travelled: " + this.game.elapsedTime.valueOf() + " meter", width / 2, windowHeight / 2 + 50);
            text("=", width / 2 - 10, windowHeight / 2 + 70);
        }
        if (this.scoreFade > 2800) {
            textSize(20);
            fill(this.scoreColor);
            text("Your score: " + this.finalScore + "!", width / 2, windowHeight / 2 + 90);
        }
        this.goToStartButton.draw();
        this.playAgainButton.draw();
        this.pauseMusicButton.draw();
        pop();
    }
    replayGame() {
        const wasPressed = this.playAgainButton.update(width * 0.5);
        if (wasPressed) {
            this.game.playAgain();
        }
    }
    loadStartMenu() {
        const wasPressed = this.goToStartButton.update(width * 0.5);
        if (wasPressed) {
            this.game.goToStart();
        }
    }
    listenForPause() {
        const wasPressed = this.pauseMusicButton.update();
        if (wasPressed)
            this.game.playMusic(sounds.another);
    }
    calculateScore() {
        this.fishScore = this.game.collectedFish.valueOf() * 200;
        this.birdScore = this.game.seagullsKilled.valueOf() * 100;
        this.finalScore = this.fishScore + this.birdScore + this.game.elapsedTime.valueOf();
        return this.finalScore;
    }
    checkAndSaveScore() {
        if (this.finalScore > this.game.highScore) {
            localStorage.setItem("highScore", this.finalScore.toString());
            this.game.highScore = this.finalScore;
            this.scoreColor = 'lightgreen';
        }
    }
    createClouds() {
        if (random(2) < 0.009) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height)), new p5.Vector(random(180, 450), random(100, 370)), images.cloud1, random(3)));
        }
        else if (random(15) > 14.99) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height)), new p5.Vector(random(250, 400), random(90, 150)), images.cloud2, random(3)));
        }
        else if (random(10) > 9.99) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height)), new p5.Vector(random(250, 650), random(100, 250)), images.cloud3, random(3)));
        }
    }
}
class Item extends Gameobject {
    constructor(position, size, image, velocity) {
        super(position, size, image, velocity);
    }
}
class PlayingGameScene {
    constructor(game) {
        this.game = game;
        this.startingSpeed = 5;
        this.acceleration = 0;
        this.position = createVector(0, 0);
        this.character = new Character(createVector(50, 300), createVector(width / 9, height / 10), images.katt, 10, 8, 80);
        this.bullets = [];
        this.backgroundObjects = [];
        this.enemies = [];
        this.building = new Building(createVector(width, height), createVector(140, height), images.building, 0);
        this.fishes = [];
        this.fishAmount = 0;
        this.seagullsKilled = 0;
        this.acceleration = 0.1;
        this.powerUps = [];
        this.isEnemyDead = false;
        this.time = 0;
        this.soundEffectTimeOut = 1000;
        this.isEnemyDead = false;
        this.startTime = Date.now();
        this.elapsedTime = 0;
        this.calcScoreGameOver = new Button("Calculate Score", new p5.Vector(width / 2 - 50, height / 3), new p5.Vector(300, 50));
        this.bg1 = new CityBackground(createVector(0, 0), createVector(width, height), images.city, 1 + this.acceleration);
        this.bg2 = new CityBackground(createVector(width, 0), createVector(width, height), images.city, 1 + this.acceleration);
        this.pauseMusicButton = new Button("P", createVector(20, 20), createVector(40, 40), CORNER);
    }
    update() {
        this.time -= deltaTime;
        this.soundEffectTimeOut -= deltaTime;
        this.acceleration += 0.001;
        this.trackTime();
        this.createClouds();
        this.createEnemys();
        this.createFish();
        this.createPowerUp();
        this.character.update();
        this.updateEntities();
        this.detectCollision();
        this.collectedItem();
        this.collectedPowerup();
        this.renderBullets();
        this.enemyCrash();
        this.enemyShot();
        this.enemyCrash();
        this.detectOverlap(this.building, this.fishes);
        this.bg1.update();
        this.bg2.update();
        this.removeShootTimeOut();
        this.amIPowerful();
        this.amIAlive();
        this.listenForPause();
    }
    draw() {
        background(50, 145, 300);
        this.bg1.draw();
        this.bg2.draw();
        this.drawEntities();
        this.character.draw();
        this.showCurrentStats();
        this.pauseMusicButton.draw();
        if (this.character.isAlive === false) {
            this.calcScoreGameOver.draw();
        }
    }
    showCurrentStats() {
        push();
        image(images.stats, width / 2 - 640 / 2, 0, 750, 41);
        pop();
        push();
        textAlign(LEFT);
        textSize(18);
        fill(255);
        text("Meters: " + this.elapsedTime, width / 2 - 640 / 2 + 20, 28);
        pop();
        push();
        textAlign(LEFT);
        textSize(18);
        fill(255);
        text(this.seagullsKilled, width / 2 - 640 / 2 + 540, 28);
        pop();
        push();
        textAlign(LEFT);
        textSize(18);
        fill(255);
        text(this.fishAmount, width / 2 - 640 / 2 + 680, 28);
        pop();
    }
    trackTime() {
        if (this.character.isAlive) {
            this.elapsedTime = Math.floor(Date.now() - this.startTime) / 10;
            this.elapsedTime = Math.round(this.elapsedTime);
        }
    }
    removeShootTimeOut() {
        if (this.character.poweredUp === true) {
            this.character.shootTimeout = 0;
        }
    }
    updateEntities() {
        for (const backgroundObject of this.backgroundObjects) {
            backgroundObject.update((this.startingSpeed + this.acceleration) / 5);
        }
        for (const fish of this.fishes) {
            fish.update(this.startingSpeed + this.acceleration);
        }
        for (const powerup of this.powerUps) {
            powerup.update(this.startingSpeed + this.acceleration);
        }
        for (const enemy of this.enemies) {
            enemy.update(this.startingSpeed);
        }
        for (const bullet of this.bullets) {
            bullet.update();
        }
        this.building.update(this.startingSpeed + this.acceleration);
    }
    renderBullets() {
        if (this.character.isShooting === true && this.character.shootTimeout < 0) {
            this.bullets.push(new Bullet(new p5.Vector(this.character.position.x + this.character.size.x - 45, this.character.position.y + 20), new p5.Vector(width / 150, height / 100), images.bullet, width / 100));
            this.character.shootTimeout = 500;
            setTimeout(() => {
                this.character.isShooting = false;
            }, 500);
        }
    }
    createClouds() {
        if (random(2) < 0.004) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height / 10) - 20), new p5.Vector(random(width / 10, width / 4), random(height / 10, height / 8)), images.cloud1, random(3)));
        }
        else if (random(15) > 14.99) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height / 10) - 20), new p5.Vector(random(width / 10, width / 4), random(height / 10, height / 8)), images.cloud2, random(3)));
        }
        else if (random(10) > 9.99) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height / 10) - 20), new p5.Vector(random(width / 10, width / 4), random(height / 10, height / 8)), images.cloud3, random(3)));
        }
    }
    createEnemys() {
        if (random(2) < 0.015) {
            this.enemies.push(new Enemy(new p5.Vector(width, random(height)), new p5.Vector(width / 19, height / 10), images.enemy, this.startingSpeed + this.acceleration + random(-2, 1), 4, 200, random(-2, 2), false));
        }
        if (this.elapsedTime > 3000 && random(2) < 0.009) {
            this.enemies.push(new Enemy(new p5.Vector(width, random(height)), new p5.Vector(width / 19, height / 10), images.redEnemy, this.startingSpeed + this.acceleration + random(4, 6), 4, 200, random(3), false));
            if (this.character.isAlive === true) {
                this.playSoundEffect(sounds.kaka);
            }
        }
    }
    createFish() {
        if (random(2) < 0.012) {
            this.fishes.push(new Item(new p5.Vector(width, random(height)), new p5.Vector(width / 30, height / 25), images.fisk, random(3)));
        }
    }
    createPowerUp() {
        if (random(2) < 0.001) {
            this.powerUps.push(new Powerup(new p5.Vector(width, random(height)), new p5.Vector(width / 36, height / 22), images.donut, this.startingSpeed + this.acceleration));
        }
    }
    drawEntities() {
        this.building.draw();
        for (const enemies of this.enemies) {
            enemies.draw();
        }
        for (const fish of this.fishes) {
            fish.draw();
        }
        for (const powerup of this.powerUps) {
            powerup.draw();
        }
        for (const bullet of this.bullets) {
            bullet.draw();
        }
    }
    detectCollision() {
        if (this.character.position.x + this.character.size.x >
            this.building.position.x &&
            this.character.position.x <
                this.building.position.x + this.building.size.x &&
            this.character.position.y + this.character.size.y >
                this.building.position.y &&
            this.character.position.y <
                this.building.position.y + this.building.size.y) {
            if (this.character.poweredUp === false) {
                this.character.isAlive = false;
            }
        }
    }
    collectedItem() {
        for (let i = 0; i < this.fishes.length; i++) {
            if (this.character.position.x + this.character.size.x >
                this.fishes[i].position.x &&
                this.character.position.x <
                    this.fishes[i].position.x + this.fishes[i].size.x &&
                this.character.position.y + this.character.size.y >
                    this.fishes[i].position.y &&
                this.character.position.y <
                    this.fishes[i].position.y + this.fishes[i].size.y) {
                this.fishAmount += 1;
                this.fishes.splice(i, 1);
                break;
            }
        }
    }
    collectedPowerup() {
        for (let i = 0; i < this.powerUps.length; i++) {
            if (this.character.position.x + this.character.size.x >
                this.powerUps[i].position.x &&
                this.character.position.x <
                    this.powerUps[i].position.x + this.powerUps[i].size.x &&
                this.character.position.y + this.character.size.y >
                    this.powerUps[i].position.y &&
                this.character.position.y <
                    this.powerUps[i].position.y + this.powerUps[i].size.y) {
                this.time = 5000;
                this.powerUps.splice(i, 1);
                this.character.poweredUp = true;
                this.playSoundEffect(sounds.mums);
                break;
            }
        }
    }
    detectOverlap(building, fishes) {
        for (let i = 0; i < fishes.length; i++) {
            if (building.position.x + building.size.x > fishes[i].position.x &&
                building.position.x < fishes[i].position.x + fishes[i].size.x &&
                building.position.y + building.size.y > fishes[i].position.y &&
                building.position.y < fishes[i].position.y + fishes[i].size.y) {
                fishes.splice(i, 1);
                break;
            }
        }
    }
    enemyCrash() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (!this.enemies[i].isEnemyDead &&
                this.character.position.x + this.character.size.x >
                    this.enemies[i].position.x &&
                this.character.position.x <
                    this.enemies[i].position.x + this.enemies[i].size.x &&
                this.character.position.y + this.character.size.y >
                    this.enemies[i].position.y &&
                this.character.position.y <
                    this.enemies[i].position.y + this.enemies[i].size.y &&
                this.character.poweredUp === false) {
                this.enemies[i].image = images.redExplosion;
                this.enemies[i].totalFrames = 8;
                this.enemies[i].framesDuration = 80;
                this.character.isAlive = false;
                this.enemies[i].image = images.redExplosion;
                this.enemies[i].totalFrames = 8;
                this.enemies[i].framesDuration = 80;
                break;
            }
        }
    }
    enemyShot() {
        let collisionDistance = 100;
        for (let i = 0; i < this.bullets.length; i++) {
            for (let j = 0; j < this.enemies.length; j++) {
                if (!this.bullets[i] || !this.enemies[j]) {
                    continue;
                }
                if (this.bullets[i].position.dist(this.enemies[j].position) <
                    collisionDistance &&
                    !this.enemies[j].isEnemyDead) {
                    this.bullets.splice(i, 1);
                    this.playSoundEffect(sounds.deadseagull);
                    this.enemies[j].image = images.redExplosion;
                    this.enemies[j].totalFrames = 8;
                    this.enemies[j].framesDuration = 90;
                    this.enemies[j].velocity = 0;
                    this.enemies[j].yVelocity = 0;
                    this.enemies[j].isEnemyDead = true;
                    setTimeout(() => {
                        this.enemies.splice(j, 1);
                        this.seagullsKilled += 1;
                    }, 450);
                }
            }
        }
    }
    amIPowerful() {
        if (this.time < 0) {
            this.character.poweredUp = false;
        }
    }
    amIAlive() {
        if (this.character.isAlive === false) {
            this.startingSpeed = 0;
            this.acceleration = 0;
            this.bg1.velocity = 0;
            this.bg2.velocity = 0;
            this.building.velocity = 0;
            for (const enemy of this.enemies) {
                enemy.velocity = 0;
            }
            this.gameOverButton();
        }
    }
    playSoundEffect(sound) {
        if (this.soundEffectTimeOut < 0)
            sound.play();
        this.soundEffectTimeOut = 1000;
    }
    gameOverButton() {
        const wasPressed = this.calcScoreGameOver.update();
        if (wasPressed) {
            this.game.goToGameOver();
        }
    }
    listenForPause() {
        const wasPressed = this.pauseMusicButton.update();
        if (wasPressed)
            this.game.playMusic(sounds.hast);
    }
}
class Powerup extends Item {
    constructor(position, size, image, velocity) {
        super(position, size, image, velocity);
    }
    update(startingSpeed) {
        this.position.sub(startingSpeed, 0);
    }
    draw() {
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
}
let gameHandler;
let canPlay = true;
let sounds;
let images;
let fonts;
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
    };
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    sounds.hast.setVolume(0.06);
    sounds.another.setVolume(0.06);
    sounds.deadseagull.setVolume(0.2);
    sounds.meow.setVolume(0.2);
    sounds.pewpew.setVolume(0.2);
    sounds.kaka.setVolume(0.3);
    sounds.mums.setVolume(0.2);
    sounds.boom.setVolume(0.2);
    images.catlogo.resize(230, 0);
    images.instructions.resize(300, 0);
    images.gameover.resize(400, 0);
    gameHandler = new GameHandler();
}
function draw() {
    gameHandler.update();
    gameHandler.draw();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
class StartPageScene {
    constructor(game) {
        this.game = game;
        this.startButton = new Button("Start Game!", createVector(width / 2 - 20, height / 2 + 140), createVector(160, 50));
        this.pauseMusicButton = new Button("P", createVector(20, 20), createVector(40, 40), CORNER);
        this.backgroundObjects = [];
    }
    update() {
        this.playAgain();
        for (const backgroundObject of this.backgroundObjects) {
            backgroundObject.update(2);
        }
        this.createClouds();
        this.listenForPause();
    }
    draw() {
        background(50, 145, 300);
        for (const backgroundObject of this.backgroundObjects) {
            backgroundObject.draw();
        }
        push();
        imageMode(CENTER);
        image(images.catlogo, width / 2, height / 2 - 160);
        image(images.textbackground, windowWidth / 2, windowHeight / 2 + 38, width / 2, height / 6);
        image(images.instructions, width / 2, windowHeight / 2 + 200);
        this.startButton.draw();
        this.pauseMusicButton.draw();
        pop();
        push();
        imageMode(CENTER);
        textAlign(CENTER);
        textSize(14);
        fill('white');
        textFont(fonts.strawberry);
        text("You are on a mission to save Gothenburg from invading seagulls.", width / 2, windowHeight / 2 + 5);
        text("Fly your boat over the city, avoid crashing into buildings and shoot the seagulls before they kill you.", width / 2, windowHeight / 2 + 25);
        image(images.donut, width / 2 - 140, windowHeight / 2 + 50, width / 55, height / 35);
        text("      = 5 seconds of immortality and unlimited bullets", width / 2, windowHeight / 2 + 55);
        image(images.fisk, width / 2 - 70, windowHeight / 2 + 70, width / 50, height / 38);
        image(images.seagullstart, width / 2 - 20, windowHeight / 2 + 70, width / 50, height / 30);
        text("       +        = Extra points", width / 2, windowHeight / 2 + 75);
        pop();
    }
    playAgain() {
        const wasPressed = this.startButton.update();
        if (wasPressed) {
            this.game.playAgain();
        }
    }
    listenForPause() {
        const wasPressed = this.pauseMusicButton.update();
        if (wasPressed)
            this.game.playMusic(sounds.another);
    }
    createClouds() {
        if (random(2) < 0.009) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height)), new p5.Vector(random(180, 450), random(100, 370)), images.cloud1, random(3)));
        }
        else if (random(15) > 14.99) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height)), new p5.Vector(random(250, 400), random(90, 150)), images.cloud2, random(3)));
        }
        else if (random(10) > 9.99) {
            this.backgroundObjects.push(new Cloud(new p5.Vector(width, random(height)), new p5.Vector(random(250, 650), random(100, 250)), images.cloud3, random(3)));
        }
    }
}
//# sourceMappingURL=bundle.js.map