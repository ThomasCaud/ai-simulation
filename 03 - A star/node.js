class Node {
    constructor(x, y, isTraversable) {
        const Type = Object.freeze({"empty":"white", "obstacle":"red", "solution":"green"});

        this.x = x;
        this.y = y;
        this.type = Type.empty;
        this.previousNode = null;
        this.cost = int(Infinity);
    }

    show(nodeSize) {
        fill(this.type);
        square(this.x * nodeSize, this.y * nodeSize, nodeSize);
    }
}
