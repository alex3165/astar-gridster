import { PriorityQueue } from './priority-queue';

class Node {
  constructor(x, y, f) {
    this.x = x;
    this.y = y;
    this.f = f;
  }

  setWeight(f) {
    this.f = f;
    return this;
  }
}

const getBoundNode = (matrix, direction) => {
  let node;
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 3 && direction === 'start') {
        node = new Node(i, j, 0);
      }

      if (cell === 4 && direction === 'end') {
        node = new Node(i, j, 0);
      }
    });
  });

  return node;
};

const mdistance = (start, end) =>
  Math.abs(end.x - start.x) + Math.abs(end.y - start.y);

const adjacentNodes = (matrix, parentNode, endNode) => {
  const shifts = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  return shifts.map(([x, y]) => {
    if (
      !!matrix[parentNode.x + x] &&
      // only if it is an active node (1)
      !!matrix[parentNode.x + x][parentNode.y + y]
    ) {
      const childNode = new Node(parentNode.x + x, parentNode.y + y);
      childNode.setWeight(mdistance(endNode, childNode));

      return childNode;
    }
  });
};

export const findShortest = matrix => {
  const startNode = getBoundNode(matrix, 'start');
  const endNode = getBoundNode(matrix, 'end');
  const openList = new PriorityQueue();
  const closeList = new PriorityQueue();

  openList.insert(startNode, startNode.f);

  while (openList.size()) {
    const leastNode = openList.pop(); // retrieve value with the least weight
    const adjacentNodes = adjacentNodes(matrix, leastNode, endNode);

    adjacentNodes.forEach(childNode => {
      // if
      // if
    });

    closeList.insert(leastNode, leastNode.f);
  }

  return matrix;
};
