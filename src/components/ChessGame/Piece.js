import React from "react";

import { pipe } from "ramda";

import { PieceContainer } from "./styled";

import BLACK_PAWN_IMAGE_URL from "./images/pawn-black.png";
import BLACK_BISHOP_IMAGE_URL from "./images/bishop-black.png";
import BLACK_KNIGHT_IMAGE_URL from "./images/knight-black.png";
import BLACK_ROOK_IMAGE_URL from "./images/rook-black.png";
import BLACK_QUEEN_IMAGE_URL from "./images/queen-black.png";
import BLACK_KING_IMAGE_URL from "./images/king-black.png";
import WHITE_PAWN_IMAGE_URL from "./images/pawn-white.png";
import WHITE_BISHOP_IMAGE_URL from "./images/bishop-white.png";
import WHITE_KNIGHT_IMAGE_URL from "./images/knight-white.png";
import WHITE_ROOK_IMAGE_URL from "./images/rook-white.png";
import WHITE_QUEEN_IMAGE_URL from "./images/queen-white.png";
import WHITE_KING_IMAGE_URL from "./images/king-white.png";

const getImageUrl = (type, color) =>
  ({
    BLACK_PAWN: BLACK_PAWN_IMAGE_URL,
    BLACK_BISHOP: BLACK_BISHOP_IMAGE_URL,
    BLACK_KNIGHT: BLACK_KNIGHT_IMAGE_URL,
    BLACK_ROOK: BLACK_ROOK_IMAGE_URL,
    BLACK_QUEEN: BLACK_QUEEN_IMAGE_URL,
    BLACK_KING: BLACK_KING_IMAGE_URL,
    WHITE_PAWN: WHITE_PAWN_IMAGE_URL,
    WHITE_BISHOP: WHITE_BISHOP_IMAGE_URL,
    WHITE_KNIGHT: WHITE_KNIGHT_IMAGE_URL,
    WHITE_ROOK: WHITE_ROOK_IMAGE_URL,
    WHITE_QUEEN: WHITE_QUEEN_IMAGE_URL,
    WHITE_KING: WHITE_KING_IMAGE_URL
  }[`${color}_${type}`]);

const Piece = props =>
  pipe(
    ({ type, color }) => getImageUrl(type, color),
    url => (
      <PieceContainer>
        <img src={url} />
      </PieceContainer>
    )
  )(props);

export default Piece;
