import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "../misc/react-select-custom.css";

class Options extends React.Component {
  state = {
    selectedOption: ""
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {
      this.props.updateTicker(selectedOption);
    });
  };

  createOptions = (values, labels) => {
    return values.map((value, index) => {
      return { value: value, label: labels[index] };
    });
  };

  render() {
    const { selectedOption } = this.state;
    const { values, labels, selectedValue } = this.props;
    const value = selectedOption && selectedOption.value;

    return (
      <Select
        name="form-field-name"
        value={selectedValue}
        onChange={this.handleChange}
        options={this.createOptions(values, labels)}
        clearable={false}
      />
    );
  }
}

export default Options;
