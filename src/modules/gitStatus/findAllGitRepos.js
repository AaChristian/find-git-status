const glob = require("glob");
const { globOptions } = require("../../globalConfig");

/**
 * Find all git repositires within a directory
 * @param {string} directory  The directory to search
 * @returns {Promise<object>} The repositories found
 */
const findAllGitRepos = directory => {
  return new Promise((resolve, reject) => {
    const repositories = [];

    // Search the directory and subdirectories for git repositories
    glob(directory + "/**/*git", globOptions, (err, res) => {
      if (err) {
        console.log("Error", err);
      } else {
        // Sort ascending by length of path
        res.sort((a, b) => a.length - b.length);

        res.forEach(path => {
          // Get the name of the repo (directory)
          const repo = path.split("/").slice(-2)[0];

          // If the repo is not already in the array, add it to the array as
          // an object with the repo name and path
          if (!repositories.includes(repo)) {
            repositories.push({
              name: repo,
              path: path.substring(0, path.lastIndexOf("/"))
            });
          }
        });

        resolve(repositories);
      }
    });
  });
};

module.exports = findAllGitRepos;
