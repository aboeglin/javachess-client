import F from "fluture";
import axios from "axios";
import { curry } from "ramda";

export const post = curry((url, body) =>
  F((bad, good) => {
    axios
      .post(url, body)
      .then(good)
      .catch(bad);

    // Cancelation function
    return () => {};
  })
);

export const patch = curry((url, body) =>
  F((bad, good) => {
    axios
      .patch(url, body)
      .then(good)
      .catch(bad);

    // Cancelation function
    return () => {};
  })
);

export const get = (url) =>
  F((bad, good) => {
    axios
      .get(url)
      .then(good)
      .catch(bad);

    // Cancelation function
    return () => {};
  });
