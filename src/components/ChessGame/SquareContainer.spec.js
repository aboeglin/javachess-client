import { SquareContainer } from "./SquareContainer";
import { standardComponentTest } from "../../utils/testing";

standardComponentTest(SquareContainer, {
  pieces: [],
  square: { color: "WHITE", x: "b", y: "3", highlighted: false }
});

standardComponentTest(SquareContainer, {
  selection: { x: "a", y: "2", color: "WHITE" },
  pieces: [{ x: "a", y: "3", type: "PAWN", color: "WHITE" }],
  square: { color: "WHITE", x: "a", y: "3", highlighted: false }
});
