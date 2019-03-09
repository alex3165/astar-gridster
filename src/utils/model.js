export class Node {
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
