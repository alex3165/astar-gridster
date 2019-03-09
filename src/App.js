import React, { Component } from 'react';
import Header from './Header';
import Grid from './Grid';
import {
  generateMatrix,
  updateMatrix,
  updateMatrixWithShortest
} from './selectors';
import { findShortest } from './utils/astar';

class App extends Component {
  state = {};

  onUpdateGrid = ({ rows, columns }) => {
    this.setState({
      matrix: generateMatrix(rows, columns)
    });
  };

  onClickCell = (i, j) => {
    let updatedMatrix = updateMatrix(this.state.matrix, i, j);
    const shortest = findShortest(updatedMatrix);

    if (shortest.length) {
      updatedMatrix = updateMatrixWithShortest(
        updatedMatrix,
        shortest.reverse()
      );
    }

    this.setState({
      matrix: updatedMatrix
    });
  };

  render() {
    return (
      <div>
        <Header submit={this.onUpdateGrid} />
        <Grid matrix={this.state.matrix} onClickCell={this.onClickCell} />
      </div>
    );
  }
}

export default App;
