/* eslint-disable no-undef */
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";

import * as UserActions from "../actions/user";

class Authentication extends Component {
  state = {
    open: false,
    signIn: true,
    email: "",
    password: "",
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  close = () => {
    this.setState({ open: false });
  };

  open = () => {
    this.setState({ open: true });
  };

  toggleSignInUp = () => {
    this.setState((prevState) => ({
      signIn: !prevState.signIn,
    }));
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onAuthStateChanged = (user) => {
    if (user) {
      const { displayName, email, photoURL, uid } = user;
      user = { displayName, email, photoURL, uid };
    }

    this.props.setUser(user);
  };

  signUp = () => {
    const { email, password } = this.state;

    if (email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.close)
        .catch((error) => {
          this.setState({ error });
        });
      this.close();
    }
  };

  login = () => {
    const { email, password } = this.state;

    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.close)
        .catch(this.error);

      this.close();
    }
  };

  logout = () => {
    firebase.auth().signOut().then(this.close).catch(this.error);
  };

  render = () => (
    <>
      <Nav.Link
        onClick={() => {
          if (this.props.user) {
            firebase.auth().signOut().catch(this.error);
          } else {
            this.open();
          }
        }}
      >
        {this.props.user ? "Sign Out" : "Sign In"}
      </Nav.Link>
      <Modal show={this.state.open} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.signIn ? "Sign In" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={this.changeEmail}
                type="email"
                placeholder="name@example.com"
                value={this.state.email}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={this.changePassword}
                type="password"
                value={this.state.password}
              />
            </Form.Group>
            <a
              style={{ cursor: "pointer" }}
              className="link-primary"
              onClick={this.toggleSignInUp}
            >
              {this.state.signIn
                ? "Don't have an account? Sign up."
                : "Already have an account? Sign in."}
            </a>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={this.state.signIn ? this.login : this.signUp}
          >
            {this.state.signIn ? "Sign In" : "Sign Up"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default connect(({ user }) => ({ user }), UserActions)(Authentication);
