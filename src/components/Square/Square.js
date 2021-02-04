import React from "react";
import { PropTypes } from "prop-types";
import { curry, find, pipe, propOr } from "ramda";

import Piece from "@components/Piece";
import withChess from "@hocs/withChess";

import { Container, Label } from "./styled";

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

export const Square = ({
  square,
  pieces,
  pieceMoved,
  selection,
  activePlayerColor,
}) =>
  pipe(getPieceAtSquare(pieces), (piece) => (
    <Container
      color={square.color}
      x={square.x}
      y={square.y}
      key={`${square.x}${square.y}`}
      highlighted={square.highlighted}
      selected={isSelected(selection, square)}
      selectionColor={activePlayerColor}
      onClick={handleClick(pieceMoved, selection, piece, square)}
    >
      <Label color={square.color}>
        {square.x}
        {square.y}
      </Label>
      {piece && <Piece piece={piece} />}
    </Container>
  ))(square);

Square.propTypes = {
  square: PropTypes.object,
  pieces: PropTypes.array,
};

Square.defaultProps = {
  pieces: [],
};

export default withChess(Square);
