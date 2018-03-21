import React, { Component } from "react";
import { render } from "react-dom";
import ccxt from "ccxt";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Code:Dash</h1>;
  }
}
