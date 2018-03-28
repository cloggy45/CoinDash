import React, { Component } from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";
import ErrorBoundary from "./ErrorBoundary";

export default class Graph extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { labels, content } = this.props;

    console.log(content);

    const data = {
      labels: labels,
      datasets: [
        {
          label: labels,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    };
    return (
      <ErrorBoundary>
        <Line data={data} />
      </ErrorBoundary>
    );
  }
}
