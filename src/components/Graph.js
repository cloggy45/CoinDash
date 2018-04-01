import React, { Component } from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      dataset: [],
      labels: []
    };
  }

  filterDataset(filter = "", dataset = []) {
    return dataset.map(datum => {
      return datum[filter];
    });
  }

  async getHistoryData(ticker) {
    try {
      let response = await fetch(
        `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`
      );
      const responseJson = await response.json();
      const dataset = responseJson.Data.map(data => {
        return data.open;
      });
      const labels = responseJson.Data.map(data => {
        return data.time;
      });

      this.setState({ dataset: dataset });
      this.setState({ labels: labels });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getHistoryData(this.props.ticker);
  }
  render() {
    const { label } = this.props;
    const { dataset, labels } = this.state;
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
    return <Line data={data} options={options} />;
  }
}
