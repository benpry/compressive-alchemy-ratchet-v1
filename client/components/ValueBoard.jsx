import React from "react"
import { shape_paths, all_items } from "../../constants.js"

export class ValueBoard extends React.Component {

  render() {
    const { valueFn } = this.props;

    return (
      <div className="value-board text-center">
        <ul className="inline-block">
            {all_items.map((item, index) => {
                return (
                <li
                    className="border-opacity-20 border-solid rounded-md border-2 border-gray-500/50 mb-2"
                    key={index}
                >
                    {`${item["color"]} ${item["shape"]}`} <br/>
                    ϗ{valueFn(item)}
                    <svg viewBox="-100.0 -100.0 200 200">
                        <path
                            strokeWidth="0"
                            strokeLinejoin="mitre"
                            d={shape_paths[item["shape"]]}
                            style={{fill: item["color"]}}
                        />
                    </svg>
                </li>
                )
            })}
        </ul>
      </div>
    )
  }

}
