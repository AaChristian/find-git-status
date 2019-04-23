const glob = require("glob");
const { globOptions: options } = require("../../globalConfig");

const findAllGitRepos = directory => {
  return new Promise((resolve, reject) => {
    const repositories = [];
    glob(directory + "/**/.git", options, (err, res) => {
      if (err) {
        console.log("Error", err);
      } else {
        // Sort ascending by length of path
        res.sort((a, b) => a.length - b.length);
        // console.log(res);
        res.forEach(path => {
          const repo = path.split("/").slice(-2)[0];
          if (!repositories.includes(repo)) {
            repositories.push({
              name: repo,
              path: path.substring(0, path.lastIndexOf("/"))
            });
          }
        });
        // console.log("repositories: ", repositories);
        resolve(repositories);
      }
    });
  });
};

module.exports = findAllGitRepos;
