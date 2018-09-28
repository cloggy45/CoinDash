import {Component} from "react";
import moment from "moment";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

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

export const GraphHolder = props => (
    <Card className={props.classes.card}>
        <CardContent>
            <Typography variant={"subheading"}>
                {props.title}
            </Typography>
            {props.children}
        </CardContent>
    </Card>
);

export class Graph extends Component {
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

    createGraph = (type, dataset, filter) => {
        const graphProps = {
            data:this.setupDataset(dataset, filter),
            options:this.setupOptions()
        };
        if (type === 'Bar') {
            return <Bar {...graphProps} />
        } else if (type === 'Line') {
            return <Line {...graphProps} />
        } else {
            return <Doughnut {...graphProps}  />
        }
    };

    setupOptions = () => {
        return {
            legend: {},
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            callback: function (value) {
                                if (parseInt(value, 10) >= 1000) {
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

        const Chart = this.createGraph(graphType, coinHistory, filter);

        return (
            isLoading ? (<CircularProgress /> ) : (
                <GraphHolder {...this.props} title={title}>
                    { Chart }
                </GraphHolder>)
        )
    }
};
          
Graph.propTypes = {
  isLoading:PropTypes.string,
  graphType:PropTypes.string,
  filter:PropTypes.string,
  title: PropTypes.string,
  coinHistory:PropTypes.array
}
          
Graph.defaultProps = {
  isLoading: false,
  graphType: 'Bar',
  filter: 'close',
  title: 'Closing Price',
  coinHistory: []
}
          

export default Graph;