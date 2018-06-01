import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render, configure } from "enzyme";
import renderer from "react-test-renderer";
import { store } from "../index";
import Adapter from "enzyme-adapter-react-16";
import { Table } from "../components/Table";

configure({ adapter: new Adapter() });

describe("Table Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Table />);
  });

  it("Renders a scaleloader when loading data", () => {
    expect(wrapper.find("ScaleLoader").length).toBeGreaterThan(0);
  });
});
