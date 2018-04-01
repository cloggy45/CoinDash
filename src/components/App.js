import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import axios from "axios";

import Graph from "./Graph";
import Overview from "./Overview";
import Select from "./Select";
import Filter from "./Filter";

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
      current: "BTC",
      history: [],
      tickers: [],
      currency: "USD",
      overview: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ current: event.target.value }, () => {
      console.log("handle", this.state.current);
    });
  }

  getTickers() {
    axios
      .get(`https://api.coinmarketcap.com/v1/ticker/`)
      .then(response => {
        this.setState({ tickers: response.data });
      })
      .catch(error => {
        console.log("Failed to get tickers", error);
      });
  }

  getOverviewData() {
    axios
      .get(
        `https://api.coinmarketcap.com/v1/global/?convert=${
          this.state.currency
        }`
      )
      .then(response => {
        this.setState({ overview: response.data });
      })
      .catch(error => {
        console.log("Failed to get overview data", error);
      });
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
          selected={this.state.current}
          label={"Select Currency"}
          value={this.state.tickers.map(data => {
            return data.symbol;
          })}
          list={this.state.tickers.map(data => {
            return data.id;
          })}
          handleChange={this.handleChange}
        />
        <Filter filters={["Day", "Week", "Month", "Year"]} />
        <Panel>
          <Header>Close Price</Header>
          <Content>
            <Graph
              graphType={"line"}
              label={"Close"}
              labels={this.filterDataset("time", this.state.history)}
              dataset={this.filterDataset("close", this.state.history)}
            />
          </Content>
        </Panel>
        <Panel>
          <Header>Open Price</Header>
          <Content>
            <Graph
              graphType={"bar"}
              label={"Open"}
              labels={this.state.history.map(data => {
                return data.time;
              })}
              dataset={this.state.history.map(data => {
                return data.open;
              })}
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
