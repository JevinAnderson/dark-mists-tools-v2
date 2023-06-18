// Derived from: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
// && from: http://redux.js.org/docs/recipes/ServerRendering.html#inject-initial-component-html-and-state
export function sanitizeHtmlInString(str) {
  return str
    .replace(/</g, '\\u003c')
    .replace(/&/g, '\\u0026')
    .replace(/>/g, '\\u003e')
    .replace(/"/g, '\\u0022')
    .replace(/'/g, '\\u0027');
}

// Derived from: https://stackoverflow.com/questions/24816/escaping-html-strings-with-jquery
// Which they took from mustache: https://github.com/janl/mustache.js/blob/master/mustache.js#L60
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

export function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function(s) {
    return entityMap[s];
  });
}

const invertedEntityMap = Object.keys(entityMap).reduce((result, key) => {
  const value = entityMap[key];
  result[value] = key;

  return result;
}, {});
invertedEntityMap['&#039;'] = "'";
invertedEntityMap['<br />'] = '';

export const revertEscapeHtml = string =>
  Object.keys(invertedEntityMap).reduce((result, key) => {
    const value = invertedEntityMap[key];
    const regex = new RegExp(key, 'g');

    return result.replace(regex, value);
  }, string);
