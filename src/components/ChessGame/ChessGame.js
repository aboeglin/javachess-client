import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { find, pathOr, propEq } from "ramda";
import { fork } from "fluture";

import { Container } from "./styled";

import Board from "@components/Board";
import Info from "./Info";

import { fetchGames, joinGame } from "@utils/upstreams";
import withChess from "@hocs/withChess";

export const ChessGame = ({ startGame, userName }) => {
  const id = parseInt(useParams().id, 10);
  const [games, setGames] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    fork(console.error)(setGames)(fetchGames());
  }, []);

  const currentGame = find(propEq("id", id))(games);

  useEffect(() => {
    const player1Id = pathOr(null, ["player1", "id"])(currentGame);
		const player2Id = pathOr(null, ["player2", "id"])(currentGame);
		
    const shouldJoin =
      userName !== player1Id && userName !== player2Id && currentGame;
    if (shouldJoin) {
      fork(console.error)(() => setJoined(true))(joinGame(userName, id));
    } else {
      setJoined(true);
    }
  }, [games]);

  useEffect(() => {
    if (joined) {
			startGame(id);
    }
  }, [joined]);

  if (!currentGame) {
    return <div>Getting game data ...</div>;
  } else if (!joined) {
    return <div>Joining game ...</div>;
  } else {
    return (
      <>
        <Info />
        <Container>
          <Board />
        </Container>
      </>
    );
  }
};

export default withChess(ChessGame);
