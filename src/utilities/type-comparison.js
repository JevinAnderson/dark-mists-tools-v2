export const type = a => Object.prototype.toString.call(a);

export const Types = {
  STRING: type(''),
  NUMBER: type(1),
  BOOLEAN: type(true),
  OBJECT: type({}),
  ARRAY: type([]),
  ERROR: type(Error()),
  FUNCTION: type(function() {}),
  NULL: type(null),
  UNDEFINED: type(undefined)
};

export const isArray = a => type(a) === Types.ARRAY;
export const isBoolean = a => type(a) === Types.BOOLEAN;
export const isError = a => type(a) === Types.ERROR;
export const isFunction = a => type(a) === Types.FUNCTION;
export const isNull = a => a === null;
export const isNumber = a => type(a) === Types.NUMBER;
export const isObject = a => type(a) === Types.OBJECT;
export const isString = a => type(a) === Types.STRING;
export const isUndefined = a => a === undefined;
export const sameType = (a, b) => type(a) === type(b);

export default {
  isArray,
  isBoolean,
  isError,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
  sameType,
  Types,
  type
};
