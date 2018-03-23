import React from "react";
import ReactDOM from "react-dom";

import { createRenderer } from "react-test-renderer/shallow";
import Overview from "./components/Overview";

describe("<Overview />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Overview />, div);
  });
});
