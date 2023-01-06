import Empirica from "meteor/empirica:core";
import { tasks, practiceTask, practiceInstructions } from "../constants.js";
// imports for dealing with chains
import { ChainCollection } from "./ChainCollection";

const setBusy = (currChain) => {
  ChainCollection.update(currChain._id, {
    $set: {
      busy: true
    }
  })
};

const updateMessageHistory = (taskId, chainIdx, message) => {
  // get the chain
  const chain = ChainCollection.findOne({ taskId: taskId, idx: chainIdx })
  // add the message to the message history
  chain.messageHistory.push(message)

  ChainCollection.update(chain._id, {
    $set: {
      messageHistory: chain.messageHistory
    }
  });
}

const completeChain = (taskId, chainIdx) => {
    // get the chain
    const chain = ChainCollection.findOne({ taskId: taskId, idx: chainIdx })
    ChainCollection.update(chain._id, {
      $set: {
        nCompletions: chain.nCompletions + 1,
        busy: false
      }
    });
}

const assignToChain = (round) => {
  const taskId = round.get("taskId");
  const taskChains = ChainCollection.find({ taskId: taskId, busy: false }, {sort: {nCompletions: 1}}).fetch();
  const minCompletions = Math.min(...taskChains.map(x => x.nCompletions));
  const minCompletionChains = taskChains.filter(x => x.nCompletions === minCompletions);
  const assignedChain = minCompletionChains[Math.floor(Math.random()*minCompletionChains.length)];
  setBusy(assignedChain);
  return assignedChain
}

// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart(game => {
  game.players.forEach(player => {
    player.set("bonus", 0);
  })
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  // assign the participant to a chain
  if (round.get("taskId") == -1) {
    // set up the practice round
    round.set("receivedMessage", practiceInstructions)
  } else {
    // set up a main round
    const chain = assignToChain(round);
    round.set("chainIdx", chain["idx"]);
    round.set("chainPosition", chain["nCompletions"]);
    const receivedMessage = chain["messageHistory"].length > 0 ? chain["messageHistory"][chain["messageHistory"].length - 1] : "";
    round.set("receivedMessage", receivedMessage);  
  }
});

// onStageStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  if (stage.name == "game") {
    // set up the task based on the id
    const taskId = round.get("taskId");
    let task;
    if (taskId == -1) {
      task = practiceTask;
    } else {
      task = tasks.filter(x => x._id === taskId)[0];
    }
    stage.set("task", task);
    stage.set("inventory", task["start"]);
    stage.set("bench", [null, null]);
    round.set("money", 0);
    stage.set("log", []);
    round.set("scratchpad", "");
  } else if (stage.name == "passMessage") {
    round.set("sentMessage", round.get("scratchpad"));
  }
});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {});

// onRoundEnd is triggered after each round.
// It receives the same options as onGameEnd, and the round that just ended.
Empirica.onRoundEnd((game, round) => {
  // update the chain with the passed message
  const chainIdx = round.get("chainIdx");
  const taskId = round.get("taskId");
  // if this isn't the practice round, update the chain
  if (taskId != -1) {
    game.players.forEach(player => {
      player.set("bonus", player.get("bonus") + round.get("money") / game.treatment.conversionRate);
    })
    updateMessageHistory(taskId, chainIdx, round.get("sentMessage"));
    completeChain(taskId, chainIdx);  
  } 
});

// onGameEnd is triggered when the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd(game => {});

// ===========================================================================
// => onSet, onAppend and onChange ==========================================
// ===========================================================================

// onSet, onAppend and onChange are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.
//
// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.
//
// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.

// // onSet is called when the experiment code call the .set() method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onSet((
//   game,
//   round,
//   stage,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // // Example filtering
//   // if (key !== "value") {
//   //   return;
//   // }
// });

// // onAppend is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend((
//   game,
//   round,
//   stage,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//   //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
// });

// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange((
//   game,
//   round,
//   stage,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue, // Previous value
//   isAppend // True if the change was an append, false if it was a set
// ) => {
//   // `onChange` is useful to run server-side logic for any user interaction.
//   // Note the extra isAppend boolean that will allow to differenciate sets and
//   // appends.
//    Game.set("lastChangeAt", new Date().toString())
// });

// // onSubmit is called when the player submits a stage.
// Empirica.onSubmit((
//   game,
//   round,
//   stage,
//   player // Player who submitted
// ) => {
// });
