import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "../misc/react-select-custom.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { receiveTickers, fetchCoinData, setSelected } from "../actions/action";

class Options extends React.Component {
  state = {
    selectedOption: ""
  };

  componentDidMount() {
    this.props.fetchTickers();
  }

  handleChange = selectedOption => {
    this.props.setOption(selectedOption.value);
    this.setState({ selectedOption: selectedOption });
  };

  render() {
    const { selectedOption } = this.state;
    const { Options } = this.props;
    const value = selectedOption && selectedOption.value;
    return (
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={this.handleChange}
        options={Options}
        clearable={false}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const options = state.options.tickers;
  return {
    Options: options
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setOption: option => dispatch(setSelected(option)),
  fetchTickers: () => dispatch(fetchCoinData())
});
export default connect(mapStateToProps, mapDispatchToProps)(Options);
