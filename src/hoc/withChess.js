import React, { useState, useEffect, useContext } from "react";

import ChessContext from "../hooks/chess-context";

const withChess = Component => {
  const Chess = props => {
    const [state, setState] = useState({
      pieces: [],
      possibleMoves: []
    });
    const chess = useContext(ChessContext);

    console.log("HOC", state);

    useEffect(() => {
      chess.onStateChanged(setState);
    }, []);

    return (
      <Component
        {...props}
        pieces={state.pieces}
        possibleMoves={state.possibleMoves}
        pieceSelected={chess.pieceSelected}
      />
    );
  };

  return Chess;
};

export default withChess;
