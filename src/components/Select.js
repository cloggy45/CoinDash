import React, { Component } from "react";
import { render } from "react-dom";

const Select = props => {
  return (
    <section>
      <label>{props.label}</label>
      <select>
        {props.list.map(data => {
          return <option>{data}</option>;
        })}
      </select>
    </section>
  );
};

export default Select;
