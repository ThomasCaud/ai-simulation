const flock = [];
const predators = [];

let alignSlider, cohesionSlider, separationSlider;

function createSliders() {
    group = createDiv('');
    group.position(30, 400);
    alignSlider = createSlider(0, 5, 1, 0.1);
    alignSlider.parent(group);
    label = createSpan('Align');
    label.parent(group);

    group = createDiv('');
    group.position(30, 430);
    alignSliderRadius = createSlider(0, 100, 50, 5);
    alignSliderRadius.parent(group);
    label = createSpan('Align perception radius');
    label.parent(group);

    group = createDiv('');
    group.position(30, 460);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider.parent(group);
    label = createSpan('Cohesion');
    label.parent(group);

    group = createDiv('');
    group.position(30, 490);
    cohesionSliderRadius = createSlider(0, 200, 100, 5);
    cohesionSliderRadius.parent(group);
    label = createSpan('Cohesion perception radius');
    label.parent(group);

    group = createDiv('');
    group.position(30, 520);
    separationSlider = createSlider(0, 5, 1.5, 0.1);
    separationSlider.parent(group);
    label = createSpan('Separation');
    label.parent(group);

    group = createDiv('');
    group.position(30, 550);
    separationSliderRadius = createSlider(0, 100, 50, 5);
    separationSliderRadius.parent(group);
    label = createSpan('Separation perception radius');
    label.parent(group);

    group = createDiv('');
    group.position(30, 580);
    avoidPredatorsSlider = createSlider(0, 10, 1.5, 0.1);
    avoidPredatorsSlider.parent(group);
    label = createSpan('Avoiding predators');
    label.parent(group);

    group = createDiv('');
    group.position(30, 610);
    avoidPredatorRadiusSlider = createSlider(0, 200, 80, 5);
    avoidPredatorRadiusSlider.parent(group);
    label = createSpan('Avoiding predators perception radius');
    label.parent(group);

    group = createDiv('');
    group.position(30, 640);
    maxForceSlider = createSlider(0, 2, 0.2, 0.1);
    maxForceSlider.parent(group);
    label = createSpan('Max force');
    label.parent(group);

    group = createDiv('');
    group.position(30, 670);
    maxSpeedSlider = createSlider(0, 20, 4, 1);
    maxSpeedSlider.parent(group);
    label = createSpan('Max speed');
    label.parent(group);
}

function setup() {
    createCanvas(640, 360);
    createSliders();

    for (let i = 0; i < 150; i++) {
        flock.push(new Boid());
    }

    for (let i = 0; i < 2; i++) {
        predators.push(new Predator(0, 0));
    }
}

function draw() {
    background(51);

    for (let boid of flock) {
        boid.edges();
        boid.move(flock, predators);
        boid.update();
        boid.show();
    }

    for (let predator of predators) {
        predator.edges();
        predator.goToNearestBoidAndDestroyIfNeeded(flock, predators);
        predator.update();
        predator.show();
    }
}
