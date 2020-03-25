import styled from "@emotion/styled";

const SQUARE_WIDTH = "12.5%";
const SQUARE_HEIGHT = "12.5%";

const WHITE = "#fff";
const BLACK = "#eee";

const LABEL_WHITE = "#ccc";
const LABEL_BLACK = "#bbb";

const HIGHLIGHTED_WHITE_WHITE = "#eff";
const HIGHLIGHTED_WHITE_BLACK = "#eef";

const HIGHLIGHTED_BLACK_WHITE = "#dee";
const HIGHLIGHTED_BLACK_BLACK = "#dde";

export const Container = styled.div`
  width: 640px;
  height: 640px;
  position: relative;
  margin: auto;

  h2 {
    margin: 0;
  }
`;

export const Square = styled.div`
  position: relative;
  display: inline-block;
  width: ${SQUARE_WIDTH};
  height: ${SQUARE_HEIGHT};
  margin: 0;

  cursor: ${props => (props.highlighted ? "pointer" : "initial")};

  background-color: ${props => {
    if (props.highlighted) {
      if (props.color === "WHITE") {
        return props.selectionColor === "WHITE"
          ? HIGHLIGHTED_WHITE_WHITE
          : HIGHLIGHTED_WHITE_BLACK;
      } else {
        return props.selectionColor === "WHITE"
          ? HIGHLIGHTED_BLACK_WHITE
          : HIGHLIGHTED_BLACK_BLACK;
      }
    }
    return props.color === "WHITE" ? WHITE : BLACK;
  }};
  box-shadow: ${props =>
    props.selected ? "0px 0px 16.4px 0.7px rgba(0,0,0,0.15)" : "initial"};
  z-index: ${props => (props.selected ? 100 : 0)};
`;

export const SquareLabel = styled.div`
  color: ${props => (props.color === "WHITE" ? LABEL_WHITE : LABEL_BLACK)};
  opacity: 0.3;
  margin-left: 5px;
  margin-top: 5px;
`;

export const PieceContainer = styled.div`
  height: 100%;

  img {
    cursor: pointer;
    height: 44px;
    position: absolute;
    display: block;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
