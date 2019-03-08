import { PriorityQueue } from './priority-queue';

class Node {
  constructor(x, y, g, h, f) {
    this.x = x;
    this.y = y;

    this.g = g;
    this.h = h;
    this.f = f;
    this.parent = undefined;
  }

  toKey() {
    return `${this.x}${this.y}`;
  }

  setWeight(g, h, f) {
    this.g = g;
    this.h = h;
    this.f = f;

    return this;
  }

  setParentNode(node) {
    this.parent = node;
    return this;
  }
}

const getBoundNode = (matrix, direction) => {
  let node;
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 3 && direction === 'start') {
        node = new Node(i, j, 0, 0, Infinity);
      }

      if (cell === 4 && direction === 'end') {
        node = new Node(i, j, 0, 0, Infinity);
      }
    });
  });

  return node;
};

const mdistance = (start, end) =>
  Math.abs(end.x - start.x) + Math.abs(end.y - start.y);

const adjacentNodes = (matrix, parentNode, endNode) => {
  const shifts = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  return shifts
    .map(([x, y]) => {
      if (
        !!matrix[parentNode.x + x] &&
        // only if it is an active node (1)
        !!matrix[parentNode.x + x][parentNode.y + y]
      ) {
        const childNode = new Node(parentNode.x + x, parentNode.y + y);

        const g = parentNode.g + 1;
        const h = mdistance(endNode, childNode);
        const f = g + h;

        childNode.setWeight(g, h, f).setParentNode(parentNode);

        return childNode;
      }
    })
    .filter(Boolean);
};

export const findShortest = matrix => {
  const startNode = getBoundNode(matrix, 'start');
  const endNode = getBoundNode(matrix, 'end');
  const openList = new PriorityQueue();
  const closeList = {};
  let foundNode;

  openList.insert(startNode, startNode.f);

  while (openList.size()) {
    const leastNode = openList.pop(); // retrieve value with the least weight
    const neighbors = adjacentNodes(matrix, leastNode, endNode);
    console.log(leastNode);
    neighbors.forEach(childNode => {
      if (childNode.x === endNode.x && childNode.y === endNode.y) {
        foundNode = childNode;
      }

      if (!closeList[childNode.toKey()] && childNode.f < childNode.parent.f) {
        openList.insert(childNode, childNode.f);
      }
    });

    if (foundNode) {
      break;
    }

    closeList[leastNode.toKey()] = true;
  }

  // console.log(foundNode);

  return [];
};
