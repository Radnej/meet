import React from "react";
import App from "../App";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  test("When user has not specified a number, 15 is the default number", ({
    given,
    when,
    then,
  }) => {
    given("the user has not specified the number of events", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the user begins their search", () => {
      AppWrapper.update();
    });

    then("15 events are listed", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event").length).toBe(8);
    });
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;

    given("the user has not specified the number of events", () => {
      AppWrapper = mount(<App />);
    });

    when("the user has chosen how many events to see", () => {
      AppWrapper.update();
      const eventObject = { target: { value: 3 } };
      AppWrapper.find(".number").simulate("change", eventObject);
    });

    then(
      "the number of displayed events matches the number chosen by user",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find("Event")).toHaveLength(3);
      }
    );
  });
});
