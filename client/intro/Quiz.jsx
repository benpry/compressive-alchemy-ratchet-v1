import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Quiz extends React.Component {
  state = { nResources: "", totalBonus: "" };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.nResources !== "2" || (this.state.totalBonus !== "$1.23" && this.state.totalBonus !== "1.23")) {
      alert("Incorrect! Read the instructions, and please try again.");
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    const { nResources, totalBonus } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="nResources">How many resources go into each recipe?</label>
              <input
                type="text"
                dir="auto"
                id="nResources"
                name="nResources"
                placeholder="e.g. 3"
                value={nResources}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            <p>
              <label htmlFor="totalBonus">
                Suppose you complete the task and earn an individual bonus of $0.50. You leave a message for the next person, who earns an individual bonus of $0.73.
                How much would your bonus be in total?
              </label>
              <input
                type="text"
                dir="auto"
                id="totalBonus"
                name="totalBonus"
                placeholder="e.g. $1.50"
                value={totalBonus}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>

            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Back to instructions
              </button>
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </Centered>
    );
  }
}
