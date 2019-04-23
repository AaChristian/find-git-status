const { exec } = require("child_process");
const async = require("async");

const findOutdatedRepos = async repositories => {
  let outdatedRepos = [];

  const checkGitStatus = (repo, callback) => {
    exec(
      "git status --porcelain",
      { cwd: repo.path },
      (error, stdout, stderr) => {
        if (stdout !== "") {
          const changes = stdout.split("\n").filter(change => {
            return change !== "";
          });
          outdatedRepos.push({
            name: repo.name,
            path: repo.path,
            changes: changes
          });
        }
        callback();
      }
    );
  };

  return new Promise((resolve, reject) => {
    async.map(repositories, checkGitStatus, () => {
      resolve(outdatedRepos);
    });
  });
};

module.exports = findOutdatedRepos;
