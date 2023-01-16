import React from "react";

import { Centered } from "meteor/empirica:core";

export default class MessagePassingWithAbstraction extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <div className="instructions-text">
            <h1> Message Passing </h1>
            <p>
              You also might get help from a previous participant. If you do, you will see a message from them in the left-hand side of the
              screen.
            </p>
            <ul>
              <li>The participant who wrote the message did the same task as you with the <strong>same recipes</strong>.</li>
              <li>You will send recipes to the next participant after you play the game.</li>
              <li>The message can contain at most {game.treatment.channelCapacity} statements about the inputs and outputs.</li>
              <li>The messages can either specify specific recipes or more general rules.</li>
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
