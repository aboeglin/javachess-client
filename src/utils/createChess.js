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
  reject,
} from "ramda";
import { box } from "./fp";

// Move in other file
const ErrorCode = {
  MOVE_NOT_ALLOWED: "MOVE_NOT_ALLOWED",
  NOT_YOUR_TURN: "NOT_YOUR_TURN",
  PLAYER_NOT_IN_GAME: "PLAYER_NOT_IN_GAME",
  GAME_ALREADY_FULL: "GAME_ALREADY_FULL",
  GAME_NOT_FOUND: "GAME_NOT_FOUND",
  NO_ERROR: "NO_ERROR",
};

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
      pathOr([], ["game", "activePlayer", "color"]),
    ]),
    ([pieces, possibleMoves, selection, activePlayerColor]) =>
      update({
        pieces,
        possibleMoves,
        selection,
        activePlayerColor,
      })
  )(message)
);

const gameToPlayerColor = curry((userName, game) =>
  pipe(
    box,
    ap([propOr({}, "player1"), propOr({}, "player2")]),
    find(propEq("id", userName)),
    prop("color")
  )(game)
);

const handleGameReadyReceived = curry(
  (update, userName, message) =>
    console.log("READY", message) ||
    pipe(
      parseBody,
      box,
      ap([
        pathOr([], ["game", "pieces"]),
        pipe(propOr({}, "game"), gameToPlayerColor(userName)),
        pathOr([], ["game", "activePlayer", "color"]),
      ]),
      ([pieces, playerColor, activePlayerColor]) =>
        update({
          pieces,
          playerColor,
          activePlayerColor,
          running: true,
        })
    )(message)
);

const handleError = curry((update, message) =>
  pipe(
    parseBody,
    box,
    ap([propOr(false, "error"), propOr(false, "errorCode")]),
    ([error, errorCode]) => update({ error, errorCode })
  )(message)
);

const createChess = () => {
  const endpoint =
    process.env.GATSBY_SOCKET_ENDPOINT || "http://localhost:8080/ws";

  // ws.debug = null; // Remove debug messages for socket communication

  let observers = [];
  let gameId = null;
  let socket = null;
  let ws = null;
  let socketActive = false;

  let state = {
    running: false,
    pieces: [],
    possibleMoves: [],
    selection: null,
    playerColor: null,
    activePlayerColor: "WHITE",
    error: false,
    errorCode: ErrorCode.NO_ERROR,
    userName:
      typeof window !== "undefined" ? localStorage.getItem("userName") : null,
  };

  const startGame = (id) => {
    gameId = id;

    let connected = false;
    let intervalId = null;

    const startConnection = () => {
      socket = new SockJS(endpoint);
      ws = Stomp.over(socket);
      ws.connect(
        {},
        () => {
          socketActive = true;
          connected = true;
          ws.subscribe(
            `/queue/game/${gameId}/ready`,
            handleGameReadyReceived(updateState, state.userName)
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
            JSON.stringify({ playerId: state.userName })
          );

          ws.subscribe("/user/queue/errors", handleError(updateState));
        },
        () => {
          ws.disconnect();
          connected = false;
          socketActive = false;
          clearInterval(intervalId);
          intervalId = setInterval(() => {
            if (!connected) {
              startConnection();
            }
          }, 5000);
        }
      );
    };

    if (socketActive) {
      socketActive = false;
      ws.disconnect(startConnection);
    } else {
      startConnection();
    }
  };

  const pieceSelected = (piece) => {
    updateState({ selection: piece });
    ws.send(
      `/app/game/${gameId}/select-piece`,
      {},
      JSON.stringify({ playerId: state.userName, x: piece.x, y: piece.y })
    );
  };

  const pieceMoved = (fromX, fromY, toX, toY) => {
    ws.send(
      `/app/game/${gameId}/perform-move`,
      {},
      JSON.stringify({ playerId: state.userName, fromX, fromY, toX, toY })
    );
  };

  const updateState = (newState) => {
    state = { ...state, ...newState };
    forEach((fn) => fn(state))(observers);
  };

  const userNameSet = (userName) => {
    if (typeof window !== "undefined") {
      if (!userName) {
        localStorage.removeItem("userName");
      } else {
        localStorage.setItem("userName", userName);
      }
    }
    updateState({ userName });
  };

  // Store array of handlers, otherwise only the last one can get notified from state changed
  const onStateChanged = (fn) => {
    observers = append(fn, observers);
    // unsubscribe cb
    return () => {
      observers = reject((x) => x === fn)(observers);
    };
  };

  const getState = () => state;

  return {
    onStateChanged,
    pieceSelected,
    pieceMoved,
    userNameSet,
    getState,
    startGame,
  };
};

export default createChess;
