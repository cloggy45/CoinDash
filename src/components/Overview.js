import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import styleConstants from "../misc/style_constants.js";

const Overview = props => {
  const {
    active_currencies,
    active_markets,
    total_market_cap_usd,
    total_24h_volume_usd
  } = props;

  const Wrapper = styled.section`
    color: ${styleConstants.get("Light")};
    margin: 20px 0;
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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });

  return (
    <Wrapper>
      <Table>
        <tbody>
          <tr>
            <TableData>Total Market Cap</TableData>
            <TableData>{formatter.format(total_market_cap_usd)}</TableData>
          </tr>
          <tr>
            <TableData>Total 24 Volume</TableData>
            <TableData>{formatter.format(total_24h_volume_usd)}</TableData>
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
  );
};

export default Overview;
