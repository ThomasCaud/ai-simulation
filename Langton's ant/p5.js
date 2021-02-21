let w = 15;
let columns;
let rows;
let board;
let ant;
let nbMove = 0;

class Ant {
    constructor() {
        this.x = 23;
        this.y = 12;
        let tmp = 1;
        this.direction = tmp == 0 ? 'LEFT' : tmp == 1 ? 'TOP' : tmp == 2 ? 'RIGHT' : 'BOTTOM';
    }

    move(currentCaseValue) {
        this.changeDirection(currentCaseValue);
        this.go();
    }

    changeDirection(currentCaseValue) {
        if (!currentCaseValue) {
            switch (this.direction) {
                case 'LEFT':
                    this.direction = 'TOP';
                    break;
                case 'TOP':
                    this.direction = 'RIGHT';
                    break;
                case 'RIGHT':
                    this.direction = 'BOTTOM';
                    break;
                default:
                    this.direction = 'LEFT';
            }
        } else {
            switch (this.direction) {
                case 'LEFT':
                    this.direction = 'BOTTOM';
                    break;
                case 'BOTTOM':
                    this.direction = 'RIGHT';
                    break;
                case 'RIGHT':
                    this.direction = 'TOP';
                    break;
                default:
                    this.direction = 'LEFT';
            }
        }
    }
    go() {
        switch (this.direction) {
            case 'LEFT':
                if (this.x > 0) this.x--;
                break;
            case 'TOP':
                if (this.y + 1 < rows) this.y++;
                break;
            case 'RIGHT':
                if (this.x + 1 < columns) this.x++;
                break;
            default:
                if (this.y > 0) this.y--;
        }

    }
}

function calculateColumnsAndRows() {
    columns = floor(width / w);
    rows = floor(height / w);
}

function setupBoards() {
    board = new Array(columns);
    for (let i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }
}

function setup() {
    createCanvas(720, 400);
    calculateColumnsAndRows();
    ant = new Ant();
    setupBoards();
    init();
}

function drawAnt(caseValue, i, j) {
    fill(0);

    line((i + 1) * w, (j + 1) * w, i * w, j * w);
    line((i + 1) * w, j * w, i * w, (j + 1) * w);
}

function drawNbMove() {
    textSize(32);
    fill('red');
    text(nbMove, 10, 30);
}

function draw() {
    background(255);
    frameRate(40);
    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if ((board[i][j] == 1)) {
                fill(255);
                rect(i * w, j * w, w - 1, w - 1);
            } else {
                fill(255, 204, 0);
                rect(i * w, j * w, w - 1, w - 1);
            }

            if (ant.x == i && ant.y == j) {
                drawAnt(board[i][j], i, j);
            }
        }
    }
    nbMove++;
    drawNbMove();

}

function mousePressed() {
    init();
}

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            board[i][j] = 1;
        }
    }
}

function generate() {
    ant.move(board[ant.x][ant.y]);
    board[ant.x][ant.y] = !board[ant.x][ant.y];
}
