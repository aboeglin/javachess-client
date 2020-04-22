import React from "react";

import { always, ifElse, isNil, pipe, prop } from "ramda";

import { Site } from "@components/Site";
import SignIn from "@components/SignIn";
import RouterConfig from "@components/RouterConfig";

import ChessContext from "@hooks/chess-context";
import createChess from "@utils/createChess";
import withChess from "@hocs/withChess";

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

const Main = (props) =>
  pipe(
    prop("userName"),
    ifElse(isNil, always(<SignIn />), always(<RouterConfig />))
  )(props);


const Body = withChess(Main);

export default IndexPage;
