import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import styled from "styled-components";

import { fetchTopTen } from "../actions/api";

import styleConstants from "../misc/style_constants.js";

export const TableData = styled.td`
  padding: 5px;
  border-bottom: #234558 solid 0.1px;
  text-align: center;
`;

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});

export class TopTenOverview extends Component {
  state = {
    isLoading: true,
    list: []
  };

  ComponenTableDataidMount() {
    this.props.fetch;
  }

  static defaultProps = {
    topTen: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.topTen === undefined) return null;
    else if (nextProps.topTen === prevState.list) {
      return {
        isLoading: true
      };
    } else {
      return {
        isLoading: false,
        list: Object.entries(nextProps.topTen.data).map(data => data[1])
      };
    }
  }

  sortList = list => {
    return list.sort((a, b) => a.rank > b.rank);
  };

  isNegativePercent = percent => {
    return Math.sign(percent) === -1 ? true : false;
  };

  render() {
    const { list } = this.state;
    return (
      <React.Fragment>
        {this.sortList(list).map(data => {
          return (
            <tr key={data.id}>
              <TableData>{data.rank}</TableData>
              <TableData>{data.name}</TableData>
              <TableData>{formatter.format(data.quotes.USD.price)}</TableData>
              {this.isNegativePercent(data.quotes.USD.percent_change_24h) ? (
                <TableData style={{ color: styleConstants.get("Red") }}>
                  {data.quotes.USD.percent_change_24h}%
                </TableData>
              ) : (
                <TableData style={{ color: styleConstants.get("Green") }}>
                  {data.quotes.USD.percent_change_24h}%
                </TableData>
              )}
            </tr>
          );
        })}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    topTen: state.api.topTen
  };
}

const mapDispatchToProps = dispatch => ({
  fetch: dispatch(fetchTopTen())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopTenOverview);
