import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "../components/Button.jsx";

export default class SelectStatements extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selected: [] }
  }

  toggleChecked(idx) {
    const { game } = this.props;
    const { selected } = this.state;
    if (selected.includes(idx)) {
      // uncheck
      this.setState({ selected: selected.filter(x => x != idx) });
    } else {
      // check
      if (selected.length < (game.treatment.channelCapacity || 3)) {
        this.setState({selected: selected.concat([idx])});
      }
    }
  }

  submit(event) {
    // compile the message
    event.preventDefault()
    const { selected } = this.state;
    const { player, round } = this.props;
    const receivedMessage = round.get("receivedMessage");
    const knowledgeBase = round.get("knowledgeBase");
    const statements = [];
    selected.forEach(i => {
      if (i < receivedMessage.length) {
        statements.push(receivedMessage[i]);
      } else {
        statements.push(knowledgeBase[i - receivedMessage.length]);
      }
    });
    round.set("sentMessage", statements);
    player.stage.submit();
  }

  render() {
    const { round, game } = this.props;
    const { selected } = this.state;

    const receivedMessage = round.get("receivedMessage");
    const knowledgeBase = round.get("knowledgeBase");
    const channelCapacity = game.treatment.channelCapacity;

    return (
      <div className="select-statements">

        <div className="message-passing-instruction">
            Select up to {channelCapacity} statements to pass to the next participant:
        </div>

        <div className="flex-container">
        <div className="statement-checkboxes flex-child">
          <h1>Received Recipes</h1>
          <ul>
            {receivedMessage.map((statement, i) => {
              return (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={selected.includes(i)}
                    onChange={e => this.toggleChecked(i)}
                  />
                  {" "} {statement}
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
                  <input
                    type="checkbox"
                    checked={selected.includes(i + receivedMessage.length)}
                    onChange={e => this.toggleChecked(i + receivedMessage.length)}
                  />
                  {" "} {statement}
                </li>
              )
            })}
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
