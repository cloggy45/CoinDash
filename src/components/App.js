import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

import axios from "axios";

import Graph from "./Graph";
import Input from "./Input";
import Overview from "./Overview";
import Select from "./Select";
import ErrorHandler from "./ErrorHandler";

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
      data: [
        {
          time: 1506470400,
          close: 4172.79,
          high: 4274.64,
          low: 3882.08,
          open: 3892.7,
          volumefrom: 307628.15,
          volumeto: 1271867967.22
        },
        {
          time: 1506729600,
          close: 4401.32,
          high: 4477.38,
          low: 4164.25,
          open: 4172.79,
          volumefrom: 199279.01,
          volumeto: 867904021.52
        },
        {
          time: 1506988800,
          close: 4321.44,
          high: 4435.99,
          low: 4143.35,
          open: 4401.32,
          volumefrom: 209562.46000000002,
          volumeto: 897385746.34
        },
        {
          time: 1507248000,
          close: 4611.7,
          high: 4622.87,
          low: 4296.93,
          open: 4321.44,
          volumefrom: 173261.96000000002,
          volumeto: 769274215.65
        },
        {
          time: 1507507200,
          close: 4824.2,
          high: 4930,
          low: 4556.15,
          open: 4611.7,
          volumefrom: 279159.52,
          volumeto: 1332838056.46
        },
        {
          time: 1507766400,
          close: 5824.71,
          high: 5852.78,
          low: 4814.98,
          open: 4824.2,
          volumefrom: 455159.36,
          volumeto: 2494517230.25
        },
        {
          time: 1508025600,
          close: 5598.58,
          high: 5862.69,
          low: 5448.22,
          open: 5824.71,
          volumefrom: 228633.33,
          volumeto: 1288979168.9299998
        },
        {
          time: 1508284800,
          close: 5993.11,
          high: 6075.32,
          low: 5114.87,
          open: 5598.58,
          volumefrom: 328936.91,
          volumeto: 1853984991.1
        },
        {
          time: 1508544000,
          close: 5903.61,
          high: 6187.2,
          low: 5644.22,
          open: 5993.11,
          volumefrom: 355115.22,
          volumeto: 2105031079.48
        },
        {
          time: 1508803200,
          close: 5887.61,
          high: 5970.4,
          low: 5375.64,
          open: 5903.61,
          volumefrom: 343250.83999999997,
          volumeto: 1945354063.1100001
        },
        {
          time: 1509062400,
          close: 6147.52,
          high: 6295.43,
          low: 5654.8,
          open: 5887.62,
          volumefrom: 300221.42,
          volumeto: 1760885673.96
        },
        {
          time: 1509321600,
          close: 6737.78,
          high: 6738.74,
          low: 6018.97,
          open: 6147.7,
          volumefrom: 313065.86,
          volumeto: 1989237889.76
        },
        {
          time: 1509580800,
          close: 7363.8,
          high: 7492.24,
          low: 6737.77,
          open: 6737.78,
          volumefrom: 500285.61,
          volumeto: 3557519807.9999995
        },
        {
          time: 1509840000,
          close: 7102.75,
          high: 7599.44,
          low: 6934.73,
          open: 7363.8,
          volumefrom: 366460.25,
          volumeto: 2654211653.21
        },
        {
          time: 1510099200,
          close: 6565.8,
          high: 7869.1,
          low: 6406.05,
          open: 7102.23,
          volumefrom: 568995.46,
          volumeto: 4061932665.45
        },
        {
          time: 1510358400,
          close: 6522.45,
          high: 6821.5,
          low: 5493.64,
          open: 6565.8,
          volumefrom: 583892.8300000001,
          volumeto: 3642518337.2799997
        },
        {
          time: 1510617600,
          close: 7853.68,
          high: 7964.64,
          low: 6419.18,
          open: 6522.45,
          volumefrom: 361560.12,
          volumeto: 2567695223.2200003
        },
        {
          time: 1510876800,
          close: 8042.64,
          high: 8100.87,
          low: 7458.9,
          open: 7853.68,
          volumefrom: 260348,
          volumeto: 2030112355.85
        },
        {
          time: 1511136000,
          close: 8234.55,
          high: 8368.36,
          low: 7819.06,
          open: 8042.64,
          volumefrom: 256969.59999999998,
          volumeto: 2095397117.6399999
        },
        {
          time: 1511395200,
          close: 8754.69,
          high: 8761.98,
          low: 7900.17,
          open: 8234.5,
          volumefrom: 225675.74000000002,
          volumeto: 1869659231.6599998
        },
        {
          time: 1511654400,
          close: 9906.04,
          high: 9969.58,
          low: 8746.56,
          open: 8754.62,
          volumefrom: 280549.66,
          volumeto: 2673004212.31
        },
        {
          time: 1511913600,
          close: 10861.47,
          high: 11417.84,
          low: 8938.7,
          open: 9906.04,
          volumefrom: 552253.04,
          volumeto: 5608672065.34
        },
        {
          time: 1512172800,
          close: 11623.91,
          high: 11851.09,
          low: 10578.43,
          open: 10861.47,
          volumefrom: 302125.11,
          volumeto: 3388345531.8799996
        },
        {
          time: 1512432000,
          close: 16850.31,
          high: 16879.26,
          low: 11486.13,
          open: 11624.37,
          volumefrom: 578372.53,
          volumeto: 7996102411.799999
        },
        {
          time: 1512691200,
          close: 15059.6,
          high: 17294.85,
          low: 13031,
          open: 16867.98,
          volumefrom: 670361.92,
          volumeto: 10149928806.55
        },
        {
          time: 1512950400,
          close: 16286.82,
          high: 17560.65,
          low: 15024.56,
          open: 15060.45,
          volumefrom: 447978.48,
          volumeto: 7456462432.1
        },
        {
          time: 1513209600,
          close: 19345.49,
          high: 19587.7,
          low: 16023.64,
          open: 16286.82,
          volumefrom: 373743.15,
          volumeto: 6534971446.16
        },
        {
          time: 1513468800,
          close: 17523.7,
          high: 19870.62,
          low: 16812.8,
          open: 19346.6,
          volumefrom: 431203.14,
          volumeto: 7998869681.690001
        },
        {
          time: 1513728000,
          close: 13664.97,
          high: 17813.6,
          low: 10875.71,
          open: 17521.73,
          volumefrom: 858391.75,
          volumeto: 12656779494.94
        },
        {
          time: 1513987200,
          close: 13833.49,
          high: 15493.23,
          low: 12166.45,
          open: 13664.97,
          volumefrom: 460062.66000000003,
          volumeto: 6408228954.16
        },
        {
          time: 1514246400,
          close: 14398.7,
          high: 16514.59,
          low: 13466.07,
          open: 13830.19,
          volumefrom: 452207.17000000004,
          volumeto: 6787320971.49
        },
        {
          time: 1514505600,
          close: 13850.4,
          high: 15109.81,
          low: 11962.09,
          open: 14398.45,
          volumefrom: 412210.62,
          volumeto: 5613037257.2
        },
        {
          time: 1514764800,
          close: 15156.62,
          high: 15435.01,
          low: 12877.67,
          open: 13850.49,
          volumefrom: 322700.77,
          volumeto: 4618511551.809999
        },
        {
          time: 1515024000,
          close: 17172.3,
          high: 17252.85,
          low: 14244.67,
          open: 15156.49,
          volumefrom: 336857.23000000004,
          volumeto: 5353407490.27
        },
        {
          time: 1515283200,
          close: 14468.5,
          high: 17184.81,
          low: 13902.31,
          open: 17174.5,
          volumefrom: 321190.98,
          volumeto: 4962701537.78
        },
        {
          time: 1515542400,
          close: 13841.19,
          high: 14979.96,
          low: 12825.95,
          open: 14468.09,
          volumefrom: 417824.19,
          volumeto: 5800870629.76
        },
        {
          time: 1515801600,
          close: 13631.98,
          high: 14595.04,
          low: 13031.91,
          open: 13841.19,
          volumefrom: 236926.77,
          volumeto: 3304406100.16
        },
        {
          time: 1516060800,
          close: 11175.52,
          high: 13648.84,
          low: 9205.38,
          open: 13634.6,
          volumefrom: 879252.75,
          volumeto: 9866881862.8
        },
        {
          time: 1516320000,
          close: 11549.93,
          high: 13031.04,
          low: 10867.18,
          open: 11175.52,
          volumefrom: 360398.35,
          volumeto: 4310352755.820001
        },
        {
          time: 1516579200,
          close: 11429.02,
          high: 11913.74,
          low: 9980.5,
          open: 11549.98,
          volumefrom: 440396.49,
          volumeto: 4808608656.64
        },
        {
          time: 1516838400,
          close: 11459.71,
          high: 11741.92,
          low: 10346.86,
          open: 11428.11,
          volumefrom: 326542.41,
          volumeto: 3652291217.39
        },
        {
          time: 1517097600,
          close: 10107.26,
          high: 12064.19,
          low: 9871.21,
          open: 11460.39,
          volumefrom: 332703.85,
          volumeto: 3679883491.04
        },
        {
          time: 1517356800,
          close: 8870.82,
          high: 10377.96,
          low: 7786.2,
          open: 10107.4,
          volumefrom: 653775.51,
          volumeto: 5963971838.549999
        },
        {
          time: 1517616000,
          close: 6937.08,
          high: 9504.37,
          low: 6627.31,
          open: 8872.87,
          volumefrom: 645663.6699999999,
          volumeto: 5200841115.25
        },
        {
          time: 1517875200,
          close: 8260.69,
          high: 8643.94,
          low: 5968.36,
          open: 6936.43,
          volumefrom: 960373.94,
          volumeto: 7152035818.610001
        },
        {
          time: 1518134400,
          close: 8084.61,
          high: 9081.49,
          low: 7775.36,
          open: 8259.26,
          volumefrom: 441190.29999999993,
          volumeto: 3710767368.36
        },
        {
          time: 1518393600,
          close: 9485.64,
          high: 9508.22,
          low: 8084.41,
          open: 8084.61,
          volumefrom: 357259.4,
          volumeto: 3160105584.0600004
        },
        {
          time: 1518652800,
          close: 11097.21,
          high: 11119.45,
          low: 9363.38,
          open: 9485.64,
          volumefrom: 397993.93,
          volumeto: 4056417353.1600003
        },
        {
          time: 1518912000,
          close: 11256.43,
          high: 11802.23,
          low: 10161.01,
          open: 11097.21,
          volumefrom: 405124.74,
          volumeto: 4486583738.719999
        },
        {
          time: 1519171200,
          close: 10175.51,
          high: 11295.58,
          low: 9604,
          open: 11256.78,
          volumefrom: 498154.27,
          volumeto: 5178121157.61
        },
        {
          time: 1519430400,
          close: 10326.5,
          high: 10528,
          low: 9329.44,
          open: 10175.51,
          volumefrom: 325116.6,
          volumeto: 3219306934.7
        },
        {
          time: 1519689600,
          close: 10929.37,
          high: 11090.3,
          low: 10154.24,
          open: 10326.5,
          volumefrom: 293639.62,
          volumeto: 3139387494.7200003
        },
        {
          time: 1519948800,
          close: 11504.42,
          high: 11539.79,
          low: 10801.45,
          open: 10929.37,
          volumefrom: 209491.24,
          volumeto: 2355835951.41
        },
        {
          time: 1520208000,
          close: 9928.56,
          high: 11694.15,
          low: 9470.73,
          open: 11503.94,
          volumefrom: 361260.14,
          volumeto: 3860422201.46
        },
        {
          time: 1520467200,
          close: 8797.27,
          high: 10119.21,
          low: 8393.45,
          open: 9928.56,
          volumefrom: 505886.75,
          volumeto: 4658783308.360001
        },
        {
          time: 1520726400,
          close: 9160.12,
          high: 9907.41,
          low: 8484.32,
          open: 8797.27,
          volumefrom: 436605.92999999993,
          volumeto: 4038775128.8900003
        },
        {
          time: 1520985600,
          close: 8283.23,
          high: 9360.66,
          low: 7698.47,
          open: 9160.12,
          volumefrom: 478828.87,
          volumeto: 3988213112.8
        },
        {
          time: 1521244800,
          close: 8623.14,
          high: 8725.6,
          low: 7318.46,
          open: 8283.23,
          volumefrom: 482267.18000000005,
          volumeto: 3885271591
        },
        {
          time: 1521504000,
          close: 8724.98,
          high: 9184.51,
          low: 8339.8,
          open: 8623.14,
          volumefrom: 358467.86,
          volumeto: 3165125402.53
        },
        {
          time: 1521763200,
          close: 8472.84,
          high: 9036.23,
          low: 8307.58,
          open: 8724.98,
          volumefrom: 279721.27,
          volumeto: 2425303970.04
        },
        {
          time: 1522022400,
          close: 7900.23,
          high: 8521.04,
          low: 7752.3,
          open: 8472.56,
          volumefrom: 313001.2,
          volumeto: 2524337234.3
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ exchange: event.target.value });
    // this.getData(this.state.exchange);
    console.log("Inside handleChange", this.state.exchange);
  }

  getHistory(from = "", to = "") {
    // axios
    //   .get(
    //     `https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG`
    //   )
    //   .then(response => {
    //     const [ data ] = response;
    //     this.setState({ history: data.Data });
    //   })
    //   .catch(error => {
    //     console.log("Failed to get history", error);
    //   });
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
    this.getHistory();
  }
  render() {
    return (
      <div>
        <h1>Coin:Dash</h1>
        <Overview {...this.state.overview} />
        <Select
          label={"Exchanges"}
          list={["Kraken", "Binance", "cryptopia"]}
          handleChange={this.handleChange}
        />
        <ErrorHandler>
          <Select
            label={"Tickers"}
            list={[]}
            handleChange={this.handleChange}
          />
          <Graph label={"Volume"} content={this.state.data} />
        </ErrorHandler>
      </div>
    );
  }
}
