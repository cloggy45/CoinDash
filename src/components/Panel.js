import React from "react";
import Select from "react-select";
import styled from "styled-components";
import PropTypes from "prop-types";

import styleConstants from "../misc/style_constants.js";

const Wrapper = styled.section`
  grid-area: panel-container;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  color: white;
`;

const Title = styled.h4`
  font-weight: 300;
`;

const Header = styled.header`
  background-color: ${styleConstants.get("Light")};
  padding: 5px 10px;
`;

const Section = styled.section`
  background-color: ${styleConstants.get("Medium-Light")};
`;

export const Panel = props => {
  const { label } = props;
  return (
    <Wrapper>
      <Header>
        <Title>{label.replace(/^\w/, c => c.toUpperCase())}</Title>
      </Header>
      <Section>{props.children}</Section>
    </Wrapper>
  );
};

Panel.propTypes = {
  label: PropTypes.string
};

Panel.defaultProps = {
  label: "Default String"
};

export default Panel;
