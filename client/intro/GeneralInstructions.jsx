import React from "react";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
        <div className="instructions">
          <div className="instructions-text">
            <h1> Instructions </h1>
            <p>
              In this game, you will operate a store on an alien planet. You have several resources at your disposal and your goal is
              to make as much money as you can. You can do this by selling resources and finding ways to combine them to make more
              valuable resources.
            </p>
            <ul>.
              <li>Every resource has a <strong>shape</strong> and a <strong>color</strong>.</li>
              <li>Each resource has a value in alien currency, marked with ϗ.</li>
            </ul>
            <p>
              You can make new resources using the <strong>crafting bench</strong>.
            </p>
            <ul>
              <li>You can place any two resources on the crafting table with the "add" button and try to craft something with the "Craft!" button.</li>
              <li>If the resources form a valid recipe, you will receive one of the resource that it produces.</li>
              <li>The order of resources on the bench <strong>might matter</strong>.</li>
            </ul>
            <p>
              When you don't want to craft anything, you can click the "sell" button to sell all the resources in your inventory.
            </p>
            <p>
              The conversion rate between alien currency and USD is ϗ{game.treatment.conversionRate} = 1 cent. You will be paid a bonus based on this conversion. You will
              complete several rounds of this game, each with different resources and recipes, and your overall bonus will be the total of the bonuses you earn each round.
              You can earn a bonus of up to $TODO in this experiment.
            </p>
          </div>
          <div className="instructions-image">
            <p>Example of the Interface</p>
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
