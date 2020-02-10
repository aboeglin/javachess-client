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
import { Square } from "./styled";
import Piece from "./Piece";
import BOARD from "./board.json";

const makeSquareElement = ({ square, piece }) => (
  <Square
    color={square.color}
    x={square.x}
    y={square.y}
    key={`${square.x}${square.y}`}
  >
    {piece}
  </Square>
);

const Board = ({ squares, pieces }) =>
  pipe(
    map(square => ({
      square,
      piece: pieces.length ? getPieceAtSquare(square, pieces) : null
    })),
    map(makeSquareElement),
    reverse,
    splitEvery(8),
    map(reverse),
    flatten
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
  squares: BOARD.squares
};

export default Board;
