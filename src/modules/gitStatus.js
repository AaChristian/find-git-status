const glob = require("glob");
const exec = require("child_process").exec;
const async = require("async");
const output = require("./output");
const directories = require("../../config");

const isProjectCheck = [
  ".env",
  "readme.md",
  "README.md",
  "package.json",
  "package-lock.json",
  "composer.json",
  "composer.lock"
];
let ignoreDirs = ["**/node_modules/**", "**/vendor/**"];

let options = {
  ignore: ignoreDirs,
  dot: true
};

const gitStatus = () => {
  return new Promise(async (resolve, reject) => {
    let repositories = [];
    let projectButNotRepo = [];
    let outdatedRepos = [];
    let reposWithoutRemote = [];

    for (let i = 0; i < directories.length; i++) {
      const directory = directories[i];
      console.log("Searching " + directory);

      // Find all dirs where .git dir exist
      const reposInDir = await findAllGitRepos(directory);

      // Add repos to ignore list
      await addReposToIgnoreList(reposInDir);

      // Find protential projects that arent git repositories
      const projectButNotRepoInDir = await findProjectsNotRepos(
        reposInDir,
        directory
      );

      // Check git status on repos
      const outdatedReposInDIr = await findOutdatedRepos(reposInDir);

      // Find repositores without remote
      const reposWithoutRemoteInDir = await findReposWithoutRemote(reposInDir);

      repositories = [...repositories, ...reposInDir];
      projectButNotRepo = [...projectButNotRepo, ...projectButNotRepoInDir];
      outdatedRepos = [...outdatedRepos, ...outdatedReposInDIr];
      reposWithoutRemote = [...reposWithoutRemote, ...reposWithoutRemoteInDir];
    }

    // Print all info
    output.printInfo(
      repositories,
      projectButNotRepo,
      outdatedRepos,
      reposWithoutRemote
    );
    resolve();
  });
};

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

const addReposToIgnoreList = repositories => {
  const ignoredRepos = repositories.map(value => {
    return "**/" + value + "/**";
  });
  ignoreDirs = [...ignoreDirs, ...ignoredRepos];
  options.ignore = ignoreDirs;
  // console.log(options);
};

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

module.exports = gitStatus;
