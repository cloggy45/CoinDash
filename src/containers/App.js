import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Overview from "../components/Overview";
import Options from "./Options";

import Graph from "./Graph";

const Panel = props => {
  <article>
    <header>
      <h3>{props.label}</h3>
    </header>
    <section>{props.content}</section>
  </article>;
};

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

  render() {
    const colorContentPanel = "#265566";
    const Container = styled.div`
      input:focus,
      select:focus,
      textarea:focus,
    `;

    const Panel = styled.article`
      grid-area: panel-container;
      display: flex;
      flex-direction: column;
      margin: 20px 0;
      color: white;
    `;
    const Header = styled.header`
      background-color: #78c9cf;
      padding: 10px;
    `;

    const Content = styled.section`
      background-color: ${colorContentPanel};
    `;

    const Title = styled.h1`
      text-align: center;
      color: #eadf5a;
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
        <Panel>
          <Header>Close Price</Header>
          <Content>
            <Graph
              ticker={this.state.selectedTicker}
              currency={this.state.currency}
              graphType={"bar"}
              label={"Close"}
            />
          </Content>
        </Panel>

        <Panel>
          <Header>Social Media</Header>
          <Content>Stuff</Content>
        </Panel>
      </Container>
    );
  }
}
