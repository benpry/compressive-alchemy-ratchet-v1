import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";

export default class Consent extends React.Component {
  render() {
    return (
      <Centered>
        <div className="consent">
          <h1> Consent Form </h1>
            <p>
              By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology.
              If you have questions about this research, please contact <strong>Ben Prystawski</strong> at <a href="mailto:benpry@stanford.edu">benpry@stanford.edu</a> or
              Noah Goodman at ngoodman@stanford.edu. You must be at least 18 years old to participate. Your participation in this research is voluntary. 
              You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. 
              Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you.
            </p>
          <br />
          <ConsentButton text="I AGREE" />
        </div>
      </Centered>
    );
  }
}
