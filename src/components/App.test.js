import { shallow } from "enzyme";
import React from "react";
import * as api from "../lib/api";
import {
  mockProjectsDiff,
  mockProjectsDiffError,
} from "../mocks/mockProjectsData";
import { mockUsersDiff, mockUsersDiffError } from "../mocks/mockUsersData";
import App from "./App";

jest.mock("../lib/api");

describe("<App />", () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<App />);

    instance = wrapper.instance();
  });

  describe("render()", () => {
    it("should be instance of the component", () => {
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
    it("should set userTableStatus state to LOADING when loading", async () => {
      instance.fetchUserData = jest.fn().mockReturnValue({});
      await instance.fetchUserData();
      expect(wrapper.state().userTableStatus).toBe("LOADING");
    });
    it("should set userTableStatus state to COMPLETE when complete", async () => {
      api.default.getUsersDiff = jest.fn().mockResolvedValue(mockUsersDiff);
      await instance.fetchUserData();
      expect(wrapper.state().userTableStatus).toBe("COMPLETE");
    });
    it("should set userTableStatus state to ERROR when error happens", async () => {
      api.default.getUsersDiff = jest
        .fn()
        .mockRejectedValue(mockUsersDiffError);
      await instance.fetchUserData();
      expect(wrapper.find({ "data-testid": "error-box" })).toBeTruthy();
      expect(wrapper.state().userTableStatus).toBe("ERROR");
    });
  });

  describe("fetchProjectData", () => {
    it("should set projectTableStatus state to LOADING when loading", async () => {
      instance.fetchProjectData = jest.fn().mockReturnValue({});
      await instance.fetchProjectData();
      expect(wrapper.state().projectTableStatus).toBe("LOADING");
    });
    it("should set projectTableStatus state to COMPLETE when complete", async () => {
      api.default.getProjectsDiff = jest
        .fn()
        .mockResolvedValue(mockProjectsDiff);
      await instance.fetchProjectData();
      expect(wrapper.state().projectTableStatus).toBe("COMPLETE");
    });
    it("should set projectTableStatus state to ERROR when error happens", async () => {
      api.default.getProjectsDiff = jest
        .fn()
        .mockRejectedValue(mockProjectsDiffError);
      await instance.fetchProjectData();
      expect(wrapper.state().projectTableStatus).toBe("ERROR");
    });
  });
});
