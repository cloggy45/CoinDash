import React, { Component } from "react";
import { render } from "react-dom";
import styled, { css } from "styled-components";

const Container = styled.section`
  grid-area: filter-period;
  border-radius: 15px;
  background: #265566;
  margin: 0 10px;
`;

const ListContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const ListElement = styled.li`
  margin: 1px;
  padding: 10px;
  color: #2d8490;
  padding: 10px;
  &:hover {
    padding: 10px;
    border-radius: 15px;
    background: #21364a;
    color: #78c9cf;
  }
`;

const Filter = props => {
  return (
    <Container>
      <nav>
        <ListContainer>
          {props.filters.map((item, index) => {
            return <ListElement key={index}>{item}</ListElement>;
          })}
        </ListContainer>
      </nav>
    </Container>
  );
};

export default Filter;
