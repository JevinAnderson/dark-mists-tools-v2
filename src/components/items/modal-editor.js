import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "./form";

const UPDATE_KEYS = ["item"];

class ModalEditor extends PureComponent {
  state = ModalEditor.mapPropsToState(this.props);

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (UPDATE_KEYS.some((key) => nextProps[key] !== this.props[key])) {
      const state = ModalEditor.mapPropsToState(nextProps);

      this.setState(state);
    }
  }

  static mapPropsToState({ item = {} }) {
    return { item };
  }

  updateItem = (item) => {
    this.setState({ item });
  };

  save = () => {
    let date_posted = new Date();
    date_posted = date_posted.toISOString();

    this.props.updateItem({ ...this.state.item, date_posted });
  };

  render() {
    const {
      props: { header = "Edit Item", open, close },
      state: { item },
      updateItem,
      save,
    } = this;

    return (
      <Modal show={open} onHide={close}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>
          <Form item={item} updateItem={updateItem} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="me-2" onClick={close}>
            Cancel
          </Button>
          <Button variant="primary" onClick={save}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalEditor.propTypes = {
  item: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  updateItem: PropTypes.func,
};

export default ModalEditor;
