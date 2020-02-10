const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/arnaudboeglin/Projects/01_Code/javachess-client/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/arnaudboeglin/Projects/01_Code/javachess-client/src/pages/index.js"))),
  "component---src-pages-markdown-mdx": hot(preferDefault(require("/Users/arnaudboeglin/Projects/01_Code/javachess-client/src/pages/markdown.mdx")))
}

