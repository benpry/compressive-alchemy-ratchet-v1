import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";

  componentDidMount() {

    const { game } = this.props;
    const completionCode = game.treatment.completionCode;
    const RETURN_LINK = `https://app.prolific.co/submissions/complete?cc=${completionCode}`;

    setTimeout(() => {
      window.location.replace(RETURN_LINK);
    }, 3000);
  }

  render() {

    const { game } = this.props;
    const completionCode = game.treatment.completionCode;

    return (
      <div className="finished">
        <Centered>
          <div>
            <h1>Finished!</h1>
            <p>Thank you for participating! You should be redirected to Prolific soon...</p>
            <p>In case you are not redirected, your completion code is {completionCode}.</p>
          </div>
        </Centered>
      </div>
    );
  }
}
