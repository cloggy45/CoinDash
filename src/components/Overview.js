import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import styleConstants from "../misc/style_constants.js";

import { connect } from "react-redux";
import { receiveOverviewData, fetchOverviewData } from "../actions/action";

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

class Overview extends Component {
  state = {
    isLoading: false,
    overview: {}
  };
  componentDidMount() {
    this.props.fetchOverviewData;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.overview === this.state.overview) {
      this.setState({ isLoading: true });
    } else {
      this.setState({ overview: nextProps.overview });
    }
  }

  render() {
    const {
      active_currencies,
      active_markets,
      total_market_cap_usd,
      total_24h_volume_usd
    } = this.state.overview;
    return (
      <Wrapper>
        {this.state.isLoading ? (
          <h3>Is Loading</h3>
        ) : (
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
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const overview = state.overview.overview;
  return {
    overview
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: dispatch(fetchOverviewData())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
