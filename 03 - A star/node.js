const Type = Object.freeze({
    "empty": "white",
    "starting": "purple",
    "obstacle": "red",
    "solution": "green"
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

    setStarting() {
        this.type = Type.starting;
    }

    show(nodeSize) {
        fill(this.type);
        square(this.x * nodeSize, this.y * nodeSize, nodeSize);
    }
}
