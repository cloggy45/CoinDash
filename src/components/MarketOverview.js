import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import withTable from "../helpers/withTable";
import { fetchTopTen } from "../actions/api";

import styleConstants from "../misc/style_constants.js";

class TopTenOverview extends Component {
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
    return <p> Hello </p>;
  }
}

// Component specific props
function mapStateToProps(state) {
  return {
    topTen: state.api.topTen
  };
}

const mapDispatchToProps = dispatch => ({
  fetch: dispatch(fetchTopTen())
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withTable)(
  TopTenOverview
);
