import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import PropTypes from 'prop-types';
import map from 'lodash.map';

export const styles = {
    flex: {
        flexGrow: 1
    }
};

export class Options extends React.Component {
    state = {
        selectedOption: "BTC",
        selectedId: 0
    };

    componentDidMount() {
        this.props.getTickers();
        this.props.setOption("BTC");
    }

    handleChange = selectedOption => {
        console.log(selectedOption);
        this.setState({selectedOption: selectedOption.symbol, selectedId: selectedOption.value}, () => {
            this.props.setOption(this.state.selectedOption);
        });
    };

    formatOptions = (options={}) => {
        return map(options, (coin) => {
            return {value: coin.Id, label: coin.CoinName, symbol: coin.Symbol}
        });
    };

    render() {
        const {options, classes} = this.props;
        const {selectedId} = this.state;

        if (options === null) {
            return <p>Loading....</p>
        } else {
            return (
                <Select
                    className={`${classes.flex}`}
                    name="Search Currency"
                    value={selectedId}
                    onChange={this.handleChange}
                    options={this.formatOptions(options)}
                    clearable={false}
                    data-cy="select"
                />
            );
        }
    }
}

Options.propTypes = {
    getTickers : PropTypes.func,
    setOption : PropTypes.func,
    options : PropTypes.array,
    classes : PropTypes.object
};

Options.defaultProps = {
    options : [],
    classes : {},
    getTickers: () => {},
    setOption : () => {}
};

export default Options;
