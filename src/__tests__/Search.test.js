import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { createRenderer } from "react-test-renderer/shallow";

import Search from "../components/Search";

const mock = new MockAdapter(axios);

describe("Search Exchange", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search />, div);
  });
});
