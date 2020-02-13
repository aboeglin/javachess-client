import React from "react";

import { Site } from "@components/Site";
import ChessGame from "../components/ChessGame/ChessGame";

const IndexPage = ({ ...other }) => (
  <Site {...other}>
    <ChessGame />
  </Site>
);

export default IndexPage;
