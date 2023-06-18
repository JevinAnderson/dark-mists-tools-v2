import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";

import * as StyleActions from "../actions/styles";

function Navigation({ darkMode, setDarkMode }) {
  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="/">Darkmist Tools</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/">Items</Nav.Link>
              <Nav.Link href="/enchanters">Enchanters</Nav.Link>
              <Nav.Link href="#">Sign In</Nav.Link>
              <NavDropdown title="Theme" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setDarkMode(false)}>
                  Light Mode
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setDarkMode(true)}>
                  Dark Mode
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default connect(
  ({ styles = {} }) => ({
    darkMode: styles.darkMode ?? false,
  }),
  StyleActions
)(Navigation);
