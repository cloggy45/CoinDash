import React, { Component } from "react";
import { render } from "react-dom";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>App</h1>;
  }
}
