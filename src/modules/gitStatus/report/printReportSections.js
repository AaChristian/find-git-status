const printTitle = require("./printTitle");
const { findLongestValue, strOfSpaces } = require("../../../helpers");

const printInfoSmall = (
  repositories,
  projectButNotRepo,
  outdatedRepos,
  reposWithoutRemote
) => {
  console.log(
    "\nProjects found:\t\t\t" + (repositories.length + projectButNotRepo.length)
  );
  console.log("Repositories found:\t\t" + repositories.length);
  console.log("Repositories outdated:\t\t" + outdatedRepos.length);
  console.log("Repositories without remote:\t" + reposWithoutRemote.length);
  console.log("Projects but not repos:\t\t" + projectButNotRepo.length + "\n");
};

/**
 * Print out a basic setion, with project/repository name and path columns
 * @param {Array<object>} content The content of the section
 * @param {string} title The title
 * @param {string} nameHeader The header value of the name of the project/repository
 */
const printBasicSection = (content, title, nameHeader) => {
  if (content.length === 0) {
    return;
  }
  // Print header/title
  printTitle(title, content.length);

  const longestValue = findLongestValue(content, "name");
  let spaces = strOfSpaces(nameHeader, longestValue);

  console.log(`${nameHeader}${spaces}| Path`);
  console.log("-".repeat(process.stdout.columns - 1));

  content.map(repo => {
    const spaces = strOfSpaces(repo.name, longestValue);
    console.log(`${repo.name}${spaces}| ${repo.path}`);
  });
  console.log("");
};

/**
 * Print section for the repositories that have changes
 * @param {Array<object>} changedRepos The changed repositories
 */
const printChangedRepos = changedRepos => {
  if (changedRepos.length === 0) {
    return;
  }

  const titleText = "Repositories with uncommited changes";
  printTitle(titleText, changedRepos.length);

  const longestName = findLongestValue(changedRepos, "name");
  const longestPath = findLongestValue(changedRepos, "path");

  let spacesName = strOfSpaces("Repository", longestName);
  let spacesPath = strOfSpaces("Path", longestPath);

  console.log(`Repository${spacesName}| Path${spacesPath}| Changes`);
  console.log("-".repeat(process.stdout.columns - 1));

  changedRepos.map(repo => {
    repo.changes.map((change, index) => {
      let name = "";
      let path = "";
      if (index === 0) {
        name = repo.name;
        path = repo.path;
      }
      const spacesName = strOfSpaces(name, longestName);
      const spacesPath = strOfSpaces(path, longestPath);

      console.log(`${name}${spacesName}| ${path}${spacesPath}| ${change}`);
    });
    console.log("-".repeat(process.stdout.columns - 1));
  });
};

module.exports = {
  printInfoSmall,
  printBasicSection,
  printChangedRepos
};
