import Empirica from "meteor/empirica:core";
import "./bots.js";
import "./callbacks.js";
import { ChainCollection } from "./ChainCollection";
import { tasks } from "../constants.js";

// like Python's range() function
function range(start, stop) {
  const size = stop - start;
  return [...Array(size).keys()].map(i => i + start);
}

// Fisher-Yates shuffle algorithm
function fyShuffle(arr) {
  let i = arr.length;
  while (--i > 0) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }
  return arr;
}

// a function to create a function to create a new chain
const createTaskChain = (taskId, canAbstract) => {
  const createChain = (chainIdx) => {
    ChainCollection.insert({
      taskId: taskId,
      idx: chainIdx,
      canAbstract: canAbstract,
      messageHistory: [],
      nCompletions: 0,
      busy: false
    });
  };
  return createChain;
};

// publish the chains
Meteor.publish("chains", function publishChains() {
  return ChainCollection.find({})
});

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit(game => {

  // shuffle the tasks if specified
  let finalTasks = tasks;
  if (game.treatment.shuffleTasks) {
    finalTasks = fyShuffle(finalTasks);
  }

  // if we have fewer than the specified number of chains, create enough
  const nChains = game.treatment.nChains;
  const canAbstract = game.treatment.canAbstract;
  finalTasks.forEach(task => {
    const currentNChains = ChainCollection.find({ taskId: task._id, canAbstract: canAbstract }).count();
    if (currentNChains < nChains ) {
      range(currentNChains, nChains).forEach(createTaskChain(task._id, canAbstract));
    }
  });

  // create the practice round
  const practiceRound = game.addRound();
  practiceRound.set("taskId", -1);
  practiceRound.addStage({
    name: "game",
    displayName: "Practice Round",
    durationInSeconds: 9999999
  });
  practiceRound.addStage({
    name: "postPractice",
    displayName: "Done Practice",
    durationInSeconds: 9999999
  });

  // create the rounds of the game
  finalTasks.forEach(task => {
    const round = game.addRound();
    round.set("taskId", task._id);
    for (let i = 0; i < game.treatment.nEpisodes; i++) {
      round.addStage({
        name: `game${i}`,
        displayName: `Episode ${i+1}`,
        durationInSeconds: 9999999
      });
    }
    if (game.treatment.passMessages) {
        round.addStage({
          name: "composeMessage",
          displayName: "Send a Message",
          durationInSeconds: 9999999
        });
    }
    round.addStage({
      name: "postGame",
      displayName: "Done",
      durationInSeconds: 9999999
    });
  });
});
