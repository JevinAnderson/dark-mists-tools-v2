export const saveState = state => {
  try {
    const { loader, ...rest } = state;

    const serializedState = JSON.stringify(rest);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    //No-op
  }
};

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}
