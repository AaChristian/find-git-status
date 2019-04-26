const {
  printInfoSmall,
  printRepos,
  printChangedRepos,
  printProjectsNotRepos,
  printReposWithoutRemote
} = require("./gitStatus/report");

const printInfo = (
  repositories,
  projectButNotRepo,
  outdatedRepos,
  reposWithoutRemote
) => {
  // Print general info
  printInfoSmall(
    repositories,
    projectButNotRepo,
    outdatedRepos,
    reposWithoutRemote
  );

  // Print all repos
  printRepos(repositories);
  // Print repos that have changes not commited
  printChangedRepos(outdatedRepos);
  // Print repos that has no remote
  printReposWithoutRemote(reposWithoutRemote);
  // Print projects that are not repos
  printProjectsNotRepos(projectButNotRepo);
};

// TODO: Only export the constant instead of object
module.exports = printInfo;
