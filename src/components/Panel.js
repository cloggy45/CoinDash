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

const Panel = props => {
  const { label, content } = props;
  return (
    <Wrapper>
      <Header>
        <Title>{label}</Title>
      </Header>
      <Section>{content}</Section>
    </Wrapper>
  );
};

Panel.propTypes = {
  label: PropTypes.string,
  content: PropTypes.element
};

Panel.defaultProps = {
  label: "Not Loaded",
  content: "No Content"
};

export default Panel;
