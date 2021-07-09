import * as fs from "fs";
import { GitProject, UserOptions } from "./types";

/**
 * Crate config if it does not already exists
 * @param {string} path The path to config
 * @returns {Promise<void>}
 */
export const createConfigIfNotExist = (path: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
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
 * @param {Array<object>} array The array of objects to search through
 * @param {string} property The property of the object
 * @returns {number} The length of the longest value
 */
export const findLongestValue = (
  array: Array<object>,
  property: string
): number => {
  let length = 0;
  array.forEach(obj => {
    const str = obj[property];
    if (str.length > length) {
      length = str.length;
    }
  });
  return length;
};

/**
 * Create a string of spaces needed so that a strings length
 * matches a longer string. Also adds extra padding at the end.
 * // TODO: Consider renaming function to appendSpaces and return the string with the spaces instead of just the spaces.
 *          Or, rename to strPadding.
 * @param {string} string
 * @param {number} longestValue   The length to compare against
 * @returns {string} The string of spaces
 */
export const strOfSpaces = (str: string, longestValue: number): string => {
  const padding = 1;
  const lengthDiff = longestValue - str.length;
  const tab = " ".repeat(lengthDiff > 0 ? lengthDiff + padding : padding);
  return tab;
};

/**
 * Find the longest length of elements in the valid options/arguments.
 * First all the elements in the array is joined with a seperator,
 * then the length is evaluated.
 * @param {UserOptions} object The object to search
 * @param {string} seperator Seperate the elements with this optional string
 * @returns {number}  The length of the longest joined list
 */
export const lengthOfLongestOptionsList = (
  options: UserOptions,
  seperator: string = ", "
): number => {
  let length = 0;
  Object.keys(options).forEach(key => {
    const str = options[key].valid.join(seperator);
    if (str.length > length) {
      length = str.length;
    }
  });
  return length;
};
