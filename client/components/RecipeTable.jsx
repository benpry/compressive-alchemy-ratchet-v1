import React from "react";
import { Button } from "./Button";

export class RecipeTable extends React.Component {

    render() {
        
        const { bench, craftFn, removeFn } = this.props;

        return (
            <div className="text-center">
                <h1 className="text-2xl mb-2">Crafting Bench</h1>
                <ul className="inline-block">
                    {bench.map((item, index) => {
                        if (item === null) {
                            return (
                                <li
                                  className="border-opacity-20 border-solid rounded-md border-2 border-gray-500/50 h-32 w-32"
                                  key={index}
                                >
                                    {" "}<br/>
                                </li>
                            )
                        } else {
                            return (
                                <li className="border-opacity-20 border-solid rounded-md border-2 border-gray-500/50 h-32 w-32"
                                    key={index}
                                    style={{backgroundColor: item["color"]}}
                                >
                                  {`${item["color"]} ${item["shape"]}`} <br/>
                                    <Button handleClick={() => removeFn(index)} primary>remove</Button>
                                </li>
                            )    
                        }
                    })}
                </ul>
                <div className="text-center mt-4">
                    <Button handleClick={() => craftFn(bench[0], bench[1])}>Craft</Button>
                </div>
            </div>
        )
    }
}
