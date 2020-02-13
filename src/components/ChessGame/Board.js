import React from "react";
import { PropTypes } from "prop-types";
import {
  always,
  curry,
  pipe,
  map,
  reverse,
  flatten,
  find,
  splitEvery,
  ifElse,
  identity
} from "ramda";
import { Square, SquareLabel } from "./styled";
import Piece from "./Piece";
import BOARD from "./board.json";
import withChess from "../../hoc/withChess";

// Move to separate file
const SquareContainer = ({ square, piece }) => (
  <Square
    color={square.color}
    x={square.x}
    y={square.y}
    key={`${square.x}${square.y}`}
  >
    <SquareLabel color={square.color}>
      {square.x}
      {square.y}
    </SquareLabel>
    {piece}
  </Square>
);

SquareContainer.propTypes = {
  square: PropTypes.object,
  piece: PropTypes.object
};

const orderSquaresForDisplay = pipe(
  reverse,
  splitEvery(8),
  map(reverse),
  flatten
);

const addPiece = curry((pieces, square) => ({
  square,
  piece: pieces.length ? getPieceAtSquare(square, pieces) : null
}));

const Board = ({ squares, pieces }) =>
  pipe(
    map(addPiece(pieces)),
    map(SquareContainer),
    orderSquaresForDisplay
  )(squares);

const getPieceAtSquare = curry((square, pieces) =>
  pipe(
    find(({ x, y }) => x === square.x && y === square.y),
    ifElse(identity, piece => <Piece {...piece} />, always(null))
  )(pieces)
);

Board.propTypes = {
  squares: PropTypes.array,
  pieces: PropTypes.array
};

Board.defaultProps = {
  squares: BOARD.squares,
  pieces: []
};

export default withChess(Board);
