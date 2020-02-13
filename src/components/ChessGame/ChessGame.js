import React from "react";

import { Container } from "./styled";
import Board from "./Board";
import ChessContext from "../../hooks/chess-context";
import createChess from "../../utils/createChess";

const chessStore = createChess();

export const ChessGame = () => (
  <Container>
    <ChessContext.Provider value={chessStore}>
      <Board />
    </ChessContext.Provider>
  </Container>
);

export default ChessGame;
