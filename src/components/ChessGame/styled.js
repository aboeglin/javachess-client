import styled from "@emotion/styled";

const SQUARE_WIDTH = "12.5%";
const SQUARE_HEIGHT = "12.5%";

const WHITE = "#f2efeb";
const BLACK = "#331c13";

export const Container = styled.div`
  width: 640px;
  height: 640px;
  background-color: blue;
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

  background-color: ${props => (props.color === "WHITE" ? WHITE : BLACK)};
  box-shadow: inset 0px 0px 26px 5px rgba(0, 0, 0, 0.2);
`;

export const SquareLabel = styled.div`
  color: ${props => (props.color === "WHITE" ? BLACK : WHITE)};
  opacity: 0.3;
  margin-left: 5px;
  margin-top: 5px;
`;

export const PieceContainer = styled.div`
  height: 100%;

  img {
    height: ${props => {
      switch (props.type) {
        case "QUEEN":
        case "KING":
        case "BISHOP":
        case "ROOK":
        case "KNIGHT":
          return "65px";
        default:
          return "55px";
      }
    }};
    position: absolute;
    display: block;
    bottom: 5px;
    left: 50%;
    transform: ${props => {
      console.log(props);
      switch (props.x) {
        case "a":
        case "b":
        case "c":
        case "d":
          return "translateX(-50%) scaleX(-1)";
        default:
          return "translateX(-50%)";
      }
    }};
  }
`;
