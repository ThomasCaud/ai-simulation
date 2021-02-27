const nodeSize = 20;

let graph;

function setup() {
    createCanvas(640, 360);

    graph = new Graph(width / nodeSize, height / nodeSize);
}

function draw() {
    background(255);
    frameRate(15);

    graph.show(nodeSize);
}
