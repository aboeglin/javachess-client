import React from "react";
import { PropTypes } from "prop-types";
import {
  assoc,
  curry,
  findIndex,
  pipe,
  map,
  reverse,
  flatten,
  splitEvery,
  ifElse
} from "ramda";

import SquareContainer from "./SquareContainer";
import BOARD from "./board.json";
import withChess from "../../hoc/withChess";

const orderSquaresForDisplay = pipe(
  reverse,
  splitEvery(8),
  map(reverse),
  flatten
);

const extendWithHighlighted = curry((possibleMoves, square) =>
  pipe(
    ifElse(
      square =>
        findIndex(move => square.x === move.x && square.y === move.y)(
          possibleMoves
        ) > -1,
      assoc("highlighted", true),
      assoc("highlighted", false)
    )
  )(square)
);

export const Board = ({ squares, possibleMoves }) =>
  pipe(
    map(
      pipe(extendWithHighlighted(possibleMoves), square => (
        <SquareContainer key={`${square.x}${square.y}`} square={square} />
      ))
    ),
    orderSquaresForDisplay
  )(squares);

Board.propTypes = {
  squares: PropTypes.array,
  pieces: PropTypes.array,
  possibleMoves: PropTypes.array
};

Board.defaultProps = {
  squares: BOARD.squares,
  pieces: [],
  possibleMoves: []
};

export default withChess(Board);
