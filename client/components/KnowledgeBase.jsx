import React from "react"
import { DSLStatement } from "./DSLStatement.jsx"

export class KnowledgeBase extends React.Component {

  render() {

    const { statements } = this.props;
    console.log(`statements:`);
    console.log(statements);

    return (
      <div className="knowledge-base">
        <ul>
            {statements.map((statement) => {
                return (
                  <li key={statement}>
                    <DSLStatement statement={statement}/>
                  </li>
                )
            })}
        </ul>
      </div>
    )
  }
}
