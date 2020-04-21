import React, { useState, useEffect, useContext } from "react";

import ChessContext from "../hooks/chess-context";

const withChess = (Component) => {
  const Chess = (props) => {
    const chess = useContext(ChessContext);

    const [state, setState] = useState(chess.getState());

    useEffect(() => {
      return chess.onStateChanged(setState);
    }, []);

    return (
      <Component
        {...props}
        pieces={state.pieces}
        selection={state.selection}
        possibleMoves={state.possibleMoves}
        playerColor={state.playerColor}
        activePlayerColor={state.activePlayerColor}
        userName={state.userName}
        pieceSelected={chess.pieceSelected}
        pieceMoved={chess.pieceMoved}
        userNameSet={chess.userNameSet}
        startGame={chess.startGame}
      />
    );
  };

  return Chess;
};

export default withChess;
