const glob = require("glob");
const { isProjectCheck, globOptions: options } = require("../../globalConfig");

const findProjectsNotRepos = (repositories, directory) => {
  return new Promise((resolve, reject) => {
    const projectButNotRepo = [];
    const projectCheckPattern =
      directory + "/**/*(" + isProjectCheck.join("|") + ")";

    glob(projectCheckPattern, options, (err, res) => {
      if (err) {
        console.log("Error", err);
      } else {
        // Sort ascending by length of path
        res.sort((a, b) => a.length - b.length);
        // console.log(res);
        res.forEach(path => {
          const pathArray = path.split("/");
          const repo = pathArray.slice(-2)[0];
          // console.log(projectButNotRepo);
          // console.log(pathArray);
          // console.log(repo);
          let repoExistsInProjectArr = projectButNotRepo.some(el =>
            pathArray.includes(el.name)
          );
          let repoExistsInRepoArr = repositories.some(el =>
            pathArray.includes(el.name)
          );
          // console.log(repoExistsInProjectArr);
          // console.log(repoExistsInRepoArr);
          if (!repoExistsInRepoArr && !repoExistsInProjectArr) {
            projectButNotRepo.push({
              name: repo,
              path: path.substring(0, path.lastIndexOf("/"))
            });
          }
        });
        // console.log("projectButNotRepo: ", projectButNotRepo);
        resolve(projectButNotRepo);
      }
    });
  });
};

module.exports = findProjectsNotRepos;
