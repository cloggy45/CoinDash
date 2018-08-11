import React, { Component} from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "../misc/react-select-custom.css";

class Options extends Component {
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

export default Options;