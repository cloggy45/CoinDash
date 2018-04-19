import React, { Component } from "react";
import { render } from "react-dom";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import moment from "moment";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { fetchCoinHistory } from "../actions/action";

import styleConstants from "../misc/style_constants.js";

class Graph extends Component {
  state = {
    isLoading: true,
    labels: [],
    dataset: []
  };

  componentDidMount() {
    this.props.fetchCoinHistory;
  }

  componentWillReceiveProps(nextProps) {
    const dataset = nextProps.data.map(data => {
      return data["close"];
    });

    const labels = nextProps.data.map(data => {
      return moment(new Date(data.time * 1000)).format("MMM Do YY");
    });

    this.setState({ labels: labels, dataset: dataset });
  }

  render() {
    const { labels, dataset } = this.state;
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
    data: state.graph.history
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: dispatch(fetchCoinHistory())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Graph);
