import {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styleConstants from "../../misc/style_constants";
import Panel from "../../components/Panel";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import {ScaleLoader} from "halogenium";
import React from "react";

class Graph extends Component {
    componentDidMount() {
        this.props.fetchCoinHistory(this.props.selectedCoin);
    };

    render() {
        const { isLoading } = this.props;
        return (
            isLoading ? (<h1>Loading...</h1>) : (<h1>Graph</h1>)
        )
    }
};

export default Graph;