import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

const Overview = props => {
  return (
    <section>
      <h4>Total Cryptocurrencies</h4>
      <h3>{props.data.active_currencies}</h3>
      <h4>Active Markets</h4>
      <h3>{props.data.active_markets}</h3>
      <h4>Total Market Capitalization</h4>
      <h3>{props.data.total_market_cap_usd}</h3>
      <h4>24 Hour Volume</h4>
      <h3>{props.data.total_24h_volume_usd}</h3>
    </section>
  );
};

export default Overview;
