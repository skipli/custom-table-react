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
});
