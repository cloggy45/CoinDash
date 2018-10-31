import { Component } from 'react';
import moment from 'moment';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { GraphHolder } from './GraphHolder';
import getSymbolFromCurrency from 'currency-symbol-map';

export const styles = {
    card: {
        marginTop: '1em',
        minWidth: 275,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
};

export class Graph extends Component {
    componentDidMount() {
        const { selectedCryptoTicker, selectedFiatTicker } = this.props;
        this.props.fetchCoinHistory(selectedCryptoTicker, selectedFiatTicker);
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedCryptoTicker, selectedFiatTicker } = this.props;

        if (
            prevProps.selectedCryptoTicker !== selectedCryptoTicker ||
            prevProps.selectedFiatTicker !== selectedFiatTicker
        ) {
            this.props.fetchCoinHistory(
                selectedCryptoTicker,
                selectedFiatTicker
            );
        }
    }

    getData = (dataset, filter) => {
        return dataset === null
            ? null
            : dataset.map(data => {
                  return data[filter];
              });
    };

    formatTime = times => {
        return times === null
            ? null
            : times.map(time => {
                  return moment(new Date(time * 1000)).format('MMM Do YY');
              });
    };

    // TODO Refactor
    createGraph = (type, dataset, filter) => {
        const graphProps = {
            data: this.setupDataset(dataset, filter),
            options: this.setupOptions(),
        };
        if (type === 'Bar') {
            return <Bar {...graphProps} />;
        } else if (type === 'Line') {
            return <Line {...graphProps} />;
        } else {
            return <Doughnut {...graphProps} />;
        }
    };

    setupOptions = () => {
        const selectedFiatCurrencySymbol = getSymbolFromCurrency(
            this.props.selectedFiatTicker
        );
        return {
            legend: {},
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            callback: function(value) {
                                if (parseInt(value, 10) >= 1000) {
                                    return (
                                        selectedFiatCurrencySymbol +
                                        value
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                    );
                                } else {
                                    return selectedFiatCurrencySymbol + value;
                                }
                            },
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            fontSize: 10,
                            stepSize: 1,
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
    };

    setupDataset = (dataset, filter) => {
        return {
            labels: this.formatTime(this.getData(dataset, 'time')),
            datasets: [
                {
                    label: this.props.filter,
                    fill: true,
                    lineTension: 0.1,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.getData(dataset, filter),
                },
            ],
        };
    };

    render() {
        const { isLoading, coinHistory, graphType, filter, title } = this.props;

        const Chart = this.createGraph(graphType, coinHistory, filter);

        return isLoading ? (
            <CircularProgress />
        ) : (
            <GraphHolder {...this.props} title={title}>
                {Chart}
            </GraphHolder>
        );
    }
}

Graph.propTypes = {
    isLoading: PropTypes.bool,
    graphType: PropTypes.string,
    filter: PropTypes.string,
    title: PropTypes.string,
    coinHistory: PropTypes.array,
    selectedCryptoTicker: PropTypes.string,
    selectedFiatTicker: PropTypes.string,
};

Graph.defaultProps = {
    isLoading: false,
    graphType: 'Bar',
    filter: 'close',
    title: 'Closing Specific',
    coinHistory: [],
    selectedCryptoTicker: 'DOGE',
    selectedFiatTicker: 'USD',
};

export default Graph;
