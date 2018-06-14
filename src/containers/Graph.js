import React, { Component } from "react";
import { render } from "react-dom";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import moment from "moment";
import PropTypes from "prop-types";
import { ScaleLoader } from "halogenium";
import { connect, store } from "react-redux";

import { fetchCoinHistory } from "../actions/api";
import Panel from "../components/Panel";

import styleConstants from "../misc/style_constants.js";

export class Graph extends Component {
  state = {
    isLoading: true,
    dataset: []
  };

  static propTypes = {
    filter: PropTypes.string,
    data: PropTypes.array,
    selected: PropTypes.string,
    fetch: PropTypes.func
  };

  static defaultProps = {
    filter: "close",
    data: [],
    selected: "BTC",
    fetch: () => {}
  };

  componentDidMount() {
    this.props.fetch(this.props.selected);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dataset === undefined) return null;
    else if (nextProps.dataset === prevState.dataset) {
      return {
        isLoading: true
      };
    } else {
      return {
        isLoading: false,
        dataset: nextProps.dataset
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      this.props.fetch(this.props.selected);
    }
  }

  getData = (dataset, filter) => {
    return dataset.map(data => {
      return data[filter];
    });
  };

  formatTime = times => {
    return times.map(time => {
      return moment(new Date(time * 1000)).format("MMM Do YY");
    });
  };

  render() {
    if (!this.state.isLoading) {
      const { filter, graphType, dataset } = this.props;
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
                      "$" +
                      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
        labels: this.formatTime(this.getData(dataset, "time")),
        datasets: [
          {
            label: this.props.filter,
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
            data: this.getData(dataset, filter)
          }
        ]
      };

      switch (graphType) {
        case "Line":
          return (
            <Panel label={this.props.filter}>
              <Line data={data} options={options} />
            </Panel>
          );
          break;
        case "Doughnut":
          return (
            <Panel label={this.props.filter}>
              <Doughnut data={data} options={options} />
            </Panel>
          );
          break;
        case "Bar":
          return (
            <Panel label={this.props.filter}>
              <Bar data={data} options={options} />
            </Panel>
          );
          break;
        default:
          return <h4>Please Select Graph Type</h4>;
      }
    } else {
      return (
        <Panel label={"Loading"}>
          <ScaleLoader
            color={styleConstants.get("Light")}
            size="16px"
            margin="4px"
          />
        </Panel>
      );
    }
  }
}

const mapStateToProps = state => {
  const { Data } = state.api.coinHistoryData;
  return {
    requestingData: state.api.requesting,
    dataset: Data,
    selected: state.option.selected
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: ticker => dispatch(fetchCoinHistory(ticker))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
