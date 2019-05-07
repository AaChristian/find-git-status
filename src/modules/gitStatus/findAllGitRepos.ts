const glob = require("glob");

/**
 * Find all git repositires within a directory
 * @param {string} directory The directory to search
 * @param {object.object} globOptions Options to use whiole searching for potential projects
 * @returns {Promise<object>} The repositories found
 */
const findAllGitRepos = (directory, globOptions) => {
  return new Promise((resolve, reject) => {
    // If not all arguments is given, reject
    if (
      typeof directory === "undefined" ||
      typeof globOptions === "undefined"
    ) {
      reject("Missing arguments..");
      return;
    }

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

export default findAllGitRepos;
