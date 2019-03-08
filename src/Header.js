import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Text = styled.input``;

const Button = styled.button``;

export default class Header extends Component {
  state = {
    rows: 10,
    columns: 10
  };

  // componentWillMount() {
  //   this.submit();
  // }

  updateVal = dir => e => {
    const val = e.currentTarget.value;
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
    const { submit } = this.props;
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
