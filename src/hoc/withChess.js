import React, { useState, useEffect, useContext } from "react";

import ChessContext from "../hooks/chess-context";

const withChess = Component => {
  const Chess = props => {
    const [state, setState] = useState({
      pieces: [],
      possibleMoves: [],
      selection: null
    });
    const chess = useContext(ChessContext);

    useEffect(() => {
      chess.onStateChanged(setState);
    }, []);

    return (
      <Component
        {...props}
        pieces={state.pieces}
        selection={state.selection}
        possibleMoves={state.possibleMoves}
        pieceSelected={chess.pieceSelected}
        pieceMoved={chess.pieceMoved}
      />
    );
  };

  return Chess;
};

export default withChess;
