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

// TODO Set initial option state, maybe just use default props
export class Options extends React.Component {
    state = {
        coinName: "BTC",
        coinSymbol: "BTC",
        coinId: 0,
        selectedOption: "4432"
    };

    componentDidMount() {
        this.props.getTickers();
        // this.props.setSelectedCoin(4432);
    }

    handleChange = selectedOption => {
        const {value, label, symbol} = selectedOption;

        this.setState({coinSymbol: symbol, coinId: value, coinName: label }, () => {
            this.props.setSelectedCoin(symbol, Number(value));
        });
    };

    formatOptions = (options={}) => {
        return map(options, (coin) => {
            return {value: coin.Id, label: coin.CoinName, symbol: coin.Symbol}
        });
    };

    render() {
        const {options, classes} = this.props;
        const {coinId} = this.state;

        if (options === null) {
            return <p>Loading....</p>
        } else {
            return (
                <Select
                    className={`${classes.flex}`}
                    name="Search Currency"
                    value={coinId}
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
    setSelectedCoin : PropTypes.func,
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
