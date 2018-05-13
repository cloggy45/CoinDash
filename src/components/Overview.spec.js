import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render, configure } from "enzyme";
import renderer from "react-test-renderer";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import { Overview } from "../components/Overview";

describe("Overview Component", () => {
  let props;
  let mountedComponent;
  const overview = () => {
    if (!mountedComponent) {
      mountedComponent = mount(<Overview {...props} />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      overview: undefined,
      fetch: undefined
    };
    mountedComponent = undefined;
  });

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Overview />, div);
  });

  it("Renders a renders", () => {
    const section = overview().find("div");
    expect(section.length).toBeGreaterThan(0);
  });
});
