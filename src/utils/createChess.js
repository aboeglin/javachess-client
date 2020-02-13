import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { pipe, prop } from "ramda";

const HARDCODED_EMAIL = "user@domain.tld";

const createChess = () => {
  const socket = new SockJS("http://localhost:8080/ws");
  const ws = Stomp.over(socket);

  let emitStateChanged = null;
  let gameId = null;

  let state = {
    pieces: [],
    possibleMoves: []
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
          updateState({ pieces: newPieces });
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

  const pieceSelected = (x, y) => {
    ws.send(
      `/app/game/${gameId}/select-piece`,
      JSON.stringify({ email: HARDCODED_EMAIL, x, y })
    );
  };

  const updateState = newState => {
    state = { ...state, ...newState };
    if (emitStateChanged) {
      emitStateChanged(state);
    }
  };

  const onStateChanged = fn => {
    console.log(state);
    emitStateChanged = fn;
    fn(state);
  };

  return {
    onStateChanged,
    pieceSelected
  };
};

export default createChess;
