import React from "react";
import { ValueBoard } from "../components/ValueBoard.jsx";
import { Inventory } from "../components/Inventory.jsx";
import { RecipeTable } from "../components/RecipeTable.jsx";
import { Button } from "../components/Button.jsx";
import { taskFns } from "../../constants.js";
import "./CraftingGame.css";

function renderNewLines(text) {
    return text.split("\n").map((line, index) => {
        return <p key={index}>{line}</p>
    });
}

export default class CraftingGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            responseMessage: "",
            cursorPos: 0,
            valueFn: function(x) { return 0; },
            recipeFn: function(x, y) { return null }
        };
    }

    setResponseMessage(message) {
        this.setState({responseMessage: message});
    }
    
    checkDone() {
        const { player, stage } = this.props;
        if (stage.get("bench").some(item => item != null)) {
            return
        }
        if (stage.get("inventory").every(item => item == 0)) {
            player.stage.submit();
        } 
    }

    scratchpadChange(e) {
        e.preventDefault();
        // remember the cursor position so it doesn't jump to the end 
        this.setState({cursorPos: e.target.selectionStart});
        const { round } = this.props;
        round.set("scratchpad", e.target.value);
    }

    updateLog(actionType, item) {
        
        const { stage, round } = this.props;

        const inventory = stage.get("inventory");
        const bench = stage.get("bench");
        const money = round.get("money");
        const log = stage.get("log");
        const newLog = log.slice();
        
        const newEntry = {
            time: new Date().toLocaleString(),
            action: actionType,
            item: item,
            newState: [inventory, bench, money]
        }
        newLog.push(newEntry);
        stage.set("log", newLog);
    }

    updateMoney() {
        const { stage, round } = this.props;
        const { valueFn } = this.state;

        const inventory = stage.get("inventory");
        const money = inventory.map((item) => {
            // number of items * value per item
            return item["n"] * valueFn(item);
        }).reduce((acc, curr) => acc + curr, 0);  // accumulate the sum

        round.set("money", money);
    }
    
    updateInventory(items, updateValues) {

        const { stage } = this.props;
        const inventory = stage.get("inventory");

        let newInventory = inventory.slice();
        // iterate over items
        items.map((item, i) => {
            const updateValue = updateValues[i];
            // first, check if the item will be new
            if (!inventory.some(x => x.color == item.color && x.shape == item.shape)) {
                // add the new inventory item
                if (updateValue > 0) {
                    newInventory.push({
                        n: updateValue,
                        shape: item.shape,
                        color: item.color
                    });
                }
            } else {
                // otherwise, change the n of an existing item
                newInventory.map(x => {
                    if (x.color == item.color && x.shape == item.shape) {
                        x["n"] = x["n"] + updateValue
                    }
                })
            }
        })
        newInventory = newInventory.filter(x => x["n"] > 0)
        stage.set("inventory", newInventory);
    }

    craft(item1, item2) {

        const { stage } = this.props;
        const { recipeFn } = this.state;
        const task = stage.get("task");

        if (item1 === null || item2 === null) {
            this.setResponseMessage("Both crafting slots must be filled.");
            return;
        }
        let output;
        if (recipeFn(item1, item2) !== null) {
            output = recipeFn(item1, item2)
        } else if (recipeFn(item2, item1) !== null) {
            output = recipeFn(item2, item1)
        } else {
            this.setResponseMessage("You failed to make anything, so the ingredients were wasted.")
            stage.set("bench", [null, null]);
            this.updateLog("craft", null)
            this.checkDone();
            return
        }

        this.updateInventory([output], [1]);
        this.updateMoney();
        this.setResponseMessage(`You produced a ${output['color']} ${output['shape']}!`);
        stage.set("bench", [null, null]);
        this.updateLog("craft", output);
    }

    add(item, inventory) {
        const { stage } = this.props;
        // create a new bench
        const bench = stage.get("bench");
        const newBench = bench.slice();
        // update the first empty location in the bench
        if (newBench[0] === null) {
            newBench[0] = item;
            this.updateInventory([item], [-1]);
        } else if (newBench[1] === null) {
            newBench[1] = item;
            this.updateInventory([item], [-1]);
        }
        this.updateMoney();
        // update the bench
        stage.set("bench", newBench);
        this.updateLog("add", item);
    }

    remove(benchIdx) {

        const { stage } = this.props;
        const bench = stage.get("bench");

        if (bench[benchIdx] === null) {
            return
        }
        // re-add the item to the player's inventory
        const item = bench[benchIdx];
        this.updateInventory([item], [1]);
        // reset the bench
        const newBench = bench.slice();
        newBench[benchIdx] = null;
        this.updateMoney();
        stage.set("bench", newBench);
        this.updateLog("remove", benchIdx);
    }

    sell() {
        // sell all the resources and submit

        const { player, stage, round } = this.props;
        const { valueFn } = this.state;

        if (stage.get("bench").some(item => item != null)) {
            this.setResponseMessage("Please empty the bench before selling")
            return
        }

        // log the sell and submit the stage
        this.updateLog("sell", null);
        player.stage.submit();
    }

    componentDidMount() {
        const { stage } = this.props;
        const task = stage.get("task");
        this.updateMoney();
        this.updateLog("start", null);

        const fns = taskFns[task["_id"].toString()]

        this.setState({"valueFn": fns.valueFn});
        this.setState({"recipeFn": fns.recipeFn});

    }
    
    render() {
        const { round, stage } = this.props;
        const { responseMessage, cursorPos, valueFn, craftFn } = this.state;

        const task = stage.get("task");
        const bench = stage.get("bench");
        const money = round.get("money");
        const inventory = stage.get("inventory");
        const scratchpad = round.get("scratchpad");
        const receivedMessage = round.get("receivedMessage");

        return (
            <div className="crafting-game-container">
              <div className="value-board-container">
                <ValueBoard valueFn={valueFn} />
              </div>
                <div className="crafting-game w-fit max-w-game mt-4">
                    <RecipeTable bench={bench} craftFn={this.craft.bind(this)} removeFn={this.remove.bind(this)} />
                    <div className="response-message min-h-6">
                        {responseMessage}
                    </div>
                    <div className="money-counter">
                        Money: ϗ{money}
                    </div>
                  <div className="sell-wrapper">
                    <Button
                      className="sell-button"
                      handleClick={this.sell.bind(this)}
                      primary
                    >
                      Sell
                    </Button>
                  </div>
                  <Inventory items={inventory} addFn={this.add.bind(this)} valueFn={valueFn} />
                </div>
                <div className="scratchpad">
                    <h2>Scratchpad</h2>
                    <textarea
                        value={scratchpad}
                        onChange={this.scratchpadChange.bind(this)}
                        onFocus={(e) => e.target.selectionStart = cursorPos}
                    />
                </div>
                <div className="instructional-message">
                    <h2>Message</h2>
                    {renderNewLines(receivedMessage)}
                </div>
            </div>
        )
    }
}
