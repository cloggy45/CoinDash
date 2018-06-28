import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import styled from "styled-components";

import withTable from "../helpers/withTable";
import { fetchTopTen } from "../actions/api";

import styleConstants from "../misc/style_constants.js";

export const TableData = styled.td`
  padding: 5px;
  border-bottom: #234558 solid 0.1px;
  text-align: center;
`;

const Fragment = React.Fragment;

class TopTenOverview extends Component {
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
    console.log("TopTen", this.props);
    return (
      <Fragment>
        <h1>Hello</h1>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withTable(TopTenOverview)
);
