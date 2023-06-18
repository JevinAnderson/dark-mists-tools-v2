import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';
import ModalHeader from '../modal/modal-header';
import ModalBody from '../modal/modal-body';
import ModalFooter from '../modal/modal-footer';
import DangerButton from '../buttons/danger';
import PrimaryButton from '../buttons/primary';
import Form from './form';

const UPDATE_KEYS = ['item'];

class ModalEditor extends PureComponent {
  state = ModalEditor.mapPropsToState(this.props);

  componentWillReceiveProps(nextProps) {
    if (UPDATE_KEYS.some(key => nextProps[key] !== this.props[key])) {
      const state = ModalEditor.mapPropsToState(nextProps);

      this.setState(state);
    }
  }

  static mapPropsToState({ item = {} }) {
    return { item };
  }

  updateItem = item => {
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
      save
    } = this;

    return (
      <div className="items__modal-editor">
        <Modal open={open} close={close}>
          <ModalHeader>{header}</ModalHeader>
          <ModalBody>
            <Form item={item} updateItem={updateItem} />
          </ModalBody>
          <ModalFooter>
            <DangerButton onClick={close}>Cancel</DangerButton> <PrimaryButton onClick={save}>Save</PrimaryButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditor.propTypes = {
  item: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  updateItem: PropTypes.func
};

ModalEditor.defaultProps = {
  header: 'Edit Item'
};

export default ModalEditor;
