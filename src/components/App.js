import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

import axios from "axios";
import ccxt from "ccxt";

import Graph from "./Graph";
import Input from "./Input";
import Overview from "./Overview";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "USD",
      overview: {
        data: {}
      }
    };
  }

  // getData = async () => {
  //   try {
  //     let kraken = new ccxt.kraken();
  //     kraken.proxy = "https://cors-anywhere.herokuapp.com/";
  //     console.log(kraken);
  //     console.log(kraken.id, await kraken.fetchOHLCV('BTC/USD','1m'));
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

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
        console.log(error);
      });
  }

  componentDidMount() {
    // this.getData();
    this.getOverviewData();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Coin:Dash</h1>
        <Overview {...this.state.overview} />

        <label>Exchange</label>
        <select>
          <option>Kraken</option>
          <option>Bitfinex</option>
          <option>Binance</option>
        </select>

        <label>Currency</label>
        <select>
          <option>USD</option>
          <option>GBP</option>
        </select>

        <Input label={"Crypto Currency"} />
        <Graph label={"Volume"} type={"Line"} />
        <Graph label={"Close"} type={"Bar"} />
        <Graph label={"Open"} type={"Bar"} />
      </div>
    );
  }
}
