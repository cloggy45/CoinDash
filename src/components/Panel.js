import React from "react";
import Select from "react-select";
import styled from "styled-components";
import styleConstants from "../misc/style_constants.js";

const Wrapper = styled.section`
  grid-area: panel-container;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  color: white;
`;

const Header = styled.header`
  background-color: ${styleConstants.get("Light")};
  padding: 10px;
`;

const Section = styled.section`
  background-color: ${styleConstants.get("Medium-Light")};
`;

const Panel = props => {
  const { label, content } = props;
  return (
    <Wrapper>
      <Header>
        <h4>{label}</h4>
      </Header>
      <Section>{content}</Section>
    </Wrapper>
  );
};

export default Panel;
