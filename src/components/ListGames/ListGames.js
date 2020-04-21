import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { pathOr } from "ramda";

import { Table, TableHead, TD } from "./styled";

export const ListGames = ({ games }) => {
  return (
    <div>
      <h2>GAMES</h2>
      <Table>
        <TableHead>
          <tr>
            <TD>id</TD>
            <TD>player1</TD>
            <TD>player2</TD>
            <TD>state</TD>
            <TD></TD>
          </tr>
        </TableHead>
        <tbody>
          {games.map((g) => (
            <tr key={g.id}>
              <TD>{g.id}</TD>
              <TD>{pathOr("", ["player1", "id"])(g)}</TD>
              <TD>{pathOr("-", ["player2", "id"])(g)}</TD>
              <TD>{g.player1 && g.player2 ? "FULL" : "AVAILABLE"}</TD>
              <TD>{!g.player1 || (!g.player2 && <Link to={`/game/${g.id}`}>JOIN</Link>)}</TD>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

ListGames.propTypes = {
  games: PropTypes.array,
};

export default ListGames;
