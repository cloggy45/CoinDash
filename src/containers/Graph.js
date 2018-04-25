import React, { Component } from "react";
import { render } from "react-dom";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import moment from "moment";
import PropTypes from "prop-types";

import { connect, store } from "react-redux";
import { fetchCoinHistory } from "../actions/action";

import styleConstants from "../misc/style_constants.js";

class Graph extends Component {
  state = {
    isLoading: true,
    ticker: "BTC",
    labels: [],
    dataset: []
  };

  componentDidMount() {
    this.props.fetch(this.state.ticker, "USD");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data === undefined) return null;

    const dataset = nextProps.data.map(data => {
      return data["close"];
    });

    const labels = nextProps.data.map(data => {
      return moment(new Date(data.time * 1000)).format("MMM Do YY");
    });
    console.log("getDerivedState", dataset);
    return {
      labels: labels,
      dataset: dataset
    };
  }

  render() {
    const { labels, dataset } = this.state;
    console.log(dataset);
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
          label: "TEST",
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
    return <Line data={data} options={options} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.graph.history,
    selected: state.options.selected
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetch: (ticker, currency) => dispatch(fetchCoinHistory(ticker, currency))
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
