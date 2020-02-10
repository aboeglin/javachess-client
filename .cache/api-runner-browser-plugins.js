module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"defaultLayouts":{"pages":"/Users/arnaudboeglin/Projects/01_Code/javachess-client/src/templates/Page/index.js"}},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
