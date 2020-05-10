import React from "react";
import PropTypes from "prop-types";

import axios from "axios";
import { prop } from "ramda";

import { Title } from "./styled";
import withChess from "../../hoc/withChess";

const handleCreateGame = (callback, userName) => () => {
  const endpoint =
    process.env.GATSBY_CHESS_SERVICE_ENDPOINT || "http://localhost:8080";
  axios
    .post(`${endpoint}/games`, { userId: userName })
    .then(prop("data"))
    .then(callback);
};

export const CreateGame = ({ userName, onGameCreated }) => {
  return (
    <div>
      <Title>CREATE A NEW GAME</Title>
      <label htmlFor="userName">Create a game:</label>
      <button
        onClick={handleCreateGame((x) => {
          onGameCreated(x);
        }, userName)}
      >
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
