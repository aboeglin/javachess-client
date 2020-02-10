import styled from "@emotion/styled";

const SQUARE_WIDTH = "12.5%";
const SQUARE_HEIGHT = "12.5%";

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
  background-color: ${props => (props.color === "WHITE" ? "white" : "#555")};
  position: relative;
  display: inline-block;
  width: ${SQUARE_WIDTH};
  height: ${SQUARE_HEIGHT};
  margin: 0;

  img {
    max-width: 100%;
  }
`;

export const PieceContainer = styled.div`
  color: red;
  align: middle;
`;
