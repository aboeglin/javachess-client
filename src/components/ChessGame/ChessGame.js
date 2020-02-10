import React from "react";

import { Container } from "./styled";
import Board from "./Board";
import withChess from "../../hoc/withChess";

export const ChessGame = ({ pieces }) => (
  <Container>
    <Board pieces={pieces} />
  </Container>
);

export default withChess(ChessGame);
