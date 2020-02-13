const { fromPairs, map, pathOr, pipe, toPairs } = require("ramda");

const gatsbyConfig = require("./gatsby-config");

const gatsbyConfigAliases = pipe(
  pathOr([], ["plugins", 1, "options", "alias"]),
  toPairs,
  map(([k, v]) => ["^" + k + "/" + "(.*)$", "<rootDir>/" + v + "/$1"]),
  fromPairs
)(gatsbyConfig);

module.exports = {
  displayName: "test",
  transform: {
    "^.+\\.js?$": `<rootDir>/jest-preprocess.js`
  },
  moduleNameMapper: Object.assign(
    {},
    {
      "^./pages.json$": "<rootDir>/__mocks__/pages.json",
      ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
      ".+\\.svg$": `<rootDir>/__mocks__/svg-mock.js`
    },
    gatsbyConfigAliases
  ),
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  coveragePathIgnorePatterns: [`index\.js`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/jest-global.js"]
};
