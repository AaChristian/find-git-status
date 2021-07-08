import { printInfoSmall, printBasicSection, printChangedRepos } from "./gitStatus/report/printReportSections";

/**
 * Print out a complete report of the results
 * @param {Array<object>} repositories        Projects that are repositories
 * @param {Array<object>} projectButNotRepo   Projects that are not repositories
 * @param {Array<object>} changedRepos       Repositories that have local changes compared to remote
 * @param {Array<object>} reposWithoutRemote  Repositories withouth a remote URL
 */
const printReport = (
  repositories,
  projectButNotRepo,
  changedRepos,
  reposWithoutRemote
) => {
  // Print general info
  printInfoSmall(
    repositories,
    projectButNotRepo,
    changedRepos,
    reposWithoutRemote
  );

  // Print all repositories
  printBasicSection(
    repositories,
    "Projects with git repositories",
    "Repository"
  );

  // Print projects that are not repos
  printBasicSection(
    projectButNotRepo,
    "Projects without git repositories",
    "Project"
  );

  // Print repos that has no remote
  printBasicSection(
    reposWithoutRemote,
    "Repositories with no remote",
    "Project"
  );

  // Print repos that have changes not commited
  printChangedRepos(changedRepos);
};

// TODO: Only export the constant instead of object
export default printReport;
