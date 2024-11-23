import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";

const FooterLink = ({ href = "#", type }) => <a href={href} className="mx-2">
  <i className={`bi bi-${type}`} style={{ fontSize: '1.5rem' }} />
</a>

const Footer = () => (
  <Navbar
    collapseOnSelect
    expand="lg"
    bg="dark"
    data-bs-theme="dark"
    sticky="bottom"
  >
    <Container className="justify-content-center">
      <FooterLink href="https://www.darkmists.org/" type="house-fill" />
      <FooterLink href="https://discord.com/invite/5zvnAUS" type="discord" />
      <FooterLink href="https://twitter.com/darkmists?lang=en" type="twitter" />
    </Container>
  </Navbar>
);

export default Footer
