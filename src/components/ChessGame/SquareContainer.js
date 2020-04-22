import React from "react";
import { PropTypes } from "prop-types";
import { curry, find, pipe, propOr } from "ramda";

import Piece from "./Piece";
import { Square, SquareLabel } from "./styled";
import withChess from "@hocs/withChess";

const getPieceAtSquare = curry((pieces, square) =>
  find(({ x, y }) => x === square.x && y === square.y)(pieces)
);

const isSelected = curry(
  (selection, square) =>
    square.x === propOr(false, "x", selection) &&
    square.y === propOr(false, "y", selection)
);

export const handleClick = curry(
  (piecedMoved, selection, piece, square) => () => {
    if (selection && (!piece || selection.color !== piece.color))
      piecedMoved(selection.x, selection.y, square.x, square.y);
  }
);

export const SquareContainer = ({
  square,
  pieces,
  pieceMoved,
  selection,
  activePlayerColor
}) =>
  pipe(getPieceAtSquare(pieces), piece => (
    <Square
      color={square.color}
      x={square.x}
      y={square.y}
      key={`${square.x}${square.y}`}
      highlighted={square.highlighted}
      selected={isSelected(selection, square)}
      selectionColor={activePlayerColor}
      onClick={handleClick(pieceMoved, selection, piece, square)}
    >
      <SquareLabel color={square.color}>
        {square.x}
        {square.y}
      </SquareLabel>
      {piece && <Piece piece={piece} />}
    </Square>
  ))(square);

SquareContainer.propTypes = {
  square: PropTypes.object,
  pieces: PropTypes.array
};

export default withChess(SquareContainer);
