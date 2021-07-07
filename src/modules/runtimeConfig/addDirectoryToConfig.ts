const fs = require("fs");
const { createConfigIfNotExist } = require("../../helpers");

/**
 * Add a directory path to the config
 * @param {string} directory The directory to add
 * @param {string} configPath The path to the config file
 * @returns {Promise<>}
 */
const addDirectoryToConfig = (directory, configPath): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    // If the directory is not specified
    if (directory == "" || directory.slice(0, 1) === "-") {
      reject("Please specify a directory. Example --config-add C:/path/to/dir");
      return;
    }

    // Check if config file exists, if it does not then create it
    await createConfigIfNotExist(configPath);

    // TOOD: Allow both types of slashes in configPath

    // Read current config from file
    let config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    // If the directory already exists in config, reject with message
    if (config.directories.includes(directory)) {
      reject("Directory already exists in config");
      return;
    }

    // Push the new directory to the config
    config.directories.push(directory);

    // Write the updated config to file
    fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8", err => {
      console.log("Directory added");
      resolve();
    });
  });
};

export default addDirectoryToConfig;
