import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ScaleLoader } from "halogenium";

import styleConstants from "../misc/style_constants.js";

import { connect } from "react-redux";

export class Table extends Component {
  state = {
    isLoading: true
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
        <div>
          <h1>Hello</h1>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
