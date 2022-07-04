import React, { Component } from "react";

class Event extends Component {
  constructor() {
    super();

    this.state = {
      showDetails: false,
    };
  }

  handleDetailClick = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event">
        <h1 className="title">{event.title}</h1>
        <h2 className="summary">{event.summary}</h2>
        <p className="start-time">{event.start.dateTime}</p>
        <p className="location">{event.location}</p>
        {this.state.showDetails && (
          <p className="description">{event.description}</p>
        )}
        <button className="button" onClick={this.handleDetailClick}>
          Show Details
        </button>
      </div>
    );
  }
}

export default Event;
