import React, { Component } from "react";
import { render } from "react-dom";
import styled, { css } from "styled-components";

import { connect } from "react-redux";
import { fetchCoinData } from "../actions/action"
import styleConstants from "../misc/style_constants.js";

import Overview from "../components/Overview";
import Panel from "../components/Panel";
import Table from "../components/Table";

import { bindActionCreators } from 'redux'

import Options from "./Options";
import Graph from "./Graph";

const Container = styled.div`
      input:focus,
      select:focus,
      textarea:focus,
    `;

const Title = styled.h1`
      text-align: center;
      color: ${styleConstants.get('Yellow')};
    `;

const LightSpan = styled.span`
      font-weight: 200;
    `;

class App extends Component {
  constructor(props) {
    super(props);

    this.createGraph = this.createGraph.bind(this);
  }



  createGraph(ticker = "", currency = "", graphType = "", label = "", filter = "") {
    return (
      <Graph
        filter={filter}
        ticker={ticker}
        currency={currency}
        graphType={graphType}
        label={label}
      />
    )
  }

  render() {
    return (
      <Container>
        <Title>
          Coin:<LightSpan>Dash</LightSpan>
        </Title>
        <Overview  />
        <Options />
      </Container>
    );
  }
}



export default connect()(App);
