import { SquareContainer, handleClick } from "./SquareContainer";
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

test("handleClick", done => {
  const square = {
    x: "b",
    y: "4"
  };

  const selection = {
    x: "b",
    y: "2",
    color: "WHITE"
  };

  const piece = null;

  const pieceMoved = (...args) => {
    expect(args).toEqual(["b", "2", "b", "4"]);
    done();
  };

  const event = {};

  handleClick(pieceMoved, selection, piece, square)(event);
});

test("handleClick should not be called when there is no selection", () => {
  const square = {
    x: "b",
    y: "4"
  };

  const selection = null;

  const piece = null;

  const pieceMoved = jest.fn();

  const event = {};
  handleClick(pieceMoved, selection, piece, square)(event);
  expect(pieceMoved).not.toHaveBeenCalled();
});

test("handleClick should not be called when the selection and the piece at destination have the same color", () => {
  const square = {
    x: "b",
    y: "4"
  };

  const selection = {
    x: "b",
    y: "2",
    color: "WHITE"
  };

  const piece = {
    color: "WHITE"
  };

  const pieceMoved = jest.fn();

  const event = {};
  handleClick(pieceMoved, selection, piece, square)(event);
  expect(pieceMoved).not.toHaveBeenCalled();
});

test("handleClick should not be called if the square is where the selected piece is", () => {
  const square = {
    x: "b",
    y: "2"
  };

  const selection = {
    x: "b",
    y: "2",
    color: "WHITE"
  };

  const piece = {
    x: "b",
    y: "2",
    color: "WHITE"
  };

  const pieceMoved = jest.fn();

  const event = {};
  handleClick(pieceMoved, selection, piece, square)(event);
  expect(pieceMoved).not.toHaveBeenCalled();
});
