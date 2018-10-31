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
    handleSetSelectedCurrencyChange = event => {
        const newSelectedFiatCurrency = event.target.value;
        const { selectedCrypto } = this.props;

        this.props.setSelectedCurrency(newSelectedFiatCurrency);
        this.props.fetchCoinPriceInfo(selectedCrypto, newSelectedFiatCurrency);
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
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                </Select>
            </FormControl>
        );
    }
}

SelectCurrency.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SelectCurrency;
