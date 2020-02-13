import React, { useState, useEffect, useContext } from "react";

import ChessContext from "../hooks/chess-context";

const withChess = Component => {
  const Chess = props => {
    const [state, setState] = useState({
      pieces: [],
      possibleMoves: []
    });
    const chess = useContext(ChessContext);

    useEffect(() => {
      chess.onStateChanged(setState);
    }, []);

    return <Component {...props} pieces={state.pieces} />;
  };

  return Chess;
};

export default withChess;
