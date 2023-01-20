import React from "react";
import { shape_paths } from "../../constants.js";

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
    const { canAbstract } = this.props;

    const colorOptions = ["", "red", "green", "blue"];
    const shapeOptions = ["", "triangle", "square", "pentagon"];

    if (canAbstract) {
      colorOptions.push("any");
      shapeOptions.push("anything");
    }

    const xC = (xColor == "any") ? "grey" : xColor;
    const xS = (xShape == "anything") ? "blob" : xShape;
    const yC = (yColor == "any") ? "grey" : yColor;
    const yS = (yShape == "anything") ? "blob" : yShape;
    const zC = (zColor == "any") ? "grey" : zColor;
    const zS = (zShape == "anything") ? "blob" : zShape;

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
        {xC && xS && yC && yS && zC && zS ?
            <span>
                <svg viewBox="-100.0 -100.0 200 200">
                    <path
                    strokeWidth="0"
                    strokeLinejoin="mitre"
                    d={shape_paths[xS]}
                    style={{fill: xC}}
                    />
                </svg> {" + "}
                <svg viewBox="-100.0 -100.0 200 200">
                    <path
                    strokeWidth="0"
                    strokeLinejoin="mitre"
                    d={shape_paths[yS]}
                    style={{fill: yC}}
                    />
                </svg> {" -> "}
                <svg viewBox="-100.0 -100.0 200 200">
                    <path
                    strokeWidth="0"
                    strokeLinejoin="mitre"
                    d={shape_paths[zS]}
                    style={{fill: zC}}
                    />
                </svg>
            </span>
         : <span className="placeholder-span"/>}
      </div>
    )
  }
}
