import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

export const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: '1em',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: '1em',
    },
};

class SelectCurrency extends React.Component {
    state = {
        fiatCurrencies: [
            'AUD',
            'BRL',
            'CAD',
            'CHF',
            'CLP',
            'CNY',
            'CZK',
            'DKK',
            'EUR',
            'GBP',
            'HKD',
            'HUF',
            'IDR',
            'ILS',
            'INR',
            'JPY',
            'KRW',
            'MXN',
            'MYR',
            'NOK',
            'NZD',
            'PHP',
            'PKR',
            'PLN',
            'RUB',
            'SEK',
            'SGD',
            'THB',
            'TRY',
            'TWD',
            'ZAR',
            'USD',
        ],
    };

    componentDidMount() {}

    handleSetSelectedCurrencyChange = event => {
        const newSelectedFiatCurrency = event.target.value;
        const { selectedCrypto } = this.props;

        this.props.setSelectedCurrency(newSelectedFiatCurrency);
        this.props.fetchCoinPriceInfo(selectedCrypto, newSelectedFiatCurrency);
        this.props.fetchCoinList(newSelectedFiatCurrency);
    };

    render() {
        const { classes, selectedFiat } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="currency">Fiat Currency</InputLabel>
                <Select
                    value={selectedFiat}
                    onChange={event =>
                        this.handleSetSelectedCurrencyChange(event)
                    }
                    inputProps={{
                        name: 'currency',
                        id: 'select-currency',
                    }}
                >
                    {this.state.fiatCurrencies.map(fiat => {
                        return <MenuItem value={fiat}>{fiat}</MenuItem>;
                    })}
                </Select>
            </FormControl>
        );
    }
}

SelectCurrency.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SelectCurrency;
