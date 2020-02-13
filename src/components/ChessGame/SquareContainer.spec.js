import { SquareContainer } from "./SquareContainer";
import { standardComponentTest } from "../../utils/testing";

standardComponentTest(SquareContainer, {
  pieces: [],
  square: { color: "WHITE", x: "b", y: "3", highlighted: false }
});
