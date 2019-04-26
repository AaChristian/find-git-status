const fs = require("fs");

/**
 * Crate config if it does not already exists
 * @param {string} path The path to config
 * @returns {Promise<void>}
 */
const createConfigIfNotExist = path => {
  return new Promise((resolve, reject) => {
    const defaultConfig = { directories: [] };
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(defaultConfig, null, 2), "utf-8");
    }
    resolve();
  });
};

/**
 * Find the langest value of a given key in a array of objects
 * // TODO: Rename object variable to array
 * @param {Array<object>} object The array of objects to search through
 * @param {string} property The property of the object
 * @returns {number} The length of the longest value
 */
const findLongestValue = (object, property) => {
  let length = 0;
  Object.keys(object).forEach(key => {
    const str = object[key][property];
    if (str.length > length) {
      length = str.length;
    }
  });
  return length;
};

/**
 * Create a string of spaces needed so that a strings length
 * matches a longer string
 * // TODO: Rename function to appendSpaces and return the string with the spaces instead of just the spaces.
 * @param {string} string
 * @param {*} longString  The long string
 * @returns {string} The string of spaces
 */
const tabs = (str, longestValue) => {
  const lengthDiff = longestValue - str.length;
  const tab = " ".repeat(lengthDiff > 0 ? lengthDiff + 1 : 1);
  return tab;
};

module.exports = {
  createConfigIfNotExist,
  findLongestValue,
  tabs
};
