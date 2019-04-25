const fs = require("fs");
const { createConfigIfNotExist } = require("../../helpers");

/**
 * Add a directory path to the config
 * @param {string} directory The directory to add
 * @param {string} configPath The path to the config file
 * @returns {Promise<>}
 */
const addDirectoryToConfig = (directory, configPath) => {
  return new Promise(async (resolve, reject) => {
    // If the directory is not specified
    if (directory == "" || directory.slice(0, 1) === "-") {
      reject("Please specify a directory. Example --config-add C:/path/to/dir");
      return;
    }

    // If the config file does not exists, create it
    await createConfigIfNotExist(configPath);

    // TOOD: Allow both types of slashes in configPath

    // Read current config from file
    let config = JSON.parse(fs.readFileSync(configPath), "utf-8");

    // TODO: Check if the directory already exists, if it does reject
    // Push the new directory to the config
    config.directories.push(directory);

    // Write the updated config to file
    fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8", err => {
      console.log("Directory added");
      resolve();
    });
  });
};

module.exports = addDirectoryToConfig;
