import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";


import Graph from "./Graph";
import Overview from "./Overview";
import Select from "./Select";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

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
      tickers: [],
      currency: "USD",
      overview: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedTicker: event.target.value });
  }

  async getTickers() {
    try {
      const response = await fetch('https://api.coinmarketcap.com/v1/ticker/')
      const responseJSON = await response.json();
      this.setState({tickers: responseJSON});
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

  filterDataset(filter = "", dataset = []) {
    return dataset.map(datum => {
      return datum[filter];
    });
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
      margin: 0 10px 20px 10px;
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
        <Select
          selected={this.state.selectedTicker}
          label={"Select Currency"}
          value={this.state.tickers.map(data => {
            return data.symbol;
          })}
          list={this.state.tickers.map(data => {
            return data.id;
          })}
          handleChange={this.handleChange}
        />
        <Panel>
          <Header>Close Price</Header>
          <Content>
            <Graph
              ticker={this.state.selectedTicker}
              graphType={"line"}
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
