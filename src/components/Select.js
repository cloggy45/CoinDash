import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin: 10px;
  background: #265566;
  color: #2d8490;
`;

const SelectBox = styled.select`
  align: flex-end;
  background: #21364a;
  color: #265566;
  border: none;
  margin: 0 10px;
`;

const Select = props => {
  const { handleChange, value, selected, label, list } = props;
  return (
    <Section>
      <label>{label}</label>
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
