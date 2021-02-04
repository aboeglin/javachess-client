import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChessGame from "@components/ChessGame";
import GameCenter from "@components/GameCenter";

export const RouterConfig = () => (
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
);

export default RouterConfig;
