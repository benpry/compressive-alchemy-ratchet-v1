import React from "react";

export default class AbstractionHint extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
        <div className="instructions">
          <h1> Instructions (continued) </h1>
          <p>Each item has two features: the shape (triangle, square, or pentagon) and the color (green, red, or blue).</p>
          <p>In each game, recipes that make each item have <strong>abstract rules</strong> where only some input items or some
            input features matter in determining the output.</p>
          <p>
            For example, it might be that only one of the input items matters in determining the output or that only one of the
            features (color or shape) matters.
          </p>
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
