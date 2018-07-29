import React, { Component, StrictMode } from 'react';
import { render } from 'react-dom';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { fetchCoinData } from '../actions/api';
import styleConstants from '../misc/style_constants.js';

import Overview from '../components/Overview';
import Panel from '../components/Panel';

import TopTenOverview from '../containers/TopTenOverview';

import { bindActionCreators } from 'redux';

import Options from './Options';
import Graph from './Graph';

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

const App = () => {
  return (
    <Container>
      <Title>
        Coin:<LightSpan>Dash</LightSpan>
      </Title>
      <TopTenOverview />
    </Container>
  );
};

export default connect()(App);
