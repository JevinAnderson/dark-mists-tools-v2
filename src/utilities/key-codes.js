export const UNIDENTIFIED_KEY = 0;
export const ENTER_KEY = 13;
export const ESCAPE_KEY = 27;
export const SPACE_KEY = 32;
export const COMMA_KEY = 188;

const keyMap = {
  [UNIDENTIFIED_KEY]: ['Unidentified'],
  [ENTER_KEY]: ['Enter', 'Return'],
  [ESCAPE_KEY]: ['Escape', 'Esc'],
  [SPACE_KEY]: [' ', 'Spacebar'],
  [COMMA_KEY]: [',']
};

export function ListenerBuilder({ keyCodes = [], handler = () => {} } = {}) {
  const codes = [...keyCodes];
  const keys = [];
  let builder;

  function addKeyCode(code) {
    codes.push(code);

    (keyMap[code] || []).forEach(key => {
      keys.push(key);
    });

    return builder;
  }

  const listenForUnidentified = () => addKeyCode(UNIDENTIFIED_KEY);
  const listenForEnterKey = () => addKeyCode(ENTER_KEY);
  const listenForEscapeKey = () => addKeyCode(ESCAPE_KEY);
  const listenForSpaceKey = () => addKeyCode(SPACE_KEY);
  const listenForCommaKey = () => addKeyCode(COMMA_KEY);
  const setHandler = h => {
    handler = h;

    return builder;
  };

  const createListener = preventDefault => event => {
    if (preventDefault) {
      event.preventDefault();
    }

    const { key, keyCode } = event;

    if (keys.indexOf(key) !== -1 || codes.indexOf(keyCode) !== -1) {
      handler(event);
    }
  };

  builder = {
    addKeyCode,
    listenForUnidentified,
    listenForEnterKey,
    listenForEscapeKey,
    listenForSpaceKey,
    listenForCommaKey,
    setHandler,
    createListener
  };

  return builder;
}

export default { UNIDENTIFIED_KEY, ENTER_KEY, ESCAPE_KEY, SPACE_KEY, COMMA_KEY, ListenerBuilder };
