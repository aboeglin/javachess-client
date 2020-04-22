module.exports = {
  siteMetadata: {
    name: "chess game",
    basepath: "/",
    description: "A chess game app",
    keywords: ["gatsby", "gatsbyjs", "gatsby starter", "github"],
    type: "website",
    image: "",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@root": ".",
          "@src": "src",
          "@styles": "src/styles",
          "@assets": "src/assets",
          "@components": "src/components",
          "@hocs": "src/hocs",
          "@hooks": "src/hooks",
          "@pages": "src/pages",
          "@templates": "src/templates",
          "@services": "src/services",
          "@utils": "src/utils",
        },
        extensions: ["js", "mdx"],
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/*`] },
    },
  ],
};
