/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

const Profile = ({ user }) => {
  const [displayName, setDisplayName] = useState(get(user, "displayName", ""));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Container style={{ maxWidth: "600px" }}>
      <main>
        {loading ? (
          <div class="d-flex justify-content-center">
            <br />
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => {
                  const newName = e.target.value;
                  setDisplayName(newName);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setLoading(true);

                firebase
                  .auth()
                  .currentUser.updateProfile({ displayName })
                  .then((results) => {
                    console.log("%cresults", "color:green", results);
                  })
                  .catch(() => {})
                  .then(() => {
                    setLoading(false);
                  });
              }}
            >
              Save
            </Button>
          </Form>
        )}
      </main>
    </Container>
  );
};

export default connect(({ user }) => ({ user }))(Profile);
