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
