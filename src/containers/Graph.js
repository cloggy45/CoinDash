import React, { Component } from "react";
import { render } from "react-dom";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import moment from "moment";
import PropTypes from "prop-types";

import styleConstants from "../misc/style_constants.js";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "default",
      dataset: [],
      labels: []
    };
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
    this.getHistoryData(ticker, currency, filter);
  }

  render() {
    const { label, graphType } = this.props;
    const { dataset, labels } = this.state;

    const options = {
      legend: {
        fontColor: styleConstants.get("Dark")
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: styleConstants.get("Light"),
              beginAtZero: true,
              callback: function(value, index, values) {
                if (parseInt(value) >= 1000) {
                  return (
                    "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  );
                } else {
                  return "$" + value;
                }
              }
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: styleConstants.get("Light"),
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
          fill: true,
          lineTension: 0.1,
          backgroundColor: styleConstants.get("Medium"),
          borderColor: styleConstants.get("Medium"),
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: styleConstants.get("Light"),
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
    switch (graphType) {
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
        return null;
    }
  }
}

Graph.propTypes = {
  label: PropTypes.string,
  graphType: PropTypes.string
};

Graph.defaultProps = {
  label: "Default String",
  graphType: "Default String"
};
