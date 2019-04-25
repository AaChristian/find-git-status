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

module.exports = {
  createConfigIfNotExist
};
