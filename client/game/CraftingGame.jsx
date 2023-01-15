import React from "react";
import { GoalDisplay } from "../components/GoalDisplay.jsx"
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
            recipeFn: function(x, y) { return null }
        };
    }

    setResponseMessage(message) {
        this.setState({responseMessage: message});
    }
    
    checkDone() {
        const { player, stage } = this.props;
        const goal = stage.get("goal");
        const inventory = stage.get("inventory")
        if (inventory.some(item => item["color"] == goal["color"] && item["shape"] == goal["shape"])) {
            stage.set("goalAchieved", true)
            this.setResponseMessage("Congratulations! You reached your goal!")
            setTimeout(player.stage.submit, 3000);
        } else if (inventory.length == 1) {
            stage.set("goalAchieved", false)
            this.setResponseMessage("You failed to reach the goal in this episode.")
            setTimeout(player.stage.submit, 3000);
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
        const log = stage.get("log");
        const newLog = log.slice();
        
        const newEntry = {
            time: new Date().toLocaleString(),
            action: actionType,
            item: item,
            newState: [inventory, bench]
        }
        newLog.push(newEntry);
        stage.set("log", newLog);
    }

    addToInventory(items, updateValues) {

        const { stage } = this.props;
        const inventory = stage.get("inventory");

        let newInventory = inventory.slice();
        // iterate over items
        items.map((item, i) => {
            const updateValue = updateValues[i];
            // first, check if the item will be new
            for (let i = 0; i < updateValue; i++) {
                newInventory.push({
                    shape: item.shape,
                    color: item.color
                });
            }
        })
        stage.set("inventory", newInventory)
    }

    removeFromInventory(itemIdxs) {

        const { stage } = this.props;
        const inventory = stage.get("inventory");

        let newInventory = inventory.slice();
        // iterate over items
        newInventory = newInventory.filter((x, i) => !itemIdxs.includes(i));
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
        const output = recipeFn(item1, item2);

        this.addToInventory([output], [1]);
        this.setResponseMessage(`You produced a ${output['color']} ${output['shape']}!`);
        stage.set("bench", [null, null]);
        this.updateLog("craft", output);
        this.checkDone()
    }

    add(itemIdx) {
        const { stage } = this.props;
        const inventory = stage.get("inventory");
        // create a new bench
        const bench = stage.get("bench");
        const newBench = bench.slice();
        // update the first empty location in the bench
        if (newBench[0] === null) {
            newBench[0] = inventory[itemIdx];
            this.removeFromInventory([itemIdx]);
        } else if (newBench[1] === null) {
            newBench[1] = inventory[itemIdx];
            this.removeFromInventory([itemIdx]);
        }
        // update the bench
        stage.set("bench", newBench);
        this.updateLog("add", inventory[itemIdx]);
    }

    remove(benchIdx) {

        const { stage } = this.props;
        const bench = stage.get("bench");

        if (bench[benchIdx] === null) {
            return
        }
        // re-add the item to the player's inventory
        const item = bench[benchIdx];
        this.addToInventory([item], [1]);
        // reset the bench
        const newBench = bench.slice();
        newBench[benchIdx] = null;
        stage.set("bench", newBench);
        this.updateLog("remove", benchIdx);
    }

    componentDidMount() {
        const { stage } = this.props;
        const task = stage.get("task");
        this.updateLog("start", null);

        const fns = taskFns[task["_id"].toString()]

        this.setState({"recipeFn": fns.recipeFn});

    }
    
    render() {
        const { round, stage } = this.props;
        const { responseMessage, cursorPos, craftFn } = this.state;

        const task = stage.get("task");
        const bench = stage.get("bench");
        const goal = stage.get("goal");
        const inventory = stage.get("inventory");
        const scratchpad = round.get("scratchpad");
        const receivedMessage = round.get("receivedMessage");

        return (
            <div className="crafting-game-container">
              <GoalDisplay goalItem={goal}/>
                <div className="crafting-game w-fit max-w-game mt-4">
                    <RecipeTable bench={bench} craftFn={this.craft.bind(this)} removeFn={this.remove.bind(this)} />
                    <div className="response-message min-h-6">
                        {responseMessage}
                    </div>
                  <Inventory items={inventory} addFn={this.add.bind(this)} />
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
