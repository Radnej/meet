import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe("<Event /> component", () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });
  test("render number of events correctly", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });
});
