const nodeSize = 20;
const stepPerDraw = 1;

let displayCost = true;

let graph;

function createOptions() {
    displayCostOption = createCheckbox('Display costs', displayCost);
    displayCostOption.changed(updateDisplayCost);

    group = createDiv('');
    group.position(30, 400);
    weightSlider = createSlider(0, 5, 1, 0.1);
    weightSlider.parent(group);
    label = createSpan('weighted A*');
    label.parent(group);
}

function updateDisplayCost() {
    displayCost = this.checked();
}

function setup() {
    createCanvas(640, 360);
    this.createOptions();

    graph = new Graph(width / nodeSize, height / nodeSize);
}

function draw() {
    background(255);
    frameRate(5);

    graph.calculate(stepPerDraw, weightSlider.value());
    graph.show(nodeSize, displayCost);
}
