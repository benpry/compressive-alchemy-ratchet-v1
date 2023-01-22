import React from "react";

export default class AbstractionHint extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
        <div className="instructions">
          <div className="instructions-text">
            <h1> Instructions (continued) </h1>
            <p>
              Each item has two features: the shape (triangle, square, or pentagon) and the color (green, red, or blue).
            </p>
            <p>
              Every game has some <strong>abstract structure</strong> where only one of the features or one of the items matters in determining the output.
            </p>
            <p>
              For example, it might be that only the shapes of the items matter or that only the item on the right of the crafting bench matters in determining
              the output. <strong>In the example statements below, only the item on the right matters in determining the output</strong>.
            </p>
            <img src="abstract-rule-example.png"/>
          </div>
          <br/>
          <p>
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={onNext} disabled={!hasNext}>
              Next
            </button>
          </p>
        </div>
    )
  }
}
