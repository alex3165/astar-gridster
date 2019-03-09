import { PriorityQueue } from './priority-queue';
import { Node } from './model';

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

        childNode.setParentNode(parentNode);

        return childNode;
      }
    })
    .filter(Boolean);
};

const tracePath = (node, arr = []) => {
  if (node.parent) {
    arr.push([node.x, node.y]);
    return tracePath(node.parent, arr);
  }

  return arr;
};

export const findShortest = matrix => {
  const endNode = getBoundNode(matrix, 'end');
  const startNode = getBoundNode(matrix, 'start');
  const openList = new PriorityQueue();
  const closeList = {};
  let foundNode;

  openList.insert(startNode, startNode.f);

  while (openList.size()) {
    const leastNode = openList.pop(); // retrieve value with the least weight
    closeList[leastNode.toKey()] = leastNode; // add node with least weight to close list

    // Get neighbor nodes: left / right / bottom / top
    const neighbors = adjacentNodes(matrix, leastNode, endNode);

    foundNode = neighbors.find(neighbor => {
      // Destination node found
      if (neighbor.x === endNode.x && neighbor.y === endNode.y) {
        return true;
      }

      // Calculate weights (steps to next node / manhattan heuristic / sum of the previous )
      const g = leastNode.g + 1;
      const h = mdistance(endNode, neighbor);
      const f = g + h;

      // If the node is in closed list ignore it
      if (closeList[neighbor.toKey()]) {
        return false;
      }

      // if the neighbor node is not in the open list set its weight, parent and add it to the open list
      if (!openList.has(neighbor.x, neighbor.y)) {
        neighbor.setWeight(g, h, f);
        neighbor.setParentNode(leastNode);
        openList.insert(neighbor, neighbor.f);
        return false;
      }

      // Get neighbor node from the open list, opdate its weight according to new weight
      const openNeighbor = openList.get(neighbor);
      if (g < openNeighbor.g) {
        openNeighbor.setWeight(g, h, f);
      }

      return false;
    });

    // Node found abort while loop
    if (foundNode) {
      break;
    }
  }

  return foundNode ? tracePath(foundNode) : [];
};
