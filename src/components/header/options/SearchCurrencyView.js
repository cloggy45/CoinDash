import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import map from 'lodash.map';
import isEmpty from 'lodash.isempty';

export const styles = {
    flex: {
        flexGrow: 1,
    },
};

// TODO Set initial option state, maybe just use default props
export class SearchCurrency extends React.Component {
    state = {
        coinName: 'Doge Coin',
        coinSymbol: 'DOGE',
        coinId: 4432,
        selectedOption: 4432,
    };

    componentDidMount() {
        this.props.setSelectedCoin('DOGE', 4432);
    }

    handleChange = selectedOption => {
        if (!isEmpty(selectedOption)) {
            const { value, label, symbol } = selectedOption;
            this.setState(
                { coinSymbol: symbol, coinId: value, coinName: label },
                () => {
                    this.props.setSelectedCoin(symbol, Number(value));
                    this.props.fetchCoinPriceInfo(symbol);
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
        const { coinId } = this.state;

        if (coinList === null) {
            return <p>Loading....</p>;
        } else {
            return (
                <Select
                    className={`${classes.flex}`}
                    name="Search Currency"
                    value={coinId}
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
