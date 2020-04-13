import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import * as api from "../lib/api";
import mockUserDiff from "../mocks/mockUserData";

jest.mock("../lib/api");

describe("<App />", () => {
  let wrapper;
  let instance;
  let state;

  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
    state = wrapper.state();
  });

  describe("render()", () => {
    it("should render the application", () => {
      expect(instance instanceof App).toBeTruthy();
    });

    it("should fetch data on mount", () => {
      const spyFetchUser = jest.spyOn(instance, "fetchUserData");
      const spyFetchProject = jest.spyOn(instance, "fetchProjectData");
      instance.componentDidMount();
      expect(spyFetchUser).toHaveBeenCalled();
      expect(spyFetchProject).toHaveBeenCalled();
    });
  });

  describe("fetchUserData", () => {
    it("should set userTableStatus state to LOADING when loading", () => {
      instance.fetchUserData = jest.fn().mockReturnValue({});
      instance.fetchUserData();
      expect(state.userTableStatus).toBe("LOADING");
    });
    it("should set userTableStatus state to COMPLETE when complete", () => {
      api.getUsersDiff = jest.fn(() => {
        return Promise.resolve(mockUserDiff);
      });
      instance.fetchUserData();
      expect(state.userTableStatus).toBe("COMPLETE");
    });
  });
});
