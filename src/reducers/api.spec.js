import { api } from "./api";
import * as types from "../actions/actionTypes";

describe("API reducer", () => {
  it("should return the initial state", () => {
    expect(api(undefined, {})).toEqual({
        tickers: {
            data: null
        },
    });
  });
});

