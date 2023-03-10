import Empirica from "meteor/empirica:core";
import { tasks, practiceTask, practiceMessage, allItems } from "../constants.js";
// imports for dealing with chains
import { ChainCollection } from "./ChainCollection";

const setBusy = (currChain) => {
  ChainCollection.update(currChain._id, {
    $set: {
      busy: true
    }
  })
};

const updateMessageHistory = (taskId, canAbstract, chainIdx, message) => {
  // get the chain
  const chain = ChainCollection.findOne({ taskId: taskId, canAbstract: canAbstract, idx: chainIdx })
  // add the message to the message history
  chain.messageHistory.push(message)

  ChainCollection.update(chain._id, {
    $set: {
      messageHistory: chain.messageHistory
    }
  });
}

const completeChain = (taskId, canAbstract, chainIdx) => {
  // get the chain
  const chain = ChainCollection.findOne({ taskId: taskId, canAbstract: canAbstract, idx: chainIdx })
  ChainCollection.update(chain._id, {
    $set: {
      nCompletions: chain.nCompletions + 1,
      busy: false
    }
  });
}

const assignToChain = (round, treatment) => {
  const taskId = round.get("taskId");
  const taskChains = ChainCollection.find({ taskId: taskId, canAbstract: treatment.canAbstract, busy: false }, {sort: {nCompletions: 1}}).fetch();
  const minCompletions = Math.min(...taskChains.map(x => x.nCompletions));
  const minCompletionChains = taskChains.filter(x => x.nCompletions === minCompletions);
  const assignedChain = minCompletionChains[Math.floor(Math.random()*minCompletionChains.length)];
  setBusy(assignedChain);
  return assignedChain
}

// Fisher-Yates shuffle algorithm
function fyShuffle(originalArray) {
  const arr = originalArray.slice();
  let i = arr.length;
  while (--i > 0) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }
  return arr;
}

const getStartState = (items) => {
  const shuffledItems = fyShuffle(items);
  const startingInventory = shuffledItems.slice(0, 3);
  const goal = shuffledItems[3];
  // add three more random items from the starting inventory
  for (let i = 0; i < 3; i++) {
    startingInventory.push(shuffledItems[Math.floor(Math.random() * 3)]);
  }
  return [fyShuffle(startingInventory), goal];
}

// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart(game => {
  game.players.forEach(player => {
    player.set("totalBonus", 0)
  })
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  // assign the participant to a chain
  const taskId = round.get("taskId");
  if (taskId == -1) {
    // set up the practice round
    round.set("receivedMessage", practiceMessage)
  } else {
    // set up a main round
    if (game.treatment.passMessages) {
      const chain = assignToChain(round, game.treatment);
      round.set("chainIdx", chain["idx"]);
      round.set("chainPosition", chain["nCompletions"]);
      const receivedMessage = chain["messageHistory"].length > 0 ? chain["messageHistory"][chain["messageHistory"].length - 1] : [];
      round.set("receivedMessage", receivedMessage);
      const sentMessage = [...receivedMessage]
      // set up the sent message
      if (sentMessage.length < game.treatment.channelCapacity) {
        for (let i = sentMessage.length; i < game.treatment.channelCapacity; i++) {
          sentMessage.push(null)
        }
      }
      round.set("sentMessage", sentMessage);
    }
    round.set("canAbstract", game.treatment.canAbstract);
    round.set("bonus", 0);
    // initialize the sent message to the received message
  }
  round.set("knowledgeBase", []);
});

// onStageStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  if (stage.name.slice(0,4) == "game") {
    // set up the task based on the id
    const taskId = round.get("taskId");
    let startingInventory;
    let goal;
    if (taskId != -1) {
      stage.set("episodeNum", stage.name.slice(-1));
      [startingInventory, goal] = getStartState(allItems);
    } else {
      startingInventory = practiceTask["start"];
      goal = practiceTask["goal"];
    }
    stage.set("goal", goal);
    stage.set("inventory", startingInventory);
    stage.set("bench", [null, null]);
    stage.set("log", []);
  }
});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {
  if (stage.name.slice(0,4) == "game") {
    if (stage.get("goalAchieved")) {
      round.set("bonus", round.get("bonus") + game.treatment.goalBonus);
    }
  }
});

// onRoundEnd is triggered after each round.
// It receives the same options as onGameEnd, and the round that just ended.
Empirica.onRoundEnd((game, round) => {
  // update the chain with the passed message
  const chainIdx = round.get("chainIdx");
  const taskId = round.get("taskId");
  // if this isn't the practice round, update the chain
  if (taskId != -1 && game.treatment.passMessages) {
    updateMessageHistory(taskId, game.treatment.canAbstract, chainIdx, round.get("sentMessage"));
    completeChain(taskId, game.treatment.canAbstract, chainIdx);
    game.players.forEach(player => {
      player.set("totalBonus", player.get("totalBonus") + round.get("bonus"));
    });
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
