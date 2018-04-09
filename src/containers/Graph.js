import React, { Component } from "react";
import { render } from "react-dom";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import moment from "moment";

export default class GraphContainer extends Component {
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

  /**
   * https://min-api.cryptocompare.com/ for documentation
   */
  async getHistoryData(ticker = "BTC", currency = "USD", filter = "close") {
    try {
      let response = await fetch(
        `https://min-api.cryptocompare.com/data/histoday?fsym=${ticker}&tsym=${currency}&limit=60&aggregate=3&e=CCCAGG`
      );
      const responseJson = await response.json();
      const dataset = responseJson.Data.map(data => {
        return data[filter];
      });
      const labels = responseJson.Data.map(data => {
        return moment(new Date(data.time * 1000)).format("MMM Do YY");
      });

      this.setState({ dataset: dataset });
      this.setState({ labels: labels });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    const { ticker, currency, filter } = this.props;
    console.log(filter);
    this.getHistoryData(ticker, currency, filter);
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
              fontSize: 10,
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

    switch (this.props.graphType) {
      case "line":
        return <Line data={data} options={options} />;
        break;
      case "bar":
        return <Bar data={data} options={options} />;
        break;
      case "doughnut":
        return <Doughnut data={data} options={options} />;
        break;
      default:
        return <Line data={data} options={options} />;
    }
  }
}
