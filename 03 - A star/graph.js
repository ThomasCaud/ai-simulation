class Graph {
    constructor(nbColumns, nbRows) {
        this.nodes = [];

        for (let i = 0; i < nbColumns; i++) {
            for (let j = 0; j < nbRows; j++) {
                this.nodes.push(new Node(i, j, true));
            }
        }
    }

    show(nodeSize) {
        for (let n of this.nodes) {
            n.show(nodeSize);
        }
    }
}
