import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import ccxt from "ccxt";

import Graph from "./Graph";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>Coin:Dash</h1>
        <Graph />
      </div>
    );
  }
}
