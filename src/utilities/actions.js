export const perform = (type) => ({ type });
export const set = (type, payload) => ({ type, payload });

const actions = { set, perform };

export default actions;
