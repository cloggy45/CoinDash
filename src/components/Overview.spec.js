import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store/dist/index-umd";
import { shallow, mount, render, configure } from "enzyme";
import renderer from "react-test-renderer";
import { store } from "../index";
import Adapter from "enzyme-adapter-react-16";
import { Overview } from "../components/Overview";

configure({ adapter: new Adapter() });
let wrapper;
beforeEach(() => {
  wrapper = mount(<Overview />);
});
describe("Overview Component", () => {
  it("Renders a scaleloader when loading data", () => {
    expect(wrapper.find("ScaleLoader").length).toBeGreaterThan(0);
  });

  it("Renders Table when data is loaded", () => {
    const props = {
      active_cryptocurrencies: 1610,
      active_markets: 10922,
      bitcoin_percentage_of_market_cap: 37.01,
      quotes: {
        USD: {
          total_market_cap: 387982170530.0,
          total_volume_24h: 21116156349.0
        }
      }
    };
    const wrapper = mount(<Overview overview={props} />);
    wrapper.setState({ isLoading: false });
    expect(wrapper.find("table").length).toBeGreaterThan(0);
    console.log(wrapper.debug());
  });
});
