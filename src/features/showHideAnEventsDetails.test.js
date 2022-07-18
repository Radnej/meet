import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the user is viewing the list of events", () => {
      AppWrapper = mount(<App />);
    });

    when("the user hasn’t clicked on event element", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });

    then("the event details are collapsed", () => {
      expect(AppWrapper.find(".event .description")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    given("the user is viewing the list of events", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the user has clicked on event element", () => {
      AppWrapper.update();
      AppWrapper.find(".event .button").at(0).simulate("click");
    });

    then("event details are expanded", () => {
      expect(AppWrapper.find(".event .description")).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;

    given("user no longer wants to see the events details", () => {
      AppWrapper = mount(<App />);
    });

    and("the list of suggested cities is showing", () => {
      AppWrapper.update();
      AppWrapper.find(".event .button").at(0).simulate("click");
      expect(AppWrapper.find(".event .description")).toHaveLength(1);
    });

    when("the user clicks on the details", () => {
      AppWrapper.find(".event .button").at(0).simulate("click");
    });

    then("the event details can be collapsed", () => {
      expect(AppWrapper.find(".event .description")).toHaveLength(0);
    });
  });
});
