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

export class Overview extends Component {
  state = {
    isLoading: true
  };

  static propTypes = {
    overview: PropTypes.object
  };

  static defaultProps = {
    overview: {}
  };

  componentDidMount() {
    this.props.fetchOverviewData;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.overview === undefined) return null;
    return {
      isLoading: false
    };
  }

  render() {
    if (this.state.isLoading === true) {
      return <h1>Loading</h1>;
    } else {
      const {
        active_currencies,
        active_markets,
        total_market_cap_usd,
        total_24h_volume_usd
      } = this.props.overview;
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
    }
  }
}

const mapStateToProps = state => {
  return {
    overview: state.overview.overview
  };
};

const mapDispatchToProps = dispatch => ({
  fetch: dispatch(fetchOverviewData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
