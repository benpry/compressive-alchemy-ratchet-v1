import React from "react";
import { shape_paths } from "../../constants.js"

export class DSLStatement extends React.Component {

  render() {

    const { statement } = this.props;

    const regex = /(\w+) (\w+) \+ (\w+) (\w+) -> (\w+) (\w+)/g;
    const result = regex.exec(statement)

    // read the relevant values from the regex
    const xColor = result[1] == "any" ? "grey" : result[1];
    const xShape = result[2] == "anything" ? "blob" : result[2];
    const yColor = result[3] == "any" ? "grey" : result[3];
    const yShape = result[4] == "anything" ? "blob" : result[4];
    const zColor = result[5] == "any" ? "grey" : result[5];
    const zShape = result[6] == "anything" ? "blob" : result[6];

    return (
        <div className="dsl-statement">
          { statement }<br/>
          <svg viewBox="-100.0 -100.0 200 200">
              <path
                strokeWidth="0"
                strokeLinejoin="mitre"
                d={shape_paths[xShape]}
                style={{fill: xColor}}
              />
          </svg> {" + "}
          <svg viewBox="-100.0 -100.0 200 200">
              <path
                strokeWidth="0"
                strokeLinejoin="mitre"
                d={shape_paths[yShape]}
                style={{fill: yColor}}
              />
          </svg> {" -> "}
          <svg viewBox="-100.0 -100.0 200 200">
              <path
                strokeWidth="0"
                strokeLinejoin="mitre"
                d={shape_paths[zShape]}
                style={{fill: zColor}}
              />
          </svg>
        </div>
    )
  }

}
