import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ScaleLoader } from "halogenium";

import styleConstants from "../misc/style_constants.js";

import { connect } from "react-redux";

import { fetchTopTen } from "../actions/api";

import Panel from "../components/Panel";

export const Wrapper = styled.section`
  color: ${styleConstants.get("Light")};
  margin: 20px 0;
`;

export const MainTable = styled.table`
  width: 100%;
`;

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

export class Table extends Component {
  state = {
    isLoading: true,
    list: []
  };

  ComponenTableDataidMount() {
    this.props.fetch;
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    topTen: PropTypes.array
  };

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
    if (this.state.isLoading) {
      return (
        <ScaleLoader
          color={styleConstants.get("Light")}
          size="16px"
          margin="4px"
        />
      );
    } else {
      const { list } = this.state;
      return (
        <Panel label={"Top Ten"}>
          <Wrapper>
            <MainTable>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Change (24 Hour)</th>
                </tr>
              </thead>
              <tbody>
                {this.sortList(list).map(data => {
                  return (
                    <tr key={data.id}>
                      <TableData>{data.rank}</TableData>
                      <TableData>{data.name}</TableData>
                      <TableData>
                        {formatter.format(data.quotes.USD.price)}
                      </TableData>
                      {this.isNegativePercent(
                        data.quotes.USD.percent_change_24h
                      ) ? (
                        <TableData style={{ color: styleConstants.get("Red") }}>
                          {data.quotes.USD.percent_change_24h}%
                        </TableData>
                      ) : (
                        <TableData
                          style={{ color: styleConstants.get("Green") }}
                        >
                          {data.quotes.USD.percent_change_24h}%
                        </TableData>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </MainTable>
          </Wrapper>
        </Panel>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    topTen: state.api.topTen
  };
};

const mapDispatchToProps = dispatch => ({
  fetch: dispatch(fetchTopTen())
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
