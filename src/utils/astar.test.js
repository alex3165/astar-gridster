import { findShortest } from './astar';
const mockedMatrix = require('./mock.json');

describe('astar', () => {
  it('should find shortest path', () => {
    const path = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [3, 1],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0]
    ];
    const res = findShortest(mockedMatrix);

    expect(res).toEqual(path);
  });
});
