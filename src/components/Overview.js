import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const Overview = props => {
  const {
    active_currencies,
    active_markets,
    total_market_cap_usd,
    total_24h_volume_usd
  } = props;

  const Wrapper = styled.section`
    color: #78c9cf;
    margin: 20px 5px;
  `;

  const Table = styled.table`
    width: 100%;
  `;

  const TableData = styled.td`
    &:nth-child(even) {
      text-align: right;
    }
    padding: 5px;
    border-bottom: #234558 solid 0.1px;
  `;

  return (
    <Wrapper>
      <Table>
        <tbody>
          <tr>
            <TableData>Total Market Cap</TableData>
            <TableData>{total_market_cap_usd}</TableData>
          </tr>
          <tr>
            <TableData>Total 24 Volume</TableData>
            <TableData>{total_24h_volume_usd}</TableData>
          </tr>
          <tr>
            <TableData>Active Markets</TableData>
            <TableData>{active_markets}</TableData>
          </tr>
          <tr>
            <TableData>Active Currencies</TableData>
            <TableData>{active_currencies}</TableData>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
    // <section>
    //   <h4>Total Cryptocurrencies</h4>
    //   <h3>{active_currencies}</h3>
    //   <h4>Active Markets</h4>
    //   <h3>{active_markets}</h3>
    //   <h4>Total Market Capitalization</h4>
    //   <h3>{total_market_cap_usd}</h3>
    //   <h4>24 Hour Volume</h4>
    //   <h3>{total_24h_volume_usd}</h3>
    // </section>
  );
};

export default Overview;
