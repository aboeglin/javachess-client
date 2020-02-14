import React from "react";

import { Container } from "./styled";
import Board from "./Board";
import Info from "./Info";
import ChessContext from "../../hooks/chess-context";
import createChess from "../../utils/createChess";

const chessStore = createChess();

export const ChessGame = () => (
  <ChessContext.Provider value={chessStore}>
    <Info />
    <Container>
      <Board />
    </Container>
  </ChessContext.Provider>
);

export default ChessGame;
