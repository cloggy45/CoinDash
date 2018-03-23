import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Line } from "react-chartjs-2";

import { createRenderer } from "react-test-renderer/shallow";

import Graph from "../components/Graph";

const mock = new MockAdapter(axios);

const setup = (type = "none") => {
  const renderer = createRenderer();
  renderer.render(<Graph data={data} />);

  let output = renderer.getRenderOutput();

  return {
    data: data,
    output: output,
    renderer: renderer
  };
};

describe("<Graph />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Graph />, div);
  });
});
