import { Piece } from "./Piece";
import { standardComponentTest } from "../../utils/testing";

standardComponentTest(Piece, {
  piece: { type: "PAWN", color: "WHITE", x: "a", y: "4" },
  pieceSelected: { type: "PAWN", color: "WHITE", x: "b", y: "4" }
});
