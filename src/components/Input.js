import React, { Component } from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";

export default class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { label } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input placeholder={"Search...."} />
      </div>
    );
  }
}
