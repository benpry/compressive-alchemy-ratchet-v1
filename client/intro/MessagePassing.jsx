import React from "react";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepTwo extends React.Component {
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
              <li>You will write a similar message to help a future participant after you play the game.</li>
              <li>The message you write can contain anything you want.</li>
              <li>The <strong>next participant's individual bonus will be added to your bonus</strong>*, so it is important to leave a helpful message.</li>
            </ul>
            <p>
              While you work on the task, you will have access to a <strong>scratchpad on the right of the screen</strong>. 
            </p>
            <ul>
              <li>You can write whatever notes you want in the scratchpad.</li>
              <li>The scratchpad will be visible when you write a message to the next participant.</li>
              <li>You will not have any other record of how you played the game when writing your message, so you should keep track of important information with the scratchpad.</li>  
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
