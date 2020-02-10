const R = require("ramda");
const SockJS = require("sockjs-client");
const Stomp = require("stompjs");

const socket = new SockJS("http://localhost:8080/ws");
const ws = Stomp.over(socket);

const readline = require("readline");

// const WebSocket = require("ws");
// const Stomp = require("stompjs");

// const socket = new WebSocket("ws://localhost:8080/ws");
// const ws = Stomp.over(socket);

const INVALID_SESSION = "OUPS";

/**
 * @param {StompClient} s The client to retrieve the session from
 * @returns {String} The found session id.
 */
const getSessionId = R.pipe(
  R.pathOr(INVALID_SESSION, ["ws", "_transport", "url"]),
  x => console.log(x) || x,
  R.replace("ws://localhost:8080/ws/", ""),
  R.replace("/websocket", ""),
  R.replace(/^[0-9]+\//, "")
);

ws.connect({}, x => {
  console.log(x);
  console.log("connected");

  ws.subscribe("/user/queue/lfg/ack", frame => {
    const gameId = R.pipe(R.prop("body"), JSON.parse, R.prop("gameId"))(frame);
    console.log(gameId);
    ws.subscribe(
      `/queue/game/${gameId}/ready`,
      R.pipe(R.prop("body"), console.log)
    );

    ws.send(
      `/app/game/${gameId}/join`,
      {},
      JSON.stringify({ email: "test@email.com" })
    );
  });

  ws.subscribe("/user/queue/errors", frame => {
    console.log(frame.body);
  });

  ws.send("/app/lfg", {}, JSON.stringify({ email: "test@email.com" }));
});

// setInterval(() => {}, 2000);
