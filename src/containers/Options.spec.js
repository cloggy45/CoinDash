import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render, configure } from "enzyme";
import renderer from "react-test-renderer";
import { store } from "../index";
import Adapter from "enzyme-adapter-react-16";
import { Options } from "../containers/Options";

describe("Options Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Options />);
  });
  it("Should render", () => {
    expect(wrapper.find("div").length).toBeGreaterThan(0);
  });
});
