import React from "react";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
        <div className="instructions">
          <div className="instructions-text">
            <h1> Instructions </h1>
            <p>
              In this game, you will have a set of items that you can craft together to create new items. You will be given a goal,
              which is an item you have to create.
            </p>
            <ul>
              <li>Every item has a <strong>shape</strong> and a <strong>color</strong>.</li>
              <li>The shapes and colors of the items determine what they produce when you craft them together.</li>
              <li>Every combination of two items produces one item when crafted.</li>
              <li>The game will keep track of all the recipes you discover as you craft items together.</li>
            </ul>
            <p>
              You can make new resources using the <strong>crafting bench</strong>.
            </p>
            <ul>
              <li>You can place any two resources on the crafting table with the "add" button and try to craft something with the "Craft!" button.</li>
              <li>The order of resources on the bench matters: placing the same two items in a different order might produce something different.</li>
            </ul>
            <p>
              The game ends when you either produce your goal item or have only one item left in your inventory and can't craft anymore.
            </p>
            <p>
              You will complete <strong>three games</strong>, each with different recipes and starting resources.
              You will complete <strong>{game.treatment.nEpisodes} "episodes"</strong> of the game, where your starting items and recipes will be the same,
              but you might have different goals.
            </p>
            <p>You will earn a <strong>bonus of {game.treatment.goalBonus}¢</strong> for every goal you accomplish.</p>
            <p>Scroll down to see an example of the interface, then click "Next" to move on.</p>
          </div>
          <br/>
          <div className="instructions-image">
            <img src="interface_screenshot.png"/>
          </div>
          <p>
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={onNext} disabled={!hasNext}>
              Next
            </button>
          </p>
        </div>
    );
  }
}
