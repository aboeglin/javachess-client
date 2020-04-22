import React from "react";
import PropTypes from "prop-types";

import { fork } from "fluture";

import { Title } from "./styled";
import withChess from "@hocs/withChess";
import { createGame } from "@utils/upstreams";

const handleCreateGame = (callback, userName) => () => {
  fork(console.error)(callback)(createGame(userName));
};

export const CreateGame = ({ userName, onGameCreated }) => {
  return (
    <div>
      <Title>CREATE A NEW GAME</Title>
      <label htmlFor="userName">Create a game:</label>
      <button onClick={handleCreateGame(onGameCreated, userName)}>
        Create
      </button>
    </div>
  );
};

CreateGame.propTypes = {
  onGameCreated: PropTypes.func,
  userName: PropTypes.string,
};

export default withChess(CreateGame);
