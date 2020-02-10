import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { once, pipe, prop } from "ramda";

const getWS = once(() => {
  const socket = new SockJS("http://localhost:8080/ws");
  const ws = Stomp.over(socket);
  return ws;
});

const withChess = Component => {
  const Chess = props => {
    // do logic
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
      const ws = getWS();
      ws.connect({}, () => {
        ws.subscribe("/user/queue/lfg/ack", frame => {
          const gameId = pipe(prop("body"), JSON.parse, prop("gameId"))(frame);
          ws.subscribe(
            `/queue/game/${gameId}/ready`,
            pipe(prop("body"), body =>
              setPieces(JSON.parse(body).game.board.pieces)
            )
          );

          ws.send(
            `/app/game/${gameId}/join`,
            {},
            JSON.stringify({ email: props.email })
          );
        });

        ws.subscribe("/user/queue/errors", frame => {
          console.error(frame.body);
        });

        ws.send("/app/lfg", {}, JSON.stringify({ email: props.email }));
      });
    }, [props.email]);

    return <Component {...props} pieces={pieces} />;
  };

  return Chess;
};

export default withChess;
