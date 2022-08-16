import "./nprogress.css";
import "./App.css";
import React, { Component } from "react";
import NumberOfEvents from "./NumberOfEvents";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import { OfflineAlert } from "./Alert";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EventGenre from "./EventGenre";

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 15,
    showWelcomeScreen: undefined,
    isOnline: navigator.onLine,
  };

  async componentDidMount() {
    this.mounted = true;
    window.addEventListener("offline", (e) => {
      this.setState({ isOnline: false });
    });
    window.addEventListener("online", (e) => {
      this.setState({ isOnline: true });
    });

    const accessToken = localStorage.getItem("access_token");
    const isTokenValid =
      !window.location.href.startsWith("http://localhost") &&
      !(accessToken && !navigator.onLine) &&
      (await checkToken(accessToken)).error
        ? false
        : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  updateEvents = (location, eventCount) => {
    !location
      ? (location = this.state.currentLocation)
      : this.setState({ currentLocation: location });
    !eventCount
      ? (eventCount = this.state.numberOfEvents)
      : this.setState({ numberOfEvents: eventCount });
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
      });
    });
  };

  render() {
    const { showWelcomeScreen, events } = this.state;

    if (showWelcomeScreen === undefined) {
      return <div className="App" />;
    } else if (showWelcomeScreen === true) {
      return (
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      );
    } else {
      return (
        <div className="App">
          <div className="offline_alert_container">
            {!this.state.isOnline && (
              <OfflineAlert
                style={{ top: 0 }}
                text={
                  "You are offline. An updated list will be loaded when you are back online."
                }
              />
            )}
          </div>
          <CitySearch
            updateEvents={this.updateEvents}
            locations={this.state.locations}
          />{" "}
          <NumberOfEvents updateEvents={this.updateEvents} />
          <div className="data-vis-wrapper">
            <h4>Event genres</h4>
            <EventGenre events={events} />
            <ResponsiveContainer height={400}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="stature" />
                <YAxis type="number" dataKey="number" name="number of events" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <EventList events={this.state.events} />
        </div>
      );
    }
  }
}

export default App;
