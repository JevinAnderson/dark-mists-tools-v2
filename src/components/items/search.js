import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// import Panel from "../panel/panel";
import * as ItemSearchActions from "../../actions/item-search";
// import Input from "../form-controls/input";
// import Button from "../buttons/default";
// import PrimaryButton from "../buttons/primary";
// import ModalEditor from "./modal-editor";
import AdvancedSearch from "./advanced-search";

const UPDATE_KEYS = ["keyword"];

class Search extends Component {
  state = {
    item: {},
    keyword: this.props.keyword,
  };

  componentWillReceiveProps(nextProps) {
    if (UPDATE_KEYS.some((key) => nextProps[key] !== this.props[key])) {
      const state = this.mapPropsToState(nextProps);

      this.setState(state);
    }
  }

  onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.update();
    }
  };

  edit = () => {
    this.setState({ editing: true });
  };

  stopEditing = () => {
    this.setState({ editing: false });
  };

  updateItem = (item) => {
    this.setState({ item });
  };

  saveItem = (item) => {
    this.setState({
      editing: false,
      item: {},
    });

    this.props.createItem(item);
  };

  mapPropsToState({ keyword }) {
    return { keyword };
  }

  updateKeyword = ({ target: { value: keyword } }) => {
    this.setState({ keyword });
  };

  update = () => {
    if (this.props.keyword !== this.state.keyword) {
      this.props.setKeyword(this.state.keyword);
    }
  };

  render = () => {
    if (this.props.showAdvancedSearch) {
      return <AdvancedSearch />;
    }

    return (
      <Card>
        <Card.Body>
          <Form>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={this.state.keyword}
                  onChange={this.updateKeyword}
                  onKeyDown={this.onKeyDown}
                />
              </Col>
              <Col xs="auto">
                <Button variant="outline-secondary" onClick={this.update}>
                  Submit
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  variant="outline-secondary"
                  onClick={this.props.toggleAdvancedSearch}
                >
                  Advanced Search
                </Button>
              </Col>
              {this.props.user && (
                <Col xs="auto">
                  <Button variant="primary">Create item</Button>
                </Col>
              )}
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
  };
}

Search.propTypes = {
  keyword: PropTypes.string,
  showAdvancedSearch: PropTypes.bool,
  setKeyword: PropTypes.func,
  toggleAdvancedSearch: PropTypes.func,
  createItem: PropTypes.func,
};

const mapStateToProps = ({ user, item_search }, ownProps) => ({
  user,
  ...item_search,
  ...ownProps,
});

export default connect(mapStateToProps, ItemSearchActions)(Search);
