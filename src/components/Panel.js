import React from "react";
import Select from "react-select";

const Panel = props => {
  const { label, content } = props;
  <article>
    <header>
      <h3>{label}</h3>
    </header>
    <section>{content}</section>
  </article>;
};

export default Panel;
