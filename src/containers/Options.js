import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "../misc/react-select-custom.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { receiveTickers, fetchCoinData } from "../actions/action";

class Options extends React.Component {
  state = {
    selectedOption: ""
  };

  componentDidMount() {
    this.props.fetchCoinData;
  }

  componentWillUnmount() {
    console.log("Options Unmounted");
  }

  componentWillReceiveProps(nextProps) {
    console.log("Receiving Props", nextProps);
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {
      this.props.updateTicker(selectedOption);
    });
  };

  render() {
    const { selectedOption } = this.state;
    const { Options, selectedValue } = this.props;
    const value = selectedOption && selectedOption.value;
    return (
      <Select
        name="form-field-name"
        value={selectedValue}
        onChange={this.handleChange}
        options={Options}
        clearable={false}
      />
    );
  }
}

Options.propTypes = {
  tickers: PropTypes.array,
  values: PropTypes.array,
  labels: PropTypes.array,
  selectedValue: PropTypes.string
};

Options.defaultTypes = {
  tickers: [],
  values: [],
  labels: [],
  selectedValue: ""
};

const mapStateToProps = (state, ownProps) => {
  const options = state.Options.tickers;
  return {
    Options: options
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: dispatch(fetchCoinData())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Options);
