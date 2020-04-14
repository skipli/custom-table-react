import React from "react";
import { shallow } from "enzyme";
import CustomTable from "./CustomTable";
import { mockTableData } from "../mocks/mockTableData";

describe("<CustomTable />", () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<CustomTable {...{ tableData: mockTableData }} />);
    instance = wrapper.instance();
  });

  describe("render()", () => {
    it("should be instance of the component", () => {
      expect(instance instanceof CustomTable).toBeTruthy();
    });

    it("should render the table", () => {
      expect(wrapper.find({ "data-testid": "table-container" })).toHaveLength(
        1
      );
    });
    it("should render table body rows from data", () => {
      expect(wrapper.find({ "data-testid": "table-row" })).toHaveLength(3);
    });
  });

  describe("sortTableData", () => {
    it("should sort the table data by date", () => {
      const sortedTableData = instance.sortTableData();
      const isDecending = sortedTableData.every((data, index) => {
        return (
          index === 0 || data.timestamp <= sortedTableData[index - 1].timestamp
        );
      });
      expect(isDecending).toBeTruthy();
    });

    it("should sort the table data by date according to users preference", () => {
      instance.state.chronological = true;
      const sortedTableData = instance.sortTableData();
      const isAscending = sortedTableData.every((data, index) => {
        return (
          index === 0 || data.timestamp >= sortedTableData[index - 1].timestamp
        );
      });
      expect(isAscending).toBeTruthy();
    });
  });

  describe("sortDate", () => {
    it("should switch state of sorting", () => {
      expect(instance.state.chronological).toBeFalsy();
      instance.sortDate();
      expect(instance.state.chronological).toBeTruthy();
    });
  });
});
