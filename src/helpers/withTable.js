import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import styleConstants from "../misc/style_constants.js";

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

const Fragment = React.Fragment;

function withTableWrapper(Overview, tableHeaders = []) {
  class OverviewWithTable extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      console.log("withTable", this.props);
      return (
        <table>
          <tr>
            {tableHeaders.map(header => {
              return <th>{header}</th>;
            })}
          </tr>
          <Overview {...this.props} />;
        </table>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      // your shared props
    };
  }

  const mapDispatchToProps = {
    // your shared action call
  };

  return connect(mapStateToProps, mapDispatchToProps)(OverviewWithTable);
}

export default withTableWrapper;
