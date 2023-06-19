import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

import * as itemActions from "../actions/items";
import List from "../components/items/list";
import Search from "../components/items/search";

const IndexPage = ({ createItem, editItem, removeItem, fetchItems }) => {
  useEffect(fetchItems, []);

  return (
    <Container style={{ maxWidth: "600px" }}>
      <main>
        <br />
        <Search createItem={createItem} />
        <br />
        <List editItem={editItem} removeItem={removeItem} />
      </main>
    </Container>
  );
};

IndexPage.propTypes = {
  fetchItems: PropTypes.func,
  createItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
};

export default connect((state) => state, itemActions)(IndexPage);
