module.exports = {
  scripts: {
    build: {
      modernizr: "modernizr -c modernizr.config.json -d static",
      script: "nps build.modernizr build.gatsby",
      gatsby: "gatsby build",
      storybook:
        "cross-env NODE_ENV=production build-storybook -c .storybook -o public/docs"
    },
    clean: "rimraf ./.cache ./public",
    start: {
      description: "Run gatsby locally",
      script: "gatsby develop",
      storybook:
        "cross-env NODE_ENV=production start-storybook -p 9000 -c .storybook"
    },
    lint: {
      script: 'nps "lint.eslint src"',
      eslint: "eslint --fix"
    },
    test: {
      script: `SHOW_JEST_ERRORS=false jest --coverage --verbose --silent`,
      unit: {
        script: `SHOW_JEST_ERRORS=true  jest --coverage --verbose`,
        js: `SHOW_JEST_ERRORS=false jest --coverage --verbose`,
        watch: `SHOW_JEST_ERRORS=true jest --coverage --verbose --watchAll`
      }
    },
    serve: "gatsby serve"
  }
};
