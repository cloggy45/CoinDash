import React, { Component } from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

export default class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const colorText = "#2D8490";
    const colorInput = "#265566";
    const colorBackground = "#21364A";

    const Wrapper = styled.div`
      grid-area: input-search;
      display: flex;
      justify-content: space-between;
      background-color: #265566;
      margin: 0 10px;
      border-radius: 5px;
    `;

    const Button = styled.button`
      background: ${colorBackground}
      color: ${colorText}
      margin: 5px 5px;
      padding: 5px 10px;
      border: none;
    `;

    const Input = styled.input`
      border-style: none;
      background-color: ${colorInput}
      margin: 5px 5px;
      padding: 0 0 0 10px;
      ::-webkit-input-placeholder { color: #2D8490; }
      ::-moz-placeholder {color: #2D8490; }
      :-ms-input-placeholder { color: #2D8490; } 
      :-o-input-placeholder { color: #2D8490; } 
    `;

    const { placeholder } = this.props;
    return (
      <Wrapper>
        <Input placeholder={placeholder} />
        <Button>Search</Button>
      </Wrapper>
    );
  }
}
