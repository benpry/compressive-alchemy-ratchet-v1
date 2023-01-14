import React from "react"
import { shape_paths } from "../../constants.js"

export class GoalDisplay extends React.Component {

  render() {
    const { goalItem } =  this.props;

    return (
      <div className="goal-display">
        <h3>Goal</h3>
        <strong>{`${goalItem["color"]} ${goalItem["shape"]}`}</strong>
        <svg viewBox="-100.0 -100.0 200 200">
            <path
                strokeWidth="0"
                strokeLinejoin="mitre"
                d={shape_paths[goalItem["shape"]]}
                style={{fill: goalItem["color"]}}
            />
        </svg>
      </div>
    )
  }

}
