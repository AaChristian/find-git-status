const { exec } = require("child_process");
const async = require("async");

const findReposWithoutRemote = async repositories => {
  let reposWithoutRemote = [];

  const findGitRemote = (repo, callback) => {
    exec(
      "git config --get remote.origin.url",
      { cwd: repo.path },
      (error, stdout, stderr) => {
        if (stdout === "") {
          reposWithoutRemote.push({
            name: repo.name,
            path: repo.path
          });
        }
        callback();
      }
    );
  };

  return new Promise((resolve, reject) => {
    async.map(repositories, findGitRemote, () => {
      resolve(reposWithoutRemote);
    });
  });
};

module.exports = findReposWithoutRemote;
