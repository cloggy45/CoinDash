import {Component} from "react";
import moment from "moment";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import {ScaleLoader} from "halogenium";
import React from "react";

class Graph extends Component {
    componentDidMount() {
        this.props.fetchCoinHistory(this.props.selectedCoin);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedCoin !== this.props.selectedCoin) {
            this.props.fetchCoinHistory(this.props.selectedCoin);
        }
    }

    getData = (dataset, filter) => {
        return dataset === null ? null : dataset.map(data => {
            return data[filter];
        });
    };

    formatTime = times => {
        return times === null ? null : times.map(time => {
            return moment(new Date(time * 1000)).format("MMM Do YY");
        });
    };

    setupOptions = () => {
        return {
            legend: {
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
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
                            fontSize: 10,
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }
                ]
            }
        };
    };

    setupDataset = (dataset, filter) => {
        return {
            labels: this.formatTime(this.getData(dataset, "time")),
            datasets: [
                {
                    label: this.props.filter,
                    fill: true,
                    lineTension: 0.1,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.getData(dataset, filter)
                }
            ]
        };
    };

    render() {
        const {isLoading, coinHistory} = this.props;
        return (
            isLoading ? (<h1>Loading...</h1>) : (<Bar data={this.setupDataset(coinHistory, 'close')} options={this.setupOptions()}/>)
        )
    }
};

export default Graph;