// Canvas related
let WIDTH = 740;
let HEIGHT = 400;

// Frames related
let nbFrame = 0;
let FRAME_RATE = 15;

// Obstacles
let walls = [];
let WALL_DISTANCE_MIN = 50;

// Lives related
let lives = [];
let inertie = 0.3;
let LIFE_STEP = 3;
let LIFE_DISTANCE_MIN = 5;
let LIFE_DISTANCE_MAX = 40;
let LIFE_SPEED_MIN = -1;
let LIFE_SPEED_MAX = 1;

class Wall {
    // todo pendant la generation:
    // startX doit être plus petit que endX
    // startY doit être plus petit que endY
    constructor(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    draw() {
        fill(0);
        line(this.startX, this.startY, this.endX, this.endY);
    }
}

class Life {
    constructor(x, y, dir) {
        this.posXOld = x;
        this.posYOld = y;
        this.posX = x;
        this.posY = y;
        this.speedX = cos(dir);
        this.speedY = sin(dir);
    }

    updatePosition() {
        this.posXOld = this.posX;
        this.posYOld = this.posY;
        this.posX += LIFE_STEP * this.speedX;
        this.posY += LIFE_STEP * this.speedY;
    }

    setSpeedX(speedX) {
        this.speedX = speedX < LIFE_SPEED_MIN ? LIFE_SPEED_MIN : speedX > LIFE_SPEED_MAX ? LIFE_SPEED_MAX : speedX;
    }

    setSpeedY(speedY) {
        this.speedY = speedY < LIFE_SPEED_MIN ? LIFE_SPEED_MIN : speedY > LIFE_SPEED_MAX ? LIFE_SPEED_MAX : speedY;
    }

    squareDistanceTo(anotherLife) {
        return square(this.posX - anotherLife.posX) + (this.posY - anotherLife.posY);
    }

    near(anotherLife) {
        let squareDistance = squareDistanceTo(anotherLife);
        return squareDistance < square(LIFE_DISTANCE_MAX) && squareDistance > square(LIFE_DISTANCE_MIN);
    }

    // validated
    distanceToWall(wall) {
        let minDistance = min(this.posX - wall.startX, this.posY - wall.startY);
        minDistance = min(minDistance, wall.endY - this.posY);
        minDistance = min(minDistance, wall.endX - this.posX);

        return minDistance;
    }

    moveStrategy() {
        if (!this.avoidWalls()) {
            // todo check if should avoid lives
        } else {
            print("too near!");
        }
    }

    avoidWalls() {
        for (let i = 0; i < walls.length; i++) {
            if (abs(this.distanceToWall(walls[i])) < WALL_DISTANCE_MIN) {
                print(this.distanceToWall(walls[i]));
                // startX
                // endX
                if (walls[i].posX < this.posX) {
                    print("1");
                    this.setPosX(this.setPosX + inertie);
                }
                if (walls[i].posX > this.posX) {
                    print("2");
                    this.setPosX(this.setPosX - inertie);
                }
                if (walls[i].posY < this.posY) {
                    print("3");
                    this.setPosY(this.setPosY + inertie);
                }
                if (walls[i].posY > this.posY) {
                    print("4");
                    this.setPosY(this.setPosY - inertie);
                }
                return true;
            }
        }
        return false;
    }

    normalize() {
        var speedLength = root(this.speedX * this.speedX + this.speedY * speedY);
        this.speedX /= speedLength;
        this.speedY /= speedLength;
    }

    draw() {
        fill(0);
        line(this.posXOld, this.posYOld, this.posX, this.posY);
    }
}

function setupWalls() {
    walls.push(new Wall(0, 0, WIDTH, 0));
    walls.push(new Wall(WIDTH, 0, WIDTH, HEIGHT));
    walls.push(new Wall(0, HEIGHT, WIDTH, HEIGHT));
    walls.push(new Wall(0, 0, 0, HEIGHT));
}

function createLives() {
    //lives.push(new Life(40, 40, 0.5));
    lives.push(new Life(140, 55, -1));
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    setupWalls();
    createLives();
}

function drawNbFrame() {
    textSize(32);
    fill('red');
    text(nbFrame, 10, 30);
}

function drawWalls() {
    for (let i = 0; i < walls.length; i++) {
        walls[i].draw();
    }
}

function updateAndDrawLives() {
    for (let i = 0; i < lives.length; i++) {
        lives[i].moveStrategy();
        lives[i].updatePosition();
        lives[i].draw();
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        lives[0].setSpeedX(lives[0].speedX - inertie);
    } else if (keyCode === RIGHT_ARROW) {
        lives[0].setSpeedX(lives[0].speedX + inertie);
    } else if (keyCode === UP_ARROW) {
        lives[0].setSpeedY(lives[0].speedY - inertie);
    } else if (keyCode === DOWN_ARROW) {
        lives[0].setSpeedY(lives[0].speedY + inertie);
    }
}

function draw() {
    background(255);
    frameRate(FRAME_RATE);

    drawWalls();
    updateAndDrawLives();

    // print(lives[0].distanceToWall(walls[3]));

    nbFrame++;
    drawNbFrame();
}
