import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import axios from "axios";

import Graph from "./Graph";
import Input from "./Input";
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
      ticker: "",
      currency: "USD",
      data: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ exchange: event.target.value });
    // this.getData(this.state.exchange);
    console.log("Inside handleChange", this.state.exchange);
  }

  getHistory(from = "", to = "") {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG`
      )
      .then(response => {
        const [data] = response;
        this.setState({ history: data.Data });
      })
      .catch(error => {
        console.log("Failed to get history", error);
      });
  }

  getTickers() {
    axios
      .get(`http://api.coinmarketcap.com/v1/ticker/`)
      .then(response => {
        console.log(response);
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
        let overview = { ...this.state.overview };
        overview.data = response.data;
        this.setState({ overview });
      })
      .catch(error => {
        console.log("Failed to get overview data", error);
      });
  }

  componentDidMount() {
    // this.getOverviewData();
    // this.getHistory();
  }
  render() {
    const colorContentPanel = "#265566";

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
      margin: 0 0 5px 0;
      border-radius: 5px;
    `;

    const Content = styled.section`
      background-color: ${colorContentPanel};
      border-radius: 5px;
    `;

    const Title = styled.h1`
      text-align: center;
      color: #eadf5a;
    `;

    return (
      <div>
        <Title>Coin:Dash</Title>
        <Overview {...this.state.overview} />
        <Input placeholder={"Search Currencies..."} />
        <Panel>
          <Header>Volume</Header>
          <Content>
            <Graph label={"Volume"} content={this.state.data} />
          </Content>
        </Panel>
        <Panel>
          <Header>Price Action</Header>
          <Content>
            <Graph label={"Volume"} content={this.state.data} />
          </Content>
        </Panel>
        <Panel>
          <Header>Social Media</Header>
          <Content>Stuff</Content>
        </Panel>
      </div>
    );
  }
}
