import React from "react";

function renderNewLines(text) {
  return text.split("\n").map((line, index) => {
      return <p key={index}>{line}</p>
  });
}

export default class PassMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  componentDidMount = () => {
    const { round } = this.props;
    const initMessage = round.get("sentMessage");
    console.log(`Initializing message to ${message}`);
    this.setState({ message: initMessage });
  }

  handleChange = event => {
    event.preventDefault();
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { player, round } = this.props;
    round.set("sentMessage", this.state.message);
    player.stage.submit();
  };

  render() {
    const { round } = this.props;
    const { message } = this.state;

    const receivedMessage = round.get("receivedMessage");

    return (
      <div className="pass-message">
        <div className="instruction-message">
          Now, you can send a message to the next participant who tries this task to help them do as well as possible.<br/>
          Remember that you will receive a bonus based on the next player's performance.<br/>
          The next person will only be able to see your message, not the message you saw at the beginning of the task.<br/>
        </div>
        <div className="writing-interface">
          {receivedMessage && receivedMessage.length > 0 ? 
              <div className="received-message-reminder">
                <p><strong>The message you received was:</strong></p>
                {renderNewLines(receivedMessage)}
              </div>
            : null }
          <form onSubmit={this.handleSubmit}>
            <div>
              <textarea
                id="message"
                type="text"
                dir="auto"
                name="message"
                value={message}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
