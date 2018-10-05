import {
    connect
} from "react-redux";

import {
    setSelectedCoin
} from "../../../actions/selected";
import {
    fetchTickers,
} from "../../../actions/api";

import {getTickers} from "../../../reducers/rootReducer";

import {withStyles} from '@material-ui/core/styles';

import Options, {styles} from './SearchCurrencyView.js';

const mapStateToProps = (state) => {
    return {
        options: getTickers(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setOption: option => {
            dispatch(setSelectedCoin(option));
        },
        getTickers: () => {
            dispatch(fetchTickers());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Options));