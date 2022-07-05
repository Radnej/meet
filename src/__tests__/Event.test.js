import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe("<Event /> component", () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });
  test("render the event correctly", () => {
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

  test("on render details are hidden", () => {
    expect(EventWrapper.find(".description")).toHaveLength(0);
  });

  test("details shown by click", () => {
    EventWrapper.find(".button").simulate("click");
    expect(EventWrapper.find(".description")).toHaveLength(1);
  });
  test("render show details button", () => {
    expect(EventWrapper.find(".button")).toHaveLength(1);
  });

  test("hide details by click", () => {
    EventWrapper.setState({
      showDetails: true,
    });
    EventWrapper.find(".button").simulate("click");
    expect(EventWrapper.state("showDetails")).toBe(false);
    expect(EventWrapper.find(".description")).toHaveLength(0);
  });
});
