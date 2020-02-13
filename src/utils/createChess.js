import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { pipe, prop, append, forEach } from "ramda";

const HARDCODED_EMAIL = "user@domain.tld";

const createChess = () => {
  const socket = new SockJS("http://localhost:8080/ws");
  const ws = Stomp.over(socket);

  ws.debug = null;

  let observers = [];
  let gameId = null;

  let state = {
    pieces: [],
    possibleMoves: [],
    selection: null
  };

  ws.connect({}, () => {
    ws.subscribe("/user/queue/lfg/ack", frame => {
      gameId = pipe(prop("body"), JSON.parse, prop("gameId"))(frame);
      ws.subscribe(
        `/queue/game/${gameId}/ready`,
        pipe(prop("body"), body => {
          const newPieces = JSON.parse(body).game.board.pieces;
          updateState({ pieces: newPieces });
        })
      );

      ws.subscribe(
        `/queue/game/${gameId}/piece-moved`,
        pipe(prop("body"), body => {
          const newPieces = JSON.parse(body).game.board.pieces;

          // If move successful
          updateState({
            pieces: newPieces,
            possibleMoves: [],
            selection: null
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
