import React, { Component } from "react";
import { render } from "react-dom";
import styled, { css } from "styled-components";

import { connect } from "react-redux";
import { fetchCoinData } from "../actions/action"
import styleConstants from "../misc/style_constants.js";

import Overview from "../components/Overview";
import Panel from "../components/Panel";
import Table from "../components/Table";

import { bindActionCreators } from 'redux'

import Options from "./Options";
import Graph from "./Graph";

const Container = styled.div`
      input:focus,
      select:focus,
      textarea:focus,
    `;

const Title = styled.h1`
      text-align: center;
      color: ${styleConstants.get('Yellow')};
    `;

const LightSpan = styled.span`
      font-weight: 200;
    `;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTicker: "BTC",
      currency: "USD",
      tickers: [],
      overview: []
    };
    this.updateTicker = this.updateTicker.bind(this);
    this.createGraph = this.createGraph.bind(this);
  }

  updateTicker(selectedValue) {
    const { value } = selectedValue;
    this.setState({ selectedTicker: value });
  }

  // async getTickers() {
  //   try {
  //     const response = await fetch('https://api.coinmarketcap.com/v1/ticker/')
  //     const responseJSON = await response.json();
  //     this.setState({ tickers: responseJSON });
  //   } catch (error) {
  //     console.log("App getTickers() ", error);
  //   }
  // }

  async getOverviewData() {
    try {
      const response = await fetch(`https://api.coinmarketcap.com/v1/global/?convert=${this.state.currency}`)
      const responseJSON = await response.json();
      this.setState({ overview: responseJSON });
    } catch (error) {
      console.log("App getOverviewData() ", error);
    }
  }

  componentDidMount() {
    console.log("App is Mounted")
  }

  componentWillUnmount() {
    console.log("App is Unmounted");
  }

  componentWillReceiveProps(nextProps) {
    console.log("App: componentWillReceiveProps")
    console.log(nextProps);
  }

  createGraph(ticker = "", currency = "", graphType = "", label = "", filter = "") {
    return (
      <Graph
        filter={filter}
        ticker={ticker}
        currency={currency}
        graphType={graphType}
        label={label}
      />
    )
  }

  render() {
    const { selectedTicker, currency } = this.state;
    const Container = styled.div`
      input:focus,
      select:focus,
      textarea:focus,
    `;

    const Title = styled.h1`
      text-align: center;
      color: ${styleConstants.get('Yellow')};
    `;

    const LightSpan = styled.span`
      font-weight: 200;
    `;

    return (
      <Container>
        <Title>
          Coin:<LightSpan>Dash</LightSpan>
        </Title>
        <Overview {...this.state.overview} />
        <Options
          selectedValue={this.state.selectedTicker}
          updateTicker={this.updateTicker} />
      </Container>
    );
  }
}



export default connect()(App);
