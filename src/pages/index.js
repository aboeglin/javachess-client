import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Site } from "@components/Site";
import ChessGame from "@components/ChessGame";
import SignIn from "@components/SignIn";
import GameCenter from "@components/GameCenter";

import ChessContext from "../hooks/chess-context";
import createChess from "../utils/createChess";
import withChess from "../hoc/withChess";

const chessStore = createChess();

const IndexPage = ({ ...other }) => {
  return (
    <Site {...other}>
      <ChessContext.Provider value={chessStore}>
        <Body />
      </ChessContext.Provider>
    </Site>
  );
};

const Main = (props) => {
  const body = props.userName ? (
    <Router>
      <Switch>
        <Route path="/game/:id">
          <ChessGame />
        </Route>
        <Route path="/">
          <GameCenter />
        </Route>
      </Switch>
    </Router>
  ) : (
    <SignIn />
  );
  return body;
};

const Body = withChess(Main);

export default IndexPage;
