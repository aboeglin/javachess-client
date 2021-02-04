import { Board } from "./Board";
import { standardComponentTest } from "../../utils/testing";

standardComponentTest(Board, {
  possibleMoves: [{ x: "b", y: "3" }],
  pieces: [] // Add it back when figured a way to handle injection of chess provider
  // pieces: [{ type: "PAWN", color: "WHITE", x: "b", y: "2" }]
});
