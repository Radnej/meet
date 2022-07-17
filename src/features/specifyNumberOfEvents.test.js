import React from "react";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  test("When user hasn’t specified a number, 15 is the default number", ({
    given,
    when,
    then,
  }) => {
    given("The user hasn’t specified the number of events", async () => {
      AppWrapper = await mount(<App />);
    });

    when("The user begins their search", () => {
      AppWrapper.update();
    });

    then("15 events are listed", () => {
      expect(AppWrapper.find(".event")).toHaveLength(2);
    });
  });
});
