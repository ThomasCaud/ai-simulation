const Type = Object.freeze({
    "empty": "white",
    "starting": "orange",
    "obstacle": "black",
    "solution": "green",
    "objective": "orange",
    "studied": "yellow"
});

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        let randomValue = random(0, 10);
        this.type = randomValue < 9 ? Type.empty : Type.obstacle;
        this.previousNode = null;
        this.cost = int(Infinity);
        this.heuristic = int(Infinity);
    }

    isEmpty() {
        return this.type == Type.empty;
    }

    isObstacle() {
        return this.type == Type.obstacle;
    }

    setStarting() {
        this.type = Type.starting;
        this.cost = 0;
    }

    setObjective() {
        this.type = Type.objective;
    }

    setSolution() {
        this.type = Type.solution;
    }

    updateEvaluation(previousNode, objectiveNode) {
        this.previousNode = previousNode;
        this.cost = previousNode.cost + 1;
        this.type = Type.studied;
        this.heuristic = this.cost + dist(this.x, this.y, objectiveNode.x, objectiveNode.y);
    }

    show(nodeSize) {
        fill(this.type);
        square(this.x * nodeSize, this.y * nodeSize, nodeSize);
    }
}
