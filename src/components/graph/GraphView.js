import {Component} from "react";
import moment from "moment";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export const styles = {
    card: {
        marginTop: '1em',
        minWidth: 275,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    }
};

const GraphHolder = props => (
    <Card className={props.classes.card}>
        <CardContent>
            <Typography variant={"subheading"}>
                {props.title}
            </Typography>
            {props.children}
        </CardContent>
    </Card>
);

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
            legend: {},
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
        const {isLoading, coinHistory, graphType, filter, title} = this.props;
        let GraphComponent;

        const data = this.setupDataset(coinHistory, filter);
        const options = this.setupOptions();


        if(graphType === 'bar') {
            GraphComponent = <Bar data={data} options={options} />
        } else if(graphType === 'line') {
            GraphComponent = <Line data={data} options={options} />
        } else {
            GraphComponent = <Doughnut data={data} options={options} />
        }


        return (
            isLoading ? (<h1>Loading...</h1>) : (
                <GraphHolder {...this.props} title={title}>
                    {GraphComponent}
                </GraphHolder>)
        )
    }
};

export default Graph;