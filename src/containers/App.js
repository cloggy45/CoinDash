import React, { Component } from "react";
import { render } from "react-dom";

import styled, { css } from "styled-components";

import styleConstants from "../misc/style_constants.js";

import Overview from "../components/Overview";
import Panel from "../components/Panel";
import Table from "../components/Table";

import Options from "./Options";
import Graph from "./Graph";

export default class App extends Component {
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

  async getTickers() {
    try {
      const response = await fetch('https://api.coinmarketcap.com/v1/ticker/')
      const responseJSON = await response.json();
      this.setState({ tickers: responseJSON });
    } catch (error) {
      console.log("App getTickers() ", error);
    }
  }

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
    this.getTickers();
    this.getOverviewData();
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
          values={this.state.tickers.map(data => {
            return data.symbol;
          })}
          labels={
            this.state.tickers.map(data => {
              return data.id;
            })
          }
          updateTicker={this.updateTicker} />
        <Panel label={"Price Action"} content={this.createGraph(selectedTicker, currency, 'line', "Close", "close")} />
        <Panel label={"Highest Price"} content={this.createGraph(selectedTicker, currency, 'bar', "High", "high")} />
        <Panel label={"Lowest Price"} content={this.createGraph(selectedTicker, currency, 'bar', "Low", "low")} />
        <Panel label={"Top Ten List"} content={
          <Table header={["Rank", "Name", "Price", "Change(24 Hour)"]} collection={this.state.tickers} />
            
        } />
        
      </Container>
    );
  }
}
