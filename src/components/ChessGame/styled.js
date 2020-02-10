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
  box-shadow: inset 0px 0px 26px 5px rgba(0, 0, 0, 0.4);

  img {
    // width: 40px;
    height: 60px;
    position: absolute;
    display: block;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const PieceContainer = styled.div`
  height: 100%;
`;
