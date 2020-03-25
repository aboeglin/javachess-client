import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {
  always,
  ap,
  append,
  curry,
  find,
  forEach,
  pathOr,
  pick,
  pipe,
  prop,
  propEq,
  propOr,
  reject
} from "ramda";
import { box } from "./fp";

const generateRandomUser = () =>
  Math.random()
    .toString(36)
    .substr(2, 5);

const HARDCODED_EMAIL = `${generateRandomUser()}@domain.tld`;

export const parseBody = pipe(propOr({}, "body"), JSON.parse);

export const handlePossibleMovesReceived = curry((update, message) =>
  pipe(parseBody, pick(["possibleMoves"]), update)(message)
);

export const handlePieceMovedReceived = curry((update, message) =>
  pipe(
    parseBody,
    box,
    ap([
      pathOr([], ["game", "pieces"]),
      always([]),
      always(null),
      pathOr([], ["game", "activePlayer", "color"])
    ]),
    ([pieces, possibleMoves, selection, activePlayerColor]) =>
      update({
        pieces,
        possibleMoves,
        selection,
        activePlayerColor
      })
  )(message)
);

const gameToPlayerColor = pipe(
  box,
  ap([propOr({}, "player1"), propOr({}, "player2")]),
  find(propEq("id", HARDCODED_EMAIL)),
  prop("color")
);

const handleGameReadyReceived = curry((update, message) =>
  pipe(
    parseBody,
    box,
    ap([
      pathOr([], ["game", "pieces"]),
      pipe(propOr({}, "game"), gameToPlayerColor),
      pathOr([], ["game", "activePlayer", "color"])
    ]),
    ([pieces, playerColor, activePlayerColor]) =>
      update({
        pieces,
        playerColor,
        activePlayerColor
      })
  )(message)
);

const createChess = () => {
  const endpoint = process.env.GATSBY_SOCKET_ENDPOINT || "http://localhost:8080/ws";
  const socket = new SockJS(endpoint);
  const ws = Stomp.over(socket);
  ws.debug = null; // Remove debug messages for socket communication

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
        handleGameReadyReceived(updateState)
      );

      ws.subscribe(
        `/queue/game/${gameId}/piece-moved`,
        handlePieceMovedReceived(updateState)
      );

      ws.subscribe(
        `/queue/game/${gameId}/possible-moves`,
        handlePossibleMovesReceived(updateState)
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
    console.log("OBSERVERS", observers.length);
    state = { ...state, ...newState };
    forEach(fn => fn(state))(observers);
  };

  // Store array of handlers, otherwise only the last one can get notified from state changed
  const onStateChanged = fn => {
    observers = append(fn, observers);
    fn(state); // Call the observer to give it initial state

    // unsubscribe cb
    return () => {
      observers = reject(x => x === fn)(observers);
    };
  };

  return {
    onStateChanged,
    pieceSelected,
    pieceMoved
  };
};

export default createChess;
