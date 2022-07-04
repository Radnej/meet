import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents/> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });
  test("render text input", () => {
    expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
  });

  test("render text input correctly", () => {
    const numberOfEvents = NumberOfEventsWrapper.state("numberOfEvents");
    expect(NumberOfEventsWrapper.find(".number").prop("value")).toBe(
      numberOfEvents
    );
  });

  test("number of events by default is 15", () => {
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(15);
  });

  test("render 15 events by default", () => {
    expect(NumberOfEventsWrapper.find(".number").prop("value")).toBe(15);
  });
});
