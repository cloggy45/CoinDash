import React, { Component } from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";
import ErrorBoundary from "./ErrorBoundary";

export default class Graph extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { labels, dataset, label } = this.props;

    console.log(dataset);

    const options = {
      legend: {
        fontColor: "#2D8490"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#2D8490",
              beginAtZero: true
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "#2D8490",
              fontSize: 14,
              stepSize: 1,
              beginAtZero: true
            }
          }
        ]
      }
    };

    const data = {
      labels: labels,
      datasets: [
        {
          label: label,
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
          data: dataset
        }
      ]
    };
    return (
      <ErrorBoundary>
        <Line data={data} options={options} />
      </ErrorBoundary>
    );
  }
}
