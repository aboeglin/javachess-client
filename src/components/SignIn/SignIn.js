import React, { useState } from "react";
import PropTypes from "prop-types"


import { curry, path, pipe } from "ramda";

import withChess from "@hocs/withChess";

const handleUserNameChanged = curry((setValue, event) =>
  pipe(path(["target", "value"]), setValue)(event)
);

const handleUserNameSubmitted = (userName, callback) => () =>
  callback(userName);

export const SignIn = ({ userNameSet }) => {
  const [userName, setUserName] = useState("");

  return (
    <div>
      <label htmlFor="userName">Username</label>
      <input
        onChange={handleUserNameChanged(setUserName)}
        id="userName"
        type="text"
        placeholder="User name"
      />
      <button onClick={handleUserNameSubmitted(userName, userNameSet)}>
        Ok
      </button>
    </div>
  );
};

SignIn.propTypes = {
	userNameSet: PropTypes.func,
};

export default withChess(SignIn);
