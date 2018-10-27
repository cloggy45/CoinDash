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
        marginTop: '1em'
    },
};

const SelectCurrency = props => (
    <FormControl className={props.classes.formControl}>
        <InputLabel htmlFor="currency">Fiat Currency</InputLabel>
        <Select
            value={props.selectedCurrency}
            onChange={(event) => props.setSelectedCurrency(event.target.value)}
            inputProps={{
                name: 'currency',
                id: 'select-currency',
            }}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
        </Select>
    </FormControl>
);

SelectCurrency.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default SelectCurrency;