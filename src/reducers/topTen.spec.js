import { topTen } from "./topTen";
import * as types from "../actions/actionTypes";

describe("Fetch Top Ten Reducer", () => {
  it("should return the initial state", () => {
    expect(topTen(undefined, {})).toEqual({
      isFetching: true,
      topTen: undefined,
      errorMessage: undefined
    });
  });

  it("should handle FETCH_TOP_TEN_REQUEST", () => {
    const someAction = {
      type: types.FETCH_TOP_TEN_REQUEST,
      payload: true
    };

    const expectedResult = {
      isFetching: true
    };
    expect(topTen({}, someAction)).toEqual(expectedResult);
  });

  it("should handle FETCH_TOP_TEN_SUCCESS", () => {
    const someAction = {
      type: types.FETCH_TOP_TEN_SUCCESS,
      payload: "Some Data",
      isFetching: false
    };

    const expectedResult = {
      topTen: "Some Data",
      isFetching: false
    };
    expect(topTen({}, someAction)).toEqual(expectedResult);
  });

  it("should handle FETCH_TOP_TEN_FAILED", () => {
    const someAction = {
      type: types.FETCH_TOP_TEN_FAILED,
      payload: "error encountered",
      isFetching: false
    };

    const expectedResult = {
      errorMessage: "error encountered",
      isFetching: false
    };
    expect(topTen({}, someAction)).toEqual(expectedResult);
  });
});
