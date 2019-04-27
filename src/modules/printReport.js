const {
  printInfoSmall,
  printRepos,
  printChangedRepos,
  printProjectsNotRepos,
  printReposWithoutRemote
} = require("./gitStatus/report/printReportSections");

/**
 * Print out a complete report of the results
 * @param {Array<object>} repositories        Projects that are repositories
 * @param {Array<object>} projectButNotRepo   Projects that are not repositories
 * @param {Array<object>} outdatedRepos       Repositories that have local changes compared to remote
 * @param {Array<object>} reposWithoutRemote  Repositories withouth a remote URL
 */
const printReport = (
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
module.exports = printReport;
