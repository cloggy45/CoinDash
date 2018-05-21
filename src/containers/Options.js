import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "../misc/react-select-custom.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { setSelected } from "../actions/option";
import { fetchTickers, fetchCoinHistory } from "../actions/api";

export class Options extends React.Component {
  state = {
    selectedOption: "BTC"
  };

  componentDidMount() {
    this.props.getTickers();
    this.props.setOption("BTC");
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption.value }, () => {
      this.props.setOption(this.state.selectedOption);
    });
  };

  formatOptions = (options = []) => {
    return options.map(data => {
      return { value: data.symbol, label: data.name };
    });
  };

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const options = this.formatOptions(this.props.options);
    return (
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        clearable={false}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    options: state.api.tickers.data
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

export default connect(mapStateToProps, mapDispatchToProps)(Options);
