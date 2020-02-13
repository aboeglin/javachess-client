import React from "react";
import PropTypes from "prop-types";

import { Theme } from "../Theme";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { breakpointAware } from "../../hoc/breakpointAware";

import { SEO } from "./SEO";
import { Main } from "./styled";

const CC = breakpointAware(Main);

export const Site = ({ children, seo, ...other }) => (
  <Theme>
    <SEO seo={seo} {...other} />
    <Header />
    <CC>{children}</CC>
    <Footer {...other} />
  </Theme>
);

Site.propTypes = {
  children: PropTypes.node,
  seo: SEO.propTypes.seo
};

Site.defaultProps = {
  children: null,
  seo: {}
};

export default Site;
