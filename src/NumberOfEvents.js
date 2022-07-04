import React, { Component } from "react";

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfEvents: 15,
    };
  }
  render() {
    return (
      <div className="numberOfEvents">
        <input
          className="number events_number_input"
          type="number"
          value={this.state.numberOfEvents}
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
