import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { ap, append, find, forEach, pipe, prop, propEq } from "ramda";

const generateRandomUser = () =>
  Math.random()
    .toString(36)
    .substr(2, 5);

const HARDCODED_EMAIL = `${generateRandomUser()}@domain.tld`;

const gameToPlayerColor = pipe(
  x => [x],
  ap([prop("player1"), prop("player2")]),
  find(propEq("id", HARDCODED_EMAIL)),
  prop("color")
);

const createChess = () => {
  const socket = new SockJS("http://localhost:8080/ws");
  const ws = Stomp.over(socket);

  ws.debug = null;

  let observers = [];
  let gameId = null;

  let state = {
    pieces: [],
    possibleMoves: [],
    selection: null,
    playerColor: null,
    activePlayerColor: "WHITE"
  };

  ws.connect({}, () => {
    ws.subscribe("/user/queue/lfg/ack", frame => {
      gameId = pipe(prop("body"), JSON.parse, prop("gameId"))(frame);

      ws.subscribe(
        `/queue/game/${gameId}/ready`,
        pipe(prop("body"), body => {
          const parsedBody = JSON.parse(body);

          updateState({
            pieces: parsedBody.game.board.pieces,
            playerColor: gameToPlayerColor(parsedBody.game),
            activePlayerColor: parsedBody.game.activePlayer.color
          });
        })
      );

      ws.subscribe(
        `/queue/game/${gameId}/piece-moved`,
        pipe(prop("body"), body => {
          const parsedBody = JSON.parse(body);

          // If move successful
          updateState({
            pieces: parsedBody.game.board.pieces,
            possibleMoves: [],
            selection: null,
            activePlayerColor: parsedBody.game.activePlayer.color
          });
          // Else API should return MoveError and we should keep the possible moves
        })
      );

      ws.subscribe(
        `/queue/game/${gameId}/possible-moves`,
        pipe(prop("body"), body => {
          const possibleMoves = JSON.parse(body).possibleMoves;
          updateState({ possibleMoves: possibleMoves });
        })
      );

      ws.send(
        `/app/game/${gameId}/join`,
        {},
        JSON.stringify({ email: HARDCODED_EMAIL })
      );
    });

    ws.subscribe("/user/queue/errors", frame => {
      console.error(frame.body);
    });

    ws.send("/app/lfg", {}, JSON.stringify({ email: HARDCODED_EMAIL }));
  });

  const pieceSelected = piece => {
    updateState({ selection: piece });
    ws.send(
      `/app/game/${gameId}/select-piece`,
      {},
      JSON.stringify({ email: HARDCODED_EMAIL, x: piece.x, y: piece.y })
    );
  };

  const pieceMoved = (fromX, fromY, toX, toY) => {
    ws.send(
      `/app/game/${gameId}/perform-move`,
      {},
      JSON.stringify({ email: HARDCODED_EMAIL, fromX, fromY, toX, toY })
    );
  };

  const updateState = newState => {
    state = { ...state, ...newState };
    forEach(fn => fn(state))(observers);
    console.log(state);
  };

  // Store array of handlers, otherwise only the last one can get notified from state changed
  const onStateChanged = fn => {
    observers = append(fn, observers);
    fn(state);
  };

  return {
    onStateChanged,
    pieceSelected,
    pieceMoved
  };
};

export default createChess;
