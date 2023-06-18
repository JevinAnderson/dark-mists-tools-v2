import { set } from '../utilities/actions';
import { SET_ITEMS } from '../constants/items';

export const setItems = items => set(SET_ITEMS, items);
export const fetchItems = () => dispatch => {
  const ref = firebase.database().ref('items');

  ref
    .once('value')
    .then(snapshot => {
      const snapshotValue = snapshot.val() || {};
      const items = Object.entries(snapshotValue).map(([key, value]) => ({
        id: key,
        ...value
      }));
      dispatch(setItems(items));
    })
    .catch(console.log);
};

export const createItem = item => (dispatch, getState) => {
  const ref = firebase.database().ref('items');
  const itemRef = ref.push();

  itemRef
    .set(item)
    .then(() => {
      const { items: previousItems } = getState();

      dispatch(
        setItems([
          {
            id: itemRef.key,
            ...item
          },
          ...previousItems
        ])
      );
    })
    .catch(console.log);
};

export const editItem = item => (dispatch, getState) => {
  const { id, ...rest } = item;
  const itemRef = firebase.database().ref(`items/${id}`);

  itemRef
    .set(rest)
    .then(() => {
      const { items: previousItems } = getState();
      const nextItems = previousItems.map(element => {
        if (element.id !== id) {
          return element;
        }
        return { id, ...rest };
      });

      dispatch(setItems(nextItems));
    })
    .catch(console.log);
};

export const removeItem = id => (dispatch, getState) => {
  const itemRef = firebase.database().ref(`items/${id}`);

  itemRef
    .remove()
    .then(() => {
      const { items: previousItems } = getState();
      const nextItems = previousItems.filter(element => element.id != id);
      dispatch(setItems(nextItems));
    })
    .catch(console.log);
};
