import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ScaleLoader } from "halogenium";

import styleConstants from "../misc/style_constants.js";

import { connect } from "react-redux";

import { fetchMarketOverviewData } from "../actions/api";

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

export class Overview extends Component {
  state = {
    isLoading: true
  };

  static propTypes = {
    overview: PropTypes.object
  };

  static defaultProps = {};

  componentDidMount() {
    this.props.fetch;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.overview === undefined) return null;
    console.log("next Props", nextProps);
    return {
      isLoading: false
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ScaleLoader
          color={styleConstants.get("Light")}
          size="16px"
          margin="4px"
        />
      );
    } else {
      const {
        active_cryptocurrencies,
        active_markets,
        quotes
      } = this.props.overview;
      const { total_market_cap, total_volume_24h } = quotes.USD;
      return (
        <Wrapper>
          <Table>
            <tbody>
              <tr>
                <TableData>Total Market Cap</TableData>
                <TableData>{formatter.format(total_market_cap)}</TableData>
              </tr>
              <tr>
                <TableData>Total 24 Volume</TableData>
                <TableData>{formatter.format(total_volume_24h)}</TableData>
              </tr>
              <tr>
                <TableData>Active Markets</TableData>
                <TableData>{active_markets}</TableData>
              </tr>
              <tr>
                <TableData>Active Currencies</TableData>
                <TableData>{active_cryptocurrencies}</TableData>
              </tr>
            </tbody>
          </Table>
        </Wrapper>
      );
    }
  }
}

const mapStateToProps = state => {
  const { data } = state.api.marketOverviewData;
  return {
    overview: data
  };
};

const mapDispatchToProps = dispatch => ({
  fetch: dispatch(fetchMarketOverviewData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
