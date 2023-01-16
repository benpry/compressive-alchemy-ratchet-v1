import React from "react";
import CraftingGame from "./CraftingGame.jsx";
import PassMessage from "./PassMessage.jsx";
import PostPractice from "./PostPractice.jsx";
import PostGameMessage from "./PostGameMessage.jsx";
import SelectStatements from "./SelectStatements.jsx";
import ComposeMessage from "./ComposeMessage.jsx";

export default class Round extends React.Component {
  render() {
    const { round, stage, player, game } = this.props;

    return (
      <div className="round">
        <div className="flex justify-center">
          {stage.name.slice(0,4) == "game" ? (
            <CraftingGame game={game} round={round} stage={stage} player={player} />
          ) : stage.name == "selectStatements" ? (
            <SelectStatements game={game} round={round} stage={stage} player={player} />
          ) : stage.name == "composeMessage" ? ( // change this
            <ComposeMessage game={game} round={round} stage={stage} player={player} />
          ) : stage.name == "postPractice" ? (
            <PostPractice game={game} round={round} stage={stage} player={player} />
          ) : stage.name == "postGame" ? (
            <PostGameMessage game={game} round={round} stage={stage} player={player} />
          ) : (
            <div>Unrecognized stage name.</div>
          )}
        </div>
      </div>
    );
  }
}
