import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { find, pathOr, prop, propEq } from "ramda";

import { Container } from "./styled";

import Board from "./Board";
import Info from "./Info";

import withChess from "@hocs/withChess";

const fetchGames = (callback) => {
  const endpoint =
    process.env.GATSBY_CHESS_SERVICE_ENDPOINT || "http://localhost:8080";
  axios
    .get(`${endpoint}/games`)
    .then(prop("data"))
    .then(callback);
};

const joinGame = (gameId, userName, callback) => {
  const endpoint =
    process.env.GATSBY_CHESS_SERVICE_ENDPOINT || "http://localhost:8080";
  axios
    .patch(`${endpoint}/games/${gameId}`, { userId: userName })
    .then(prop("data"))
    .then(callback);
};

export const ChessGame = ({ startGame, userName }) => {
  const id = parseInt(useParams().id, 10);
  const [games, setGames] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    fetchGames(setGames);
  }, []);

  const currentGame = find(propEq("id", id))(games);

  useEffect(() => {
    const player1Id = pathOr(null, ["player1", "id"])(currentGame);
		const player2Id = pathOr(null, ["player2", "id"])(currentGame);
		
    const shouldJoin =
      userName !== player1Id && userName !== player2Id && currentGame;
    if (shouldJoin) {
      joinGame(id, userName, () => setJoined(true));
    } else {
      setJoined(true);
    }
  }, [games]);

  useEffect(() => {
		console.log("joined", joined);
		console.log("gameId", id);
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
