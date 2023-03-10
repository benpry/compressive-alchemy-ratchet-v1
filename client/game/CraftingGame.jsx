import React from "react";
import { GoalDisplay } from "../components/GoalDisplay.jsx"
import { Inventory } from "../components/Inventory.jsx";
import { RecipeTable } from "../components/RecipeTable.jsx";
import { KnowledgeBase } from "../components/KnowledgeBase.jsx";
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
            recipeFn: function(x, y) { return null },
            done: false
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
            this.setState({done: true})
            setTimeout(player.stage.submit, 3000);
        } else if (inventory.length == 1) {
            stage.set("goalAchieved", false)
            this.setResponseMessage("You failed to reach the goal in this episode.")
            this.setState({done: true})
            setTimeout(player.stage.submit, 3000);
            this.setState({done: true})
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
        
        const { stage, round, game } = this.props;
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

    updateKnowledgeBase(x, y, z) {
        const { round } = this.props

        const knowledgeBase = round.get("knowledgeBase");
        const knowledgeStr = `${x["color"]} ${x["shape"]} + ${y["color"]} ${y["shape"]} -> ${z["color"]} ${z["shape"]}`
        if (!knowledgeBase.includes(knowledgeStr)) {
            knowledgeBase.push(knowledgeStr);
            round.set("knowledgeBase", knowledgeBase);
        }
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
        stage.set("inventory", newInventory);
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

        const { done } = this.state;
        if (done) {
            return
        }

        const { stage, round } = this.props;
        const { recipeFn } = this.state;

        if (item1 === null || item2 === null) {
            this.setResponseMessage("Both crafting slots must be filled.");
            return;
        }
        const output = recipeFn(item1, item2);

        this.addToInventory([output], [1]);
        this.setResponseMessage(`You produced a ${output['color']} ${output['shape']}!`);
        stage.set("bench", [null, null]);
        this.updateLog("craft", output);
        this.updateKnowledgeBase(item1, item2, output);
        this.checkDone()
    }

    add(itemIdx) {

        const { done } = this.state;
        if (done) {
            return
        }

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
        const { round } = this.props;
        const taskId = round.get("taskId");
        this.updateLog("start", null);

        const fns = taskFns[taskId.toString()]

        this.setState({"recipeFn": fns.recipeFn});

    }
    
    render() {
        const { game, round, stage } = this.props;
        const { responseMessage, cursorPos, craftFn } = this.state;

        const bench = stage.get("bench");
        const goal = stage.get("goal");
        const inventory = stage.get("inventory");
        const scratchpad = round.get("scratchpad");
        const receivedMessage = round.get("receivedMessage");
        const knowledgeBase = round.get("knowledgeBase");
        const achieved = stage.get("goalAchieved");
        const responseMessageClass = achieved == null ? "" :
              achieved == true ? "success-message" : "failure-message"

        return (
            <div className="crafting-game-container">
                <GoalDisplay goalItem={goal}/>
                <div className="crafting-game w-fit max-w-game mt-4">
                    <RecipeTable bench={bench} craftFn={this.craft.bind(this)} removeFn={this.remove.bind(this)} />
                    <div className={`response-message ${responseMessageClass} min-h-6`}>
                        {responseMessage}
                    </div>
                    <Inventory items={inventory} addFn={this.add.bind(this)} />
                </div>
                <div className="discovered-knowledge">
                    <h2>Discovered Recipes</h2>
                    <KnowledgeBase statements={knowledgeBase}/>
                </div>
                <div className="instructional-message">
                    <h2>Message</h2>
                    {game.treatment.passMessages ?
                        <KnowledgeBase statements={receivedMessage}/>
                     : null}
                </div>
            </div>
        )
    }
}
