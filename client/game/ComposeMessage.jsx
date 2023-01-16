import React from "react"

import { Centered } from "meteor/empirica:core";
import { Button } from "../components/Button.jsx";
import { StatementMaker } from "../components/StatementMaker.jsx"

export default class ComposeMessage extends React.Component {

  constructor(props) {
    super(props)
  }

  makeStatementUpdater(i) {
    const statementUpdater = (newStatement) => {
      const { round } = this.props;

      const statements = round.get("sentMessage");
      console.log(`updating statement to ${newStatement}`)
      statements[i] = newStatement;
      round.set("sentMessage", statements)
    }

    return statementUpdater;
  }

  submit(event) {
    event.preventDefault();
    const { player, round } = this.props;
    // filter out null statements
    const statements = round.get("sentMessage");
    round.set("sentMessage", statements.filter(x => x != null))
    player.stage.submit();
  }

  render() {

    const { game, round } = this.props;

    const receivedMessage = round.get("receivedMessage");
    const knowledgeBase = round.get("knowledgeBase");

    return (
      <div className="compose-message">
        <div className="flex-container">
            <div className="statement-checkboxes flex-child">
                <h1>Received Recipes</h1>
                <ul>
                    {receivedMessage.map((statement, i) => {
                    return (
                        <li key={i}>
                        {statement}
                        </li>
                    )
                    })}
                </ul>
            </div>
            <div className="statement-checkboxes flex-child">
                <h1>Discovered Recipes</h1>
                <ul>
                    {knowledgeBase.map((statement, i) => {
                    return (
                        <li key={i}>
                         {statement}
                        </li>
                    )
                    })}
                </ul>
            </div>
          </div>
        <div className="flex-container">
            <div className="compose-message flex-child">
              <h1>Compose a Message</h1>
              <ul>
                {
                  [...Array(game.treatment.channelCapacity).keys()].map(i => {
                    return (
                      <li key={i}>
                        <StatementMaker updateFn={this.makeStatementUpdater(i)} />
                      </li>
                    )
                  })
                }
              </ul>
            </div>
        </div>
        <div className="send-button-container">
          <Button
            className="send-button"
            primary
            handleClick = {this.submit.bind(this)}
          >Submit</Button>
        </div>
      </div>
    )
  }
}
