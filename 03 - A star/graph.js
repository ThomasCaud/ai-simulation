class Graph {
    constructor(nbColumns, nbRows) {
        this.nodes = [];

        for (let i = 0; i < nbColumns; i++) {
            for (let j = 0; j < nbRows; j++) {
                this.nodes.push(new Node(i, j));
            }
        }

        this.startingNode = this.getEmptyNode(nbColumns, nbRows);
        this.startingNode.setStarting();
    }

    getEmptyNode(nbColumns, nbRows) {
        let randomNode;
        do {
            let rmdX = round(random(nbColumns));
            let rmdY = round(random(nbRows));
            randomNode = this.nodes[rmdX * nbRows + rmdY];
        } while (!randomNode.isEmpty());

        return randomNode;
    }

    calculate(nbStep) {

    }

    show(nodeSize) {
        for (let n of this.nodes) {
            n.show(nodeSize);
        }
    }
}
