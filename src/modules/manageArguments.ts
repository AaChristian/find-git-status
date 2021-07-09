import path from "path";
import { options, addDirectoryToConfig, printHelp } from "./runtimeConfig";
import { findGitStatusSmall } from "./findGitProjects";
import { createConfigIfNotExist } from "../helpers";

const configPath = path.resolve(__dirname, "../../config.json");

/**
 * Check if a arugment is set
 * @param {any} arg The argument to check
 * @returns {boolean}
 */
export const isFirstRealArgumentSet = (arg: string) => {
  return typeof arg === "string" && arg !== "";
};

/**
 * Check if a string is a substring of a lement in an array if arguments
 * @param {string} arg The string to checl
 * @param {Array<string>} argumentArray The list of arguments to check against
 * @returns {boolean}
 */
export const isSubstringInArgumentArray = (arg, argumentArray) => {
  const index = argumentArray.findIndex(el => el.includes(arg));
  return index !== -1 ? true : false;
};

/**
 * Process the arguments/options from the command line
 * @param {Array<string>} userArguments The command line arguments
 * @return {Promise<>}
 */
export const processArguments = (userArguments): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      /**
       * Print help
       */
      if (options.help.valid.includes(userArguments[0])) {
        printHelp(options);
        resolve();
        return;
      }

      /**
       * Initialize config
       */
      if (options.init.valid.includes(userArguments[0])) {
        await createConfigIfNotExist(configPath);
        resolve();
        return;
      }

      /**
       * Get git repositories and print a compact table for them
       */
      if (options.statusSmall.valid.includes(userArguments[0])) {
        await findGitStatusSmall();
        resolve();
        return;
      }

      /**
       * Add directory to config
       */
      const confIndex = userArguments.findIndex(el =>
        el.includes("--config-add")
      );
      if (confIndex !== -1) {
        await addDirectoryToConfig(userArguments[confIndex + 1], configPath);
      }

      // Resolve
      resolve();
    } catch (error) {
      console.log(error);
    }
  });
};
