import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let EventWrapper;
  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the user is viewing the list of events", () => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    when("the user has not clicked on event element", () => {});

    then("the event details are collapsed", () => {
      expect(EventWrapper.find(".event .description")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    given("the user is viewing the list of events", async () => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    when("the user has clicked on event element", () => {
      EventWrapper.update();
      EventWrapper.find(".event .button").at(0).simulate("click");
    });

    then("event details are expanded", () => {
      expect(EventWrapper.find(".event .description")).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given("the user did not collapse an event element", () => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
      EventWrapper.setState({ showDetails: true });
    });

    when("the user click again on the show details button", () => {
      EventWrapper.find(".event .button").simulate("click");
    });
    then("the event details can be collapsed", () => {
      expect(EventWrapper.state("showDetails")).toBe(false);
      expect(EventWrapper.find(".event .description")).toHaveLength(0);
    });
  });
});
