import { __, concat, curry, map, pipe, prop, toString } from "ramda";

import { get, patch, post } from "./http";

const ENDPOINT =
  process.env.GATSBY_CHESS_SERVICE_ENDPOINT || "http://localhost:8080";
const GET_GAMES_PATH = "/games";
const POST_GAMES_PATH = "/games";
const PATCH_GAMES_PATH = "/games";

export const fetchGamesWithGetAndEndpoint = curry((get, endpoint, path) =>
  pipe(concat(endpoint), get, map(prop("data")))(path)
);

export const fetchGames = () =>
  fetchGamesWithGetAndEndpoint(get, ENDPOINT, GET_GAMES_PATH);

export const createGameWithPostAndEndpoint = curry(
  (post, endpoint, path, userName) =>
    pipe(
      concat(endpoint),
      post(__, { userId: userName }),
      map(prop("data"))
    )(path)
);

export const createGame = createGameWithPostAndEndpoint(
  post,
  ENDPOINT,
  POST_GAMES_PATH
);

export const joinGameWithPatchAndEndpoint = curry(
  (patch, endpoint, path, userName, gameId) =>
    pipe(
			toString,
      concat("/"),
      concat(path),
      concat(endpoint),
      patch(__, { userId: userName }),
      map(prop("data"))
    )(gameId)
);

export const joinGame = joinGameWithPatchAndEndpoint(patch, ENDPOINT, PATCH_GAMES_PATH);
