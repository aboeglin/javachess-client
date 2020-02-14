import {
  parseBody,
  handlePossibleMovesReceived,
  handlePieceMovedReceived
} from "./createChess";

test("parseBody", () => {
  const JSON = { body: `{\"field\": \"value\"}` };
  const expected = { field: "value" };
  const actual = parseBody(JSON);

  expect(expected).toEqual(actual);
});

test("handlePossibleMovesReceived", done => {
  const JSON = { body: `{\"possibleMoves\": [{\"x\": \"a\", \"y\": \"3\"}]}` };
  const expected = { possibleMoves: [{ x: "a", y: "3" }] };
  const update = actual => {
    expect(expected).toEqual(actual);
    done();
  };

  handlePossibleMovesReceived(update, JSON);
});

test("handlePieceMovedReceived", done => {
  const JSON = {
    body: `{\"game\": {\"board\": {\"pieces\": []}, \"activePlayer\": {\"color\": \"WHITE\"}}}`
  };
  const expected = {
    pieces: [],
    activePlayerColor: "WHITE",
    possibleMoves: [],
    selection: null
  };
  const update = actual => {
    expect(expected).toEqual(actual);
    done();
  };

  handlePieceMovedReceived(update, JSON);
});
