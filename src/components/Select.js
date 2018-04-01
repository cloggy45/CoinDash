import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

const Select = props => {
  const { handleChange, value, selected, label, list } = props;
  return (
    <section>
      <label>{label}</label>
      <select value={selected} onChange={handleChange}>
        {list.map((data, index) => {
          return (
            <option value={value[index]} key={data.toString()}>
              {data}
            </option>
          );
        })}
      </select>
    </section>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  list: PropTypes.array,
  selected: PropTypes.string
};

export default Select;
