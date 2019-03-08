import { PriorityQueue } from './priority-queue';

describe('PQ', () => {
  it('should insert at correct position', () => {
    const order = [300, 13, 10, 2, 1, 0, -1, -200];
    const pq = new PriorityQueue();
    pq.insert('hello', 2);
    pq.insert('ahah', 1);
    pq.insert('eheh', 10);
    pq.insert('uhuh', 0);
    pq.insert('uhuh', 13);
    pq.insert('uhuh', 300);
    pq.insert('uhuh', -1);
    pq.insert('uhuh', -200);

    expect(pq.priorities()).toEqual(order);
  });

  it('should provide next value', () => {
    const order = [300, 13, 10, 2, 1, 0, -1, -200];
    const pq = new PriorityQueue();
    pq.insert('hello', 2);
    pq.insert('ahah', 1);
    pq.insert('eheh', 10);
    pq.insert('uhuh', 0);
    pq.insert('uhuh', 13);
    pq.insert('uhuh', 300);
    pq.insert('uhuh', -1);
    pq.insert('uhuh', -200);

    order.forEach(el => {
      expect(el).toEqual(pq.shift(true)[1]);
    });
  });
});
