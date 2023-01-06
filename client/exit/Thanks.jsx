import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  render() {

    const { game } = this.props;
    const completionCode = game.treatment.completionCode;

    return (
      <div className="finished">
        <Centered>
          <div>
            <h1>Finished!</h1>
            <p>Thank you for participating!</p>
            <p>Your completion code is {completionCode}.</p>
          </div>
        </Centered>
      </div>
    );
  }
}
