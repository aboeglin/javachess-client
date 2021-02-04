import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { fork } from "fluture";

import CreateGame from "@components/CreateGame";
import ListGames from "@components/ListGames";
import Separator from "@components/Separator";

import withChess from "@hocs/withChess";
import { fetchGames } from "@utils/upstreams";

const handleLogOutClicked = (callback) => () => callback(null);

export const GameCenter = ({ userName, userNameSet }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
		fork(console.error)(setGames)(fetchGames());
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
