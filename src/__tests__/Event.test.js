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
  test("render event summary", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });
  test("render event title", () => {
    expect(EventWrapper.find(".title")).toHaveLength(1);
  });
  test("render event start time", () => {
    expect(EventWrapper.find(".start-time")).toHaveLength(1);
  });
  test("render event location", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });
});
