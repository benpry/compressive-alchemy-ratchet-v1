import React from "react";
import { Button } from "./Button"
import { shape_paths } from "../../constants.js"

export class Inventory extends React.Component {

    render() {

        const { items, addFn, valueFn, names } = this.props;

        return (
            <div className="inventory text-center">
                <h1 className="text-2xl mb-2">Inventory</h1>
                <ul className="inline-block">
                    {items.map((item, index) => {
                        return (
                            <li
                                className="border-opacity-20 border-solid rounded-md border-2 border-gray-500/50 mb-2"
                                key={index}
                            >
                            {`${item["color"]} ${item["shape"]}`} <br/>
                            {item["n"]}, ϗ{valueFn(item)} <br/>
                            <Button handleClick={() => addFn(item)} primary>add</Button>
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
