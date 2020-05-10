import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { prop } from "ramda";

import CreateGame from "@components/CreateGame";
import ListGames from "@components/ListGames";
import Separator from "@components/Separator";

import withChess from "../../hoc/withChess";

const handleLogOutClicked = (callback) => () => callback(null);

const fetchGames = (callback) => {
  const endpoint =
    process.env.GATSBY_CHESS_SERVICE_ENDPOINT || "http://localhost:8080/";
  axios
    .get(`${endpoint}games`)
    .then(prop("data"))
    .then(callback);
};

export const GameCenter = ({ userName, userNameSet }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames(setGames);
  }, []);

  return (
    <div>
      <CreateGame onGameCreated={(g) => setGames([...games, g])} />
      <Separator />
      <ListGames games={games} />
      <Separator />
			{/* Move below to component */}
      <h2>INFO</h2>
			<div>username: <strong>{userName}</strong></div>
      <button onClick={handleLogOutClicked(userNameSet)}>Log out</button>
    </div>
  );
};

GameCenter.propTypes = {
  userNameSet: PropTypes.func,
  userName: PropTypes.string,
};

export default withChess(GameCenter);
