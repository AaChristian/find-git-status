let { ignoreDirs, globOptions } = require("../../globalConfig");

/**
 * Add a list of repositories/directories to the ignore list
 * @param {Array<string>} repositories The repsitory directories to add
 * @returns {Promise<>}
 */
const addReposToIgnoreList = repositories => {
  return new Promise((resolve, reject) => {
    const ignoredRepos = repositories.map(value => {
      return "**/" + value + "/**";
    });
    console.log(ignoredRepos);

    // Update the ignore directories list
    ignoreDirs = [...ignoreDirs, ...ignoredRepos];
    globOptions.ignore = ignoreDirs;
    console.log(ignoreDirs);

    resolve();
  });
};

module.exports = addReposToIgnoreList;
