const State = Object.freeze({
    "searching": 0,
    "endOK": 1,
    "endNOK": -1
});

class Graph {
    constructor(nbColumns, nbRows) {
        this.nodes = [];
        this.nbColumns = nbColumns;
        this.nbRows = nbRows;

        this.createNodes();
        this.defineStartingNode();
        this.defineObjectiveNode();

        this.nodesToStudy = [this.startingNode];
        this.state = State.searching;
    }

    createNodes() {
        for (let i = 0; i < this.nbColumns; i++) {
            for (let j = 0; j < this.nbRows; j++) {
                this.nodes.push(new Node(i, j));
            }
        }
    }

    defineStartingNode() {
        this.startingNode = this.getEmptyNode(this.nbColumns, this.nbRows);
        this.startingNode.setStarting();
    }

    defineObjectiveNode() {
        this.objectiveNode = this.getEmptyNode(this.nbColumns, this.nbRows);
        this.objectiveNode.setObjective();
    }

    getNode(posX, posY) {
        return this.nodes[posX * this.nbRows + posY];
    }

    getEmptyNode(nbColumns, nbRows) {
        let randomNode;
        do {
            let rmdX = floor(random(nbColumns));
            let rmdY = floor(random(nbRows));
            randomNode = this.getNode(rmdX, rmdY);
        } while (!randomNode.isEmpty());

        return randomNode;
    }

    isObjectiveNode(studiedNode) {
        return studiedNode.x == this.objectiveNode.x && studiedNode.y == this.objectiveNode.y;
    }

    getEmptyNeighbors(studiedNode) {
        let emptyNeighbors = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (!(i == 0 && j == 0) &&
                    (studiedNode.x + i < this.nbColumns) &&
                    (studiedNode.y + j < this.nbRows) &&
                    (studiedNode.x + i >= 0) &&
                    (studiedNode.y + j >= 0)) {
                    let neighbor = this.getNode(studiedNode.x + i, studiedNode.y + j);
                    if (neighbor != null && !neighbor.isObstacle()) {
                        emptyNeighbors.push(neighbor);
                    }
                }
            }
        }

        return emptyNeighbors;
    }

    compareNodes(nodeA, nodeB) {
        return nodeA.heuristic > nodeB.heuristic ? 1 : nodeA.heuristic == nodeB.heuristic ? 0 : -1;
    }

    sortNodesToStudy() {
        this.nodesToStudy.sort(this.compareNodes);
    }

    // step management is needed so that we can follow
    // the algorithm in the canvas
    calculate(nbStep, weight) {
        let step = 0;

        while (step < nbStep && this.state == State.searching && this.nodesToStudy.length > 0) {
            step++;

            let studiedNode = this.nodesToStudy[0];
            this.nodesToStudy.splice(0, 1);

            if (this.isObjectiveNode(studiedNode)) {
                this.buildFinalPath();
            } else {
                let neighbors = this.getEmptyNeighbors(studiedNode);
                for (let neighbor of neighbors) {
                    if (neighbor.cost > studiedNode.cost + 1) {
                        neighbor.updateEvaluation(studiedNode, this.objectiveNode, weight);
                        this.nodesToStudy.push(neighbor);
                        this.sortNodesToStudy();
                    }
                }
            }
        }

        if (step < nbStep && this.type == State.searching) {
            // We still have steps availables, but no nodes to study anymore
            this.type = State.endNOK;
            print("endNOK");
        }
    }

    buildFinalPath() {
        let node = this.objectiveNode;
        do {
            node.setSolution();
            node = node.previousNode;
        } while (node != this.startingNode);

        this.state = State.endOK;
        this.startingNode.setSolution();
        print("endOK, final cost is " + this.objectiveNode.cost);
    }

    show(nodeSize, displayCost) {
        for (let n of this.nodes) {
            n.show(nodeSize, displayCost);
        }
    }
}
