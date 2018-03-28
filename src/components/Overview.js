import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

const Overview = props => {
  const {
    active_currencies,
    active_markets,
    total_market_cap_usd,
    total_24h_volume_usd
  } = props;

  return (
    <section>
      <h4>Total Cryptocurrencies</h4>
      <h3>{active_currencies}</h3>
      <h4>Active Markets</h4>
      <h3>{active_markets}</h3>
      <h4>Total Market Capitalization</h4>
      <h3>{total_market_cap_usd}</h3>
      <h4>24 Hour Volume</h4>
      <h3>{total_24h_volume_usd}</h3>
    </section>
  );
};

export default Overview;
