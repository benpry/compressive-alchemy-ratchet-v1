import React from "react";

import { Centered } from "meteor/empirica:core";

const Radio = ({ selected, name, value, label, onChange }) => (
  <label>
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={onChange}
    />
    {label}
  </label>
);

export default class ExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = { age: "", gender: "", strength: "", fair: "", feedback: "" };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { player } = this.props;
    const { age, gender, strength, fair, feedback, education } = this.state;

    const bonus = Math.round(player.get("totalBonus") / 100);

    return (
      <Centered>
        <div className="exit-survey">
          <h1> Exit Survey </h1>
          <p>
            Congratulations on completing the experiment. You earned an individual bonus of ${bonus}.
            Remember that this is <strong>in addition to</strong> the bonus you will earn from the next people who see
            your messages.
          </p>
          <br />
          <p>
            Please answer the following short survey. You do not have to provide
            any information you feel uncomfortable with.
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-line">
              <div>
                <label htmlFor="age">Age</label>
                <div>
                  <input
                    id="age"
                    type="number"
                    min="0"
                    max="150"
                    step="1"
                    dir="auto"
                    name="age"
                    value={age}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
                <div>
                  <input
                    id="gender"
                    type="text"
                    dir="auto"
                    name="gender"
                    value={gender}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div>
              <label>Highest Education Qualification</label>
              <div>
                <Radio
                  selected={education}
                  name="education"
                  value="high-school"
                  label="High School"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="bachelor"
                  label="US Bachelor's Degree"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="master"
                  label="Master's or higher"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="other"
                  label="Other"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-line thirds">
              <div>
                <label htmlFor="strength">
                  How would you describe your strength in the game?
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="strength"
                    name="strength"
                    value={strength}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="fair">Do you feel the pay was fair?</label>
                <div>
                  <textarea
                    dir="auto"
                    id="fair"
                    name="fair"
                    value={fair}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="feedback">
                  Feedback, including problems you encountered.
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="feedback"
                    name="feedback"
                    value={feedback}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </Centered>
    );
  }
}
