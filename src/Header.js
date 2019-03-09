import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0px;
`;

const Text = styled.input`
  outline: none;
  margin: 0px 10px;
  border-radius: 5px;
  border: 1px solid #dfe4ea;
`;

const Button = styled.button`
  padding: 10px 16px;
  border: 1px solid #393996;
  background-color: #5352ed;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  margin: 0px 20px;

  :hover {
    background-color: #393996;
  }
`;

export default class Header extends Component {
  state = {
    rows: 10,
    columns: 10
  };

  componentWillMount() {
    this.submit();
  }

  updateVal = dir => e => {
    const val = e.currentTarget.value;

    if (!val) {
      return this.setState({
        [dir]: val
      });
    }

    if (parseInt(val)) {
      this.setState({
        [dir]: parseInt(val)
      });
    }
  };

  submit = () => {
    this.props.submit({ rows: this.state.rows, columns: this.state.columns });
  };

  render() {
    return (
      <Wrapper>
        <Text
          type="text"
          onChange={this.updateVal('rows')}
          value={this.state.rows}
        />
        <Text
          type="text"
          onChange={this.updateVal('columns')}
          value={this.state.columns}
        />
        <Button onClick={this.submit}>Generate</Button>
      </Wrapper>
    );
  }
}
