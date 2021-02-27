const nodeSize = 20;
const stepPerDraw = 1;

let graph;

function setup() {
    createCanvas(640, 360);

    graph = new Graph(width / nodeSize, height / nodeSize);
}

function draw() {
    background(255);
    frameRate(5);

    graph.calculate(stepPerDraw);
    graph.show(nodeSize);
}
