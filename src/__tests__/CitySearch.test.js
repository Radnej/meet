import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe("<CitySearch /> component", () => {
  let citySearchWrapper, locations;

  beforeAll(() => {
    locations = extractLocations(mockData);
    citySearchWrapper = shallow(<CitySearch locations={locations} />);
    citySearchWrapper = shallow(
      <CitySearch locations={locations} updateEvents={() => {}} />
    );
  });

  test("render text input", () => {
    expect(citySearchWrapper.find(".city")).toHaveLength(1);
  });

  test("renders list of suggestions", () => {
    expect(citySearchWrapper.find(".suggestions")).toHaveLength(1);
  });

  test("renders text input correctly", () => {
    const query = citySearchWrapper.state("query");
    expect(citySearchWrapper.find(".city").prop("value")).toBe(query);
  });

  test("change state when text input changes", () => {
    citySearchWrapper.setState({
      query: "Munich",
    });
    const eventObject = { target: { value: "Berlin" } };
    citySearchWrapper.find(".city").simulate("change", eventObject);
    expect(citySearchWrapper.state("query")).toBe("Berlin");
  });

  test("render list of suggestions correctly", () => {
    const locations = extractLocations(mockData);
    citySearchWrapper.setState({ suggestions: locations });
    const suggestions = citySearchWrapper.state("suggestions");
    expect(citySearchWrapper.find(".suggestions li")).toHaveLength(
      suggestions.length + 1
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(citySearchWrapper.find(".suggestions li").at(i).text()).toBe(
        suggestions[i]
      );
    }
  });

  test("suggestion list match the query when changed", () => {
    citySearchWrapper.setState({ query: "", suggestions: [] });
    citySearchWrapper.find(".city").simulate("change", {
      target: { value: "Berlin" },
    });
    const query = citySearchWrapper.state("query");
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(citySearchWrapper.state("suggestions")).toEqual(filteredLocations);
  });

  test("selected a suggestion should change query state", () => {
    citySearchWrapper.setState({ query: "Berlin" });
    const suggestions = citySearchWrapper.state("suggestions");
    citySearchWrapper.find(".suggestions li").at(0).simulate("click");
    expect(citySearchWrapper.state("query")).toBe(suggestions[0]);
  });

  test("selecting CitySearch input reveals the suggestions list", () => {
    citySearchWrapper.find(".city").simulate("focus");
    expect(citySearchWrapper.state("showSuggestions")).toBe(true);
    expect(citySearchWrapper.find(".suggestions").prop("style")).not.toEqual({
      display: "none",
    });
  });

  test("selecting a suggestion should hide the suggestions list", () => {
    citySearchWrapper.setState({
      query: "Berlin",
      showSuggestions: undefined,
    });
    citySearchWrapper.find(".suggestions li").at(0).simulate("click");
    expect(citySearchWrapper.state("showSuggestions")).toBe(false);
    expect(citySearchWrapper.find(".suggestions").prop("style")).toEqual({
      display: "none",
    });
  });
});
