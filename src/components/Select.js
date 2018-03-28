import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

const Select = props => {
  const { handleChange } = props;
  return (
    <section>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        {props.list.map((data, index) => {
          return <option key={index}>{data}</option>;
        })}
      </select>
    </section>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  list: PropTypes.array
};

export default Select;
