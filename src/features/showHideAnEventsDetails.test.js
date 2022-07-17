import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  test("An event element is collapsed by default.", ({ given, when, then }) => {
    given("The user is viewing the list of events", () => {
      AppWrapper = mount(<App />);
    });

    when("The user hasn’t clicked on event element", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });

    then("The event details are collapsed", () => {
      expect(AppWrapper.find(".event.description")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    given("The user is viewing the list of events", async () => {
      AppWrapper = await mount(<App />);
    });

    when("The user has clicked on event element", () => {
      AppWrapper.update();
      AppWrapper.find(".event .button").at(0).simulate("click");
    });

    then("The event details are expanded", () => {
      expect(AppWrapper.find(".event .event.description")).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    given("The user no longer wants to see the events details", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find(".event .button").at(0).simulate("click");
      expect(AppWrapper.find(".event .event.description")).toHaveLength(1);
    });

    when("The user clicks on the details", () => {
      AppWrapper.find(".event .button").at(0).simulate("click");
    });

    then("The event details can be collapsed", () => {
      expect(AppWrapper.find(".event .event.description")).toHaveLength(0);
    });
  });
});
