import React from "react";

import { Centered } from "meteor/empirica:core";

export default class MessagePassingWithAbstraction extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;
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
              <li>The participant who wrote the message played the same game as you with the <strong>same recipes</strong>.</li>
              <li>You will send statements to the next participant after you play the game.</li>
              <li>The message can contain at most {game.treatment.channelCapacity} statements about the inputs and outputs.</li>
              <li>You will earn <strong>a bonus of {game.treatment.goalBonus}¢</strong> for each goal the person who reads your message achieves*,
                so it is important to leave a helpful message.</li>
            </ul>
            <p>
              Each statement specifies something about the shapes and colors of the inputs and outputs.
              For example, the statement below says that crafting a red square and a green pentagon together (in that order)
              produces a blue triangle.
            </p>
            <img src="specific-statement.png"/>
            {game.treatment.canAbstract ?
             <div>
                <p>
                 If you want to convey an abstract rule, you can use the "any" and "anything" options.
                </p>
                <img src="general-statement-1.png"/>
                <p>
                  The above statement means "any triangle combined with a blue square makes a green triangle". The below statement means
                  "a blue pentagon combined with any shape of any color makes a green triangle".
                </p>
                <img src="general-statement-2.png"/>
             </div>
             : null}
            <p>
              You <strong>must select a value for each drop-down</strong> in order for any statement to be sent.
            </p>
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
