import React from "react";

import { Centered } from "meteor/empirica:core";

export default class MessagePassingNoAbstraction extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <div className="instructions-text">
            <h1> Message Passing </h1>
            <p>
              You also might get help from a previous participant. If you do, you will see a message containing recipes they left for you on the left side of the scren.
            </p>
            <ul>
              <li>The participant who left the message did the same task as you with the <strong>same recipes</strong>.</li>
              <li>You will send recipes to the next participant after you play the game.</li>
              <li>The message can contain at most {game.treatment.channelCapacity} recipes that you received or discovered.</li>
              <li>You will earn <strong>a bonus of {game.treatment.goalBonus}¢</strong> for each goal the person who reads your message achieves*,
                so it is important to leave a helpful message.</li>
            </ul>
            <p>
              Next, you will take a quiz to test your understanding of the game then complete a practice round.
            </p>
            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Previous
              </button>
              <button type="button" onClick={onNext} disabled={!hasNext}>
                Next
              </button>
            </p>
            <p>
              *If no future participant sees your message, your individual bonus will be doubled.
            </p>
          </div>
        </div>
      </Centered>
    );
  }
}
