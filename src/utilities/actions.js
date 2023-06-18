export const perform = type => ({ type });
export const set = (type, payload) => ({ type, payload });

export default { perform, set };
