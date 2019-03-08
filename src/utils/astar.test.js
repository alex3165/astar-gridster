import { findShortest } from './astar';
const mockedMatrix = require('./mock.json');

describe('astar', () => {
  it('should find shortest path', () => {
    findShortest(mockedMatrix);
  });
});
