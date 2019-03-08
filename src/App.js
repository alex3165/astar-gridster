import React, { Component } from 'react';
import Header from './Header';
import Grid from './Grid';
import { generateMatrix, updateMatrix } from './selectors';
import { findShortest } from './utils/astar';
const mock = require('./mock.json');

class App extends Component {
  state = {
    matrix: mock
  };

  onUpdateGrid = ({ rows, columns }) => {
    this.setState({
      matrix: generateMatrix(rows, columns)
    });
  };

  onClickCell = (i, j) => {
    const updatedMatrix = findShortest(updateMatrix(this.state.matrix, i, j));

    this.setState({
      matrix: updatedMatrix
    });
  };

  printState = () => {
    console.log(JSON.stringify(this.state.matrix));
  };

  render() {
    return (
      <div onDoubleClick={this.printState}>
        <Header submit={this.onUpdateGrid} />
        <Grid matrix={this.state.matrix} onClickCell={this.onClickCell} />
      </div>
    );
  }
}

export default App;
