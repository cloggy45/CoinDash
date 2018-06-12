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
    wrapper.setState({ isLoading: true });
    expect(wrapper.find("ScaleLoader").length).toBeGreaterThan(0);
  });

  it("Renders a section, table, th, td", () => {
    wrapper.setState({ isLoading: false });
    expect(wrapper.find("section").length).toBeGreaterThan(0);
    expect(wrapper.find("table").length).toBeGreaterThan(0);
    expect(wrapper.find("th").length).toBeGreaterThan(0);
    expect(wrapper.find("td").length).toBeGreaterThan(0);
  });
});
