import React from "react"

const colorOptions = ["", "red", "green", "blue", "any"];
const shapeOptions = ["", "triangle", "square", "pentagon", "anything"];

export class StatementMaker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "xColor": "",
      "xShape": "",
      "yColor": "",
      "yShape": "",
      "zColor": "",
      "zShape": ""
    };
  }

  updateCallback() {
    const { xColor, xShape,
            yColor, yShape,
            zColor, zShape
          } = this.state;
    const { updateFn } = this.props;

    if (xColor && xShape && yColor && yShape && zColor && zShape) {
      const newStatement = `${xColor} ${xShape} + ${yColor} ${yShape} -> ${zColor} ${zShape}`;
      updateFn(newStatement);
    }
  }

  render() {

    const {
      xColor, xShape,
      yColor, yShape,
      zColor, zShape
    } = this.state;

    return (
      <div className="statement-maker">
        <select value={xColor} onChange={e => this.setState({xColor: e.target.value}, this.updateCallback.bind(this))}>
          {colorOptions.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <select value={xShape} onChange={e => this.setState({xShape: e.target.value}, this.updateCallback.bind(this))}>
          {shapeOptions.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        {" + "}
        <select value={yColor} onChange={e => this.setState({yColor: e.target.value}, this.updateCallback.bind(this))}>
          {colorOptions.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <select value={yShape} onChange={e => this.setState({yShape: e.target.value}, this.updateCallback.bind(this))}>
          {shapeOptions.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        {" -> "}
        <select value={zColor} onChange={e => this.setState({zColor: e.target.value}, this.updateCallback.bind(this))}>
          {colorOptions.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <select value={zShape} onChange={e => this.setState({zShape: e.target.value}, this.updateCallback.bind(this))}>
          {shapeOptions.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </div>
    )
  }
}
