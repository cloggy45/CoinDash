import React from 'react';
import Select from 'react-virtualized-select';

import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

import PropTypes from 'prop-types';
import map from 'lodash.map';
import isEmpty from 'lodash.isempty';

export const styles = {
    flex: {
        flexGrow: 1,
    },
    input: {
        color: 'black',
    },
};

// TODO Set initial option state, maybe just use default props
export class SearchCurrency extends React.Component {
    handleChange = selectedOption => {
        if (!isEmpty(selectedOption)) {
            const { value, label, symbol } = selectedOption;
            this.setState(
                { coinSymbol: symbol, coinId: value, coinName: label },
                () => {
                    this.props.setSelectedCoin(symbol, Number(value));
                    this.props.fetchCoinPriceInfo(
                        symbol,
                        this.props.selectedFiat
                    );
                }
            );
        }
    };

    formatOptions = (options = {}) => {
        return map(options, coin => {
            return {
                value: coin.Id,
                label: coin.CoinName,
                symbol: coin.Symbol,
            };
        });
    };

    render() {
        const { coinList, classes } = this.props;

        if (coinList === null) {
            return <p>Loading....</p>;
        } else {
            return (
                <Select
                    className={`${classes.flex} ${classes.input}`}
                    name="Search Currency"
                    placeholder={'Search Currency'}
                    onChange={this.handleChange}
                    options={this.formatOptions(coinList)}
                    clearable={false}
                    data-cy="select"
                />
            );
        }
    }
}

SearchCurrency.propTypes = {
    getTickers: PropTypes.func,
    options: PropTypes.array,
    classes: PropTypes.object,
};

SearchCurrency.defaultProps = {
    options: [],
    classes: {},
};

export default SearchCurrency;
