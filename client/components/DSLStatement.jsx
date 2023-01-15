import React from "react";
import { shape_paths } from "../../constants.js"

export class DSLStatement extends React.Component {

  render() {

    const { statement } = this.props;

    return (
        <div className="dsl-statement">
            { statement }
        </div>
    )
  }

}
