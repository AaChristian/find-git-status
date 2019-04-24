const glob = require("glob");
const exec = require("child_process").exec;
const async = require("async");
const output = require("./output");
const directories = require("../../config");
const { isProjectCheck } = require("../globalConfig");
let { ignoreDirs, globOptions: options } = require("../globalConfig");
const {
  findAllGitRepos,
  findOutdatedRepos,
  findProjectsNotRepos,
  findReposWithoutRemote
} = require("./gitStatus");

/**
 * Add a list of repositories/directories to the ignore list
 * @param {Array<string>} repositories The repsitory directories to add
 * @returns {void}
 */
const addReposToIgnoreList = repositories => {
  const ignoredRepos = repositories.map(value => {
    return "**/" + value + "/**";
  });
  // Update the ignore directories list
  ignoreDirs = [...ignoreDirs, ...ignoredRepos];
  options.ignore = ignoreDirs;
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

module.exports = { gitStatus, addReposToIgnoreList };