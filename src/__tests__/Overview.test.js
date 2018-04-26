import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";

import { Overview } from "../components/Overview";

describe("Overview Component", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Overview />, div);
  });
});
