import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import styleConstants from "../style_constants";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin: 10px;
  background: ${styleConstants.get('Dark')};
  color: ${styleConstants.get('Grey')};
`;

const SelectBox = styled.select`
  align: flex-end;
  background: ${styleConstants.get('Medium')}
  color: ${styleConstants.get('Dark')}
  border: none;
  margin: 0 1px;
`;

const Select = props => {
  const { handleChange, value, selected, label, list } = props;
  return (
    <Section>
      <SelectBox value={selected} onChange={handleChange}>
        {list.map((data, index) => {
          return (
            <option value={value[index]} key={data.toString()}>
              {data}
            </option>
          );
        })}
      </SelectBox>
    </Section>
  );
};

export default Select;
