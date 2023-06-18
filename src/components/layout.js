import React from "react";
import PropTypes from "prop-types";

import Navigation from "./navigation";

const Layout = ({ children }) => (
  <>
    <Navigation />
    {children}
  </>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {};

export default Layout;
