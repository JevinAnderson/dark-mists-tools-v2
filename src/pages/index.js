import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./items.scss";
import * as itemActions from "../actions/items";
import List from "../components/items/list";
import Search from "../components/items/search";

const IndexPage = ({ createItem, editItem, removeItem, fetchItems }) => {
  useEffect(fetchItems, []);

  return (
    <main>
      <Search createItem={createItem} />
      <List editItem={editItem} removeItem={removeItem} />
    </main>
  );
};

IndexPage.propTypes = {
  fetchItems: PropTypes.func,
  createItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ownProps;

export default connect(mapStateToProps, itemActions)(IndexPage);
