import React from "react";
const R = require("ramda");
const SHOW_ERRORS = process.env.SHOW_JEST_ERRORS || true;

global.console = R.map(x => (SHOW_ERRORS ? x : jest.fn()))({
  log: console.log,
  warn: console.warn,
  error: console.error
});

// jest.mock("./src/hoc/xyz", () => () => Component => props => (
//   <Component {...props} />
// ));
