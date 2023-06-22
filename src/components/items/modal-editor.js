import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import Modal from '../modal/modal';
// import ModalHeader from '../modal/modal-header';
// import ModalBody from '../modal/modal-body';
// import ModalFooter from '../modal/modal-footer';
// import DangerButton from '../buttons/danger';
// import PrimaryButton from '../buttons/primary';
import Form from "./form";

const UPDATE_KEYS = ["item"];

class ModalEditor extends PureComponent {
  state = ModalEditor.mapPropsToState(this.props);

  componentWillReceiveProps(nextProps) {
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
      props: { header, open, close },
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

ModalEditor.defaultProps = {
  header: "Edit Item",
};

export default ModalEditor;
