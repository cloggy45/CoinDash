import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ScaleLoader } from "halogenium";

import styleConstants from "../misc/style_constants.js";

import { connect } from "react-redux";

export const Wrapper = styled.section`
  color: ${styleConstants.get("Light")};
  margin: 20px 0;
`;

export const MainTable = styled.table`
  width: 100%;
`;

export const TableData = styled.td`
  &:nth-child(even) {
    text-align: right;
  }
  padding: 5px;
  border-bottom: #234558 solid 0.1px;
`;

export class Table extends Component {
  state = {
    isLoading: false
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
      return (
        <Wrapper>
          <MainTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Change (24 Hour)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableData>Bitcoin</TableData>
                <TableData>100</TableData>
                <TableData>2%</TableData>
              </tr>
            </tbody>
          </MainTable>
        </Wrapper>
      );
    }
  }
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
