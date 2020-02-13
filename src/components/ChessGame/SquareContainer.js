import React from "react";
import { PropTypes } from "prop-types";
import { curry, find, pipe } from "ramda";

import Piece from "./Piece";
import { Square, SquareLabel } from "./styled";
import withChess from "../../hoc/withChess";

const getPieceAtSquare = curry((pieces, square) =>
  find(({ x, y }) => x === square.x && y === square.y, pieces)
);

export const SquareContainer = ({ square, pieces, pieceMoved, selection }) =>
  pipe(getPieceAtSquare(pieces), piece => (
    <Square
      color={square.color}
      x={square.x}
      y={square.y}
      key={`${square.x}${square.y}`}
      highlighted={square.highlighted}
      onClick={() => {
        if (
          selection &&
          (selection.x !== square.x || selection.y !== square.y)
        ) {
          if (!piece || piece.color !== selection.color) {
            pieceMoved(selection.x, selection.y, square.x, square.y);
          }
        }
      }}
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
