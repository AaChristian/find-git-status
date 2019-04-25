const fs = require("fs");
const path = require("path");
const output = require("./output");
const {
  findAllGitRepos,
  findOutdatedRepos,
  findProjectsNotRepos,
  findReposWithoutRemote,
  addReposToIgnoreList
} = require("./gitStatus");

const gitStatus = () => {
  return new Promise(async (resolve, reject) => {
    let repositories = [];
    let projectButNotRepo = [];
    let outdatedRepos = [];
    let reposWithoutRemote = [];

    const { directories } = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../config.json"), "utf-8")
    );

    for (let i = 0; i < directories.length; i++) {
      const directory = directories[i];
      console.log("Searching " + directory);

      // Find all dirs where .git dir exist
      const reposInDir = await findAllGitRepos(directory);
      console.log(reposInDir);

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

module.exports = gitStatus;
