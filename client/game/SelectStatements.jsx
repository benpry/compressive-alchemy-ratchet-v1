import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "../components/Button.jsx";
import { shape_paths } from "../../constants.js";

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
    event.preventDefault();
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

    const regex = /(\w+) (\w+) \+ (\w+) (\w+) -> (\w+) (\w+)/;

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

                        const result = regex.exec(statement);
                        if (result != null) {
                            // read the relevant values from the regex
                            const xColor = result[1] == "any" ? "grey" : result[1];
                            const xShape = result[2] == "anything" ? "blob" : result[2];
                            const yColor = result[3] == "any" ? "grey" : result[3];
                            const yShape = result[4] == "anything" ? "blob" : result[4];
                            const zColor = result[5] == "any" ? "grey" : result[5];
                            const zShape = result[6] == "anything" ? "blob" : result[6];

                            return (
                                <li key={i}>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(i)}
                                    onChange={e => this.toggleChecked(i)}
                                />
                                {" "} {statement} <br/>
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
                                </li>
                            )
                        } else {
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
                        }})}
                </ul>
            </div>
            <div className="statement-checkboxes flex-child">
                <h1>Discovered Recipes</h1>
                <ul>
                    {knowledgeBase.map((statement, i) => {

                        const result = regex.exec(statement);
                        if (result != null) {
                            // read the relevant values from the regex
                            const xColor = result[1] == "any" ? "grey" : result[1];
                            const xShape = result[2] == "anything" ? "blob" : result[2];
                            const yColor = result[3] == "any" ? "grey" : result[3];
                            const yShape = result[4] == "anything" ? "blob" : result[4];
                            const zColor = result[5] == "any" ? "grey" : result[5];
                            const zShape = result[6] == "anything" ? "blob" : result[6];

                            return (
                                <li key={i}>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(i + receivedMessage.length)}
                                    onChange={e => this.toggleChecked(i + receivedMessage.length)}
                                />
                                {" "} {statement} <br/>
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
                                </li>
                            )
                        } else {
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
                    }})}
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
