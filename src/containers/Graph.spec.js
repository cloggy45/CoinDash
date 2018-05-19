import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render, configure } from "enzyme";
import renderer from "react-test-renderer";
import { store } from "../index";
import Adapter from "enzyme-adapter-react-16";
import { Graph } from "../containers/Graph";

describe("Graph Component", () => {
  it("Should display scale loader when loading data", () => {
    const wrapper = mount(<Graph />);
    expect(wrapper.find("ScaleLoader").length).toBeGreaterThan(0);
  });
  it("Should display canvas element when data is loaded", () => {
    const data = [
      {
        time: 1525737600,
        close: 9196.13,
        high: 9472.09,
        low: 9063.07,
        open: 9377.08,
        volumefrom: 72659.12,
        volumeto: 673924125.29
      },
      {
        time: 1525824000,
        close: 9321.16,
        high: 9373.46,
        low: 8987.27,
        open: 9196.13,
        volumefrom: 67939.11,
        volumeto: 625495066.08
      },
      {
        time: 1525910400,
        close: 9032.22,
        high: 9393.95,
        low: 9017.13,
        open: 9321.52,
        volumefrom: 67915.99,
        volumeto: 629850604.12
      }
    ];
    const wrapper = mount(
      <Graph filter={"close"} graphType={"Line"} dataset={data} />
    );
    wrapper.setState({ isLoading: false });
    expect(wrapper.find("canvas").length).toBeGreaterThan(0);
  });
});
