import React from "react";

import { Centered } from "meteor/empirica:core";

export default class PostGameMessage extends React.Component {

    onSubmit() {
        const { player } = this.props;
        player.stage.submit();
    }

    render() {

        return (
        <Centered>
            <div className="post-game">
                <h1> Congratulations! </h1>
                <p>
                    You have completed this round of the experiment. Click the "Next" button below to move on to the next round. Remember that the recipes will be different in the next round.
                </p>
                <p>
                    <button type="button" onClick={this.onSubmit.bind(this)}>
                        Next
                    </button>
                </p>
            </div>
        </Centered>
        );
  }
}
