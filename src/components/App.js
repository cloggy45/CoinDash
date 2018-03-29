import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import axios from "axios";

import Graph from "./Graph";
import Overview from "./Overview";
import Select from "./Select";
import ErrorBoundary from "./ErrorBoundary";

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
      history: [],
      tickers: [],
      currency: "USD",
      overview: [],
      data: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ exchange: event.target.value });
    // this.getData(this.state.exchange);
    console.log("Inside handleChange", this.state.exchange);
  }

  getHistory() {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG`
      )
      .then(response => {
        console.log(response);
        let data = response.data;
        console.log(data);
        this.setState({ history: data.Data });
      })
      .catch(error => {
        console.log("Failed to get history", error);
      });
  }

  getTickers() {
    axios
      .get(`https://api.coinmarketcap.com/v1/ticker/`)
      .then(response => {
        console.log(response);
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
    this.getHistory();
  }
  render() {
    const colorContentPanel = "#265566";

    const Container = styled.div`
      input:focus,
      select:focus,
      textarea:focus,
      button:focus {
        outline: none;
      }
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
          label={"Select Currency"}
          list={this.state.tickers.map(data => {
            return data.id;
          })}
          handleChange={this.handleChange}
        />
        <Panel>
          <Header>Volume</Header>
          <Content>
            <Graph label={"Volume"} content={this.state.data} />
          </Content>
        </Panel>
        <Panel>
          <Header>Close Price</Header>
          <Content>
            <Graph
              label={"Close"}
              labels={this.state.history.map(data => {
                return data.time;
              })}
              dataset={this.state.history.map(data => {
                return data.close;
              })}
            />
          </Content>
        </Panel>
        <Panel>
          <Header>Open Price</Header>
          <Content>
            <Graph
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
