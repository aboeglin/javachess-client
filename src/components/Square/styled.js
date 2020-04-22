import styled from "styled-components";

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

export const Label = styled.div`
  color: ${props => (props.color === "WHITE" ? LABEL_WHITE : LABEL_BLACK)};
  opacity: 0.3;
  margin-left: 5px;
  margin-top: 5px;
`;
