import {
  connect
} from "react-redux";

import {
  setSelected
} from "../../../actions/option";
import {
  fetchTickers,
  fetchCoinHistory
} from "../../../actions/api";

import {getTickers} from "../../../reducers/rootReducer";

import {withStyles} from '@material-ui/core/styles';

import Options, {styles} from './SearchCurrencyView.js';

const mapStateToProps = (state, ownProps) => {
  return {
    options: getTickers(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOption: option => {
      dispatch(setSelected(option));
    },
    getTickers: () => {
      dispatch(fetchTickers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Options));