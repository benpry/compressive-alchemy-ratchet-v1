import React from "react"
import { Centered } from "meteor/empirica:core";
import { Button } from "../components/Button.jsx";
import { StatementMaker } from "../components/StatementMaker.jsx";
import { KnowledgeBase } from "../components/KnowledgeBase.jsx";

export default class ComposeMessage extends React.Component {

  constructor(props) {
    super(props)
  }

  makeStatementUpdater(i) {
    const statementUpdater = (newStatement) => {
      const { round } = this.props;

      const statements = round.get("sentMessage");
      statements[i] = newStatement;
      round.set("sentMessage", statements);
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
    const sentMessage = round.get("sentMessage");
    const knowledgeBase = round.get("knowledgeBase");
    const canAbstract = game.treatment.canAbstract;

    return (
      <div className="compose-message">
        <div className="flex-container">
            <div className="statement-checkboxes flex-child">
                <h1>Received Recipes</h1>
                <KnowledgeBase statements={receivedMessage}/>
            </div>
            <div className="statement-checkboxes flex-child">
                <h1>Discovered Recipes</h1>
                <KnowledgeBase statements={knowledgeBase}/>
            </div>
          </div>
        <div className="flex-container">
            <div className="compose-message flex-child">
              <h1>Compose a Message</h1>
              <p>
                <strong>Remember</strong>: half of your bonus will come from the performance of the person who receives this message.
                Review the knowledge above and think about the {game.treatment.channelCapacity} statements you can send
                that would be most useful to the next person.
              </p>
              <ul>
                {
                  [...Array(game.treatment.channelCapacity).keys()].map(i => {
                    return (
                      <li key={i}>
                        <StatementMaker
                          canAbstract={canAbstract}
                          statement={sentMessage[i]}
                          updateFn={this.makeStatementUpdater(i)}
                        />
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
