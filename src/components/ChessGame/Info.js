import React from "react";
import { PropTypes } from "prop-types";

import withChess from "@hocs/withChess";

export const Info = ({ activePlayerColor, playerColor }) => (
  <div>
    <h2>You are {playerColor}</h2>
    <h2>Current turn: {activePlayerColor}</h2>
  </div>
);

Info.propTypes = {
  activePlayerColor: PropTypes.string,
  playerColor: PropTypes.string
};

export default withChess(Info);
