import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Line } from "react-chartjs-2";

import { createRenderer } from "react-test-renderer/shallow";

import Graph from "../components/Graph";

const mock = new MockAdapter(axios);

const setup = (type = "none", data = {}, options = {}) => {
  const props = {
    type: type,
    data: data,
    options: options
  };

  const renderer = createRenderer();
  renderer.render(<Graph {...props} />);

  let output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
};

describe("<Graph />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Graph />, div);
  });
  it("renders html canvas element", () => {
    const { output } = setup("line");
    expect(output.type).toBe("line");
  });
});
