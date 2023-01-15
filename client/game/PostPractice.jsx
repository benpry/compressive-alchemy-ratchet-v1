import React from "react";

import { Centered } from "meteor/empirica:core";

export default class PostPractice extends React.Component {

    onSubmit() {
        const { player } = this.props;
        player.stage.submit();
    }

    render() {
        const { round } = this.props;

        return (
        <Centered>
            <div className="postPractice">
            <h1> Congratulations! </h1>
            <p>
              You completed the practice round.
            </p>
            <p>
                When you are ready to start the main round, click the "Start" button below. Remember that the recipes in the main
                tasks will be different from those in the practice round.
            </p>
            <p>
                <button type="button" onClick={this.onSubmit.bind(this)}>
                    Start
                </button>
            </p>
            </div>
        </Centered>
        );
  }
}
