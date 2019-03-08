import React, { Component } from 'react';
import styled from 'styled-components';

const statusMap = {
  0: '#fafafa', // filled
  1: '#fff', // clear
  2: '#ff7f50', // shortest
  3: '#2ed573', // start
  4: '#5352ed', // end
  5: '#f1f2f6' // hover
};

const Cell = styled.div`
  width: 42px;
  height: 42px;
  border: 1px solid #dfe4ea;
  margin-right: -1px;
  margin-bottom: -1px;
  cursor: pointer;
  :hover {
    background-color: ${() => statusMap[5]} !important;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default class Grid extends Component {
  render() {
    const { matrix, onClickCell } = this.props;
    if (!matrix) {
      return null;
    }

    return (
      <div>
        {matrix.map((row, i) => {
          return (
            <Row key={i}>
              {row.map((status, j) => (
                <Cell
                  style={{ backgroundColor: statusMap[status] }}
                  key={`${i}${j}`}
                  status={status}
                  onClick={() => onClickCell(i, j)}
                />
              ))}
            </Row>
          );
        })}
      </div>
    );
  }
}
