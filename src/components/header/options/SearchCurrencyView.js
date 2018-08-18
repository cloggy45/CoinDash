import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

export const styles = {
  flex : {
    flexGrow: 1
  }
}

class Options extends React.Component {
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
    return options.map(option => {
      return { value: option.symbol, label: option.name };
    });
  };

  render() {
    const {options, classes} = this.props;
    const { selectedOption } = this.state;

    if(options === null) {
      return <p>Loading....</p>
    } else {
      return (
        <Select
          className={classes.flex}
          name="form-field-name"
          value={selectedOption}
          onChange={this.handleChange}
          options={this.formatOptions(options)}
          clearable={false}
        />
      );
    }
  }
}

export default Options;
