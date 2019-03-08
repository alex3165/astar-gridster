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

export const findShortest = matrix => {
  const start = getBoundNode(matrix, 'start');
  const end = getBoundNode(matrix, 'end');

  const openList = new PriorityQueue();
  openList.insert(start, start.f);

  const closeList = [];

  while (openList.size()) {
    const leastNode = openList.pop();
    const neighbours = {};

    if (!!matrix[leastNode.x - 1] && matrix[leastNode.x - 1][leastNode.y]) {
      const leftNode = new Node(leastNode.x - 1, leastNode.y);
      leftNode.setWeight(mdistance(end, leftNode));

      neighbours.left = leftNode;
    }
  }

  return matrix;
};
