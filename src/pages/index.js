import React from "react";

import { Site } from "@components/Site";
import ChessGame from "../components/ChessGame/ChessGame";

const seo = {
  title: "Home"
};

const IndexPage = ({ ...other }) => (
  <Site seo={seo} {...other}>
    <ChessGame email={"some@email"} />
  </Site>
);

export default IndexPage;
