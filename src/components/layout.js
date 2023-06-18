import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";

import Navigation from "./navigation";

const Layout = ({ children }) => (
  <>
    <Navigation />
    <Container>{children}</Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {};

export default Layout;
