export class PriorityQueue {
  constructor(reverse) {
    this.reverse = !!reverse;
    this.heap = [];
  }

  insert(val, priority) {
    if (!this.heap.length || this.heap[this.heap.length - 1][1] > priority) {
      this.heap.push([val, priority]);
      return this.heap;
    }

    const tmp = [];
    let found = false;

    for (let i = 0; i < this.heap.length; i++) {
      const p = this.heap[i][1];

      if (priority >= p && !found) {
        tmp.push([val, priority]);
        found = true;
      }

      tmp.push(this.heap[i]);
    }

    return (this.heap = tmp);
  }

  shift(priority) {
    if (priority) {
      return this.heap.shift();
    }

    return this.heap.shift()[0];
  }

  has(x, y) {
    const foundNode = this.heap.find(
      ([val, priority]) => val.x === x && val.y === y
    );

    return !!foundNode;
  }

  get({ x, y }) {
    const foundNode = this.heap.find(
      ([val, priority]) => val.x === x && val.y === y
    );

    return foundNode && foundNode[0];
  }

  pop(priority) {
    if (priority) {
      return this.heap.pop();
    }

    return this.heap.pop()[0];
  }

  priorities() {
    return this.heap.map(([val, p]) => p);
  }

  values() {
    return this.heap.map(([val, p]) => val);
  }

  size() {
    return this.heap.length;
  }

  toArray() {
    return this.heap;
  }
}
