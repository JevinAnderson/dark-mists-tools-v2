export const join = (...args) => args.filter(arg => arg).join(' ');
export const merge = (...args) => Object.assign({}, ...args);
export const dangerous = __html => ({ __html });
export const bind = (context, ...methods) => {
  methods.forEach(method => {
    context[method] = context[method].bind(context);
  });
};
export const invertObject = obj =>
  Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    result[value] = key;

    return result;
  }, {});
