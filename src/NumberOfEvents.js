import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 15,
  };

  //   handleInputChanged = (event) => {
  //     const value = event.target.value;
  //     this.props.updateEvents(null, value);
  //     this.setState({ numberOfEvents: value });
  //   };

  handleInputChanged = (event) => {
    let inputValue = event.target.value;
    if (inputValue >= 15 || inputValue <= 0) {
      this.setState({
        numberOfEvents: inputValue,
        infoText: "Please enter a number between 1 - 15",
      });
    } else {
      this.setState({
        numberOfEvents: event.target.value,
        infoText: " ",
      });
    }

    this.props.updateEvents(undefined, inputValue);
  };

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div className="numberOfEvents">
        <input
          className="number events_number_input"
          type="number"
          value={numberOfEvents}
          onChange={this.handleInputChanged}
        ></input>
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
}

export default NumberOfEvents;
