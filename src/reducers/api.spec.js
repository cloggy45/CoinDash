import { api } from "./api";
import * as types from "../actions/actionTypes";

describe("API reducer", () => {
  it("should return the initial state", () => {
    expect(api(undefined, {})).toEqual({});
  });
  describe("Fetch Top Ten Reducers", () => {
    it("should handle FETCH_TOP_TEN_REQUEST", () => {
      const someAction = {
        type: types.FETCH_TOP_TEN_REQUEST,
        payload: true
      };

      const expectedResult = {
        isFetching: true
      };
      expect(api({}, someAction)).toEqual(expectedResult);
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
      expect(api({}, someAction)).toEqual(expectedResult);
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
      expect(api({}, someAction)).toEqual(expectedResult);
    });
  });
});
