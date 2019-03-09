import { range } from 'lodash';

const random = int => Math.floor(Math.random() * (int + 1));

export const generateMatrix = (rows, columns) => {
  const randomStart = random(columns);
  const randomEnd = random(columns);
  const columnsArr = range(columns);
  const rowsArr = range(rows);

  return columnsArr.map(i => {
    return rowsArr.map(j => {
      if (j === 0 && i === randomStart) {
        return 3;
      }

      if (j === rowsArr.length - 1 && i === randomEnd) {
        return 4;
      }

      return 0;
    });
  });
};

export const updateMatrix = (matrix, i, j) => {
  return matrix.map((rows, colIndex) => {
    return rows.map((cell, rowIndex) => {
      return colIndex === i && rowIndex === j ? 1 : cell;
    });
  });
};

export const updateMatrixWithShortest = (matrix, shortestPath) => {
  return matrix.map((rows, colIndex) => {
    return rows.map((cell, rowIndex) => {
      let shortestIndex;
      for (const [x, y] of shortestPath) {
        if (x === colIndex && y === rowIndex) {
          shortestIndex = 2;
          break;
        }
      }

      if (cell === 2 && !shortestIndex) {
        return 1;
      }

      return cell === 1 && shortestIndex ? shortestIndex : cell;
    });
  });
};
