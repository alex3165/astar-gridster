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
        node = new Node(i, j, 0, Infinity, Infinity);
      }

      if (cell === 4 && direction === 'end') {
        node = new Node(i, j, 0, 0);
      }
    });
  });

  return node;
};

const mdistance = (start, end) =>
  Math.abs(end.x - start.x) + Math.abs(end.y - start.y);

const adjacentNodes = (matrix, parentNode) => {
  const shifts = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  return shifts
    .map(([x, y]) => {
      if (
        !!matrix[parentNode.x + x] &&
        // only if it is an active node (1)
        !!matrix[parentNode.x + x][parentNode.y + y]
      ) {
        const childNode = new Node(parentNode.x + x, parentNode.y + y);

        // const g = parentNode.g + 1;
        // const h = mdistance(endNode, childNode);
        // const f = g + h;

        childNode.setParentNode(parentNode);
        // console.log(g, h, f, childNode);

        return childNode;
      }
    })
    .filter(Boolean);
};

export const findShortest = matrix => {
  const endNode = getBoundNode(matrix, 'end');
  const startNode = getBoundNode(matrix, 'start');
  const openList = new PriorityQueue();
  const closeList = {};
  let foundNode;

  openList.insert(startNode, startNode.f);
  // console.log(startNode);
  while (openList.size()) {
    const leastNode = openList.pop(); // retrieve value with the least weight
    closeList[leastNode.toKey()] = true; // add node with least weight to close list

    const neighbors = adjacentNodes(matrix, leastNode, endNode);
    let g;
    let h;
    let f;

    neighbors.forEach(childNode => {
      if (childNode.x === endNode.x && childNode.y === endNode.y) {
        foundNode = childNode;
      }

      if (!closeList[childNode.toKey()]) {
        g = leastNode.g + 1;
        h = mdistance(endNode, childNode);
        f = g + h;

        childNode.setWeight(g, h, f);
        console.log(childNode);

        if (
          childNode.parent.f === Infinity ||
          childNode.f <= childNode.parent.f
        ) {
          openList.insert(childNode, childNode.f);
        }
      }
    });

    if (foundNode) {
      break;
    }
  }

  return [];
};
