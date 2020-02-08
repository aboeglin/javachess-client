const R = require("ramda");
const SockJS = require("sockjs-client");
const Stomp = require("stompjs");

const socket = new SockJS("http://localhost:8080/ws");
const ws = Stomp.over(socket);

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
  R.replace("ws://localhost:8080/ws/", ""),
  R.replace("/websocket", ""),
  R.replace(/^[0-9]+\//, "")
);

ws.connect({}, x => {
  console.log(x);
  console.log("connected");

  const sessionId = getSessionId(ws);

  console.log(sessionId);

  ws.subscribe("/errors", function(message) {
    console.log("Error " + message.body);
  });

  ws.subscribe("/game-1", frame => {
    console.log(frame.body);
  });

  ws.subscribe("/connected", frame => {
    console.log(frame.body);
  });

  ws.subscribe(sessionId, R.pipe(R.prop("body"), console.log));
});

setInterval(() => {
  ws.send("/lfg", {}, JSON.stringify({ email: "test@email.com" }));
}, 2000);
