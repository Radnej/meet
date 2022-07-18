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
    given("the user hasn’t specified the number of events", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the user begins their search", () => {
      AppWrapper.update();
    });

    then("15 events are listed", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event").length).toBeLessThanOrEqual(15);
    });
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;

    given("the user hasn't specified the number of events", () => {
      AppWrapper = mount(<App />);
    });

    when("the user has chosen how many events to see", () => {
      const numberOfEvents = { target: { value: 1 } };
      AppWrapper.find(".numberOfEvents").simulate("change", numberOfEvents);
    });

    then(
      "the number of displayed events matches the number chosen by user",
      () => {
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        NumberOfEventsWrapper.setState({ numberOfEvents: 5 });
        expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(5);
      }
    );
  });
});
