const path = require("path");
const { addDirectoryToConfig } = require("./runtimeConfig");

const configPath = path.resolve(__dirname, "../../config.json");

/**
 * Check if a arugment is set
 * @param {any} arg The argument to check
 * @returns {boolean}
 */
const isFirstRealArgumentSet = arg => {
  return typeof arg === "string" && arg !== "";
};

/**
 * Check if a string is a substring of a lement in an array if arguments
 * @param {string} arg The string to checl
 * @param {Array<string>} argumentArray The list of arguments to check against
 * @returns {boolean}
 */
const isSubstringInArgumentArray = (arg, argumentArray) => {
  const index = argumentArray.findIndex(el => el.includes(arg));
  return index !== -1 ? true : false;
};

const processArguments = userArguments => {
  return new Promise(async (resolve, reject) => {
    try {
      /**
       * Add directory to config
       */
      const confIndex = userArguments.findIndex(el =>
        el.includes("--config-add")
      );
      if (confIndex !== -1) {
        await addDirectoryToConfig(userArguments[confIndex + 1], configPath);
      }
      resolve();
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  processArguments,
  isFirstRealArgumentSet,
  isSubstringInArgumentArray
};
