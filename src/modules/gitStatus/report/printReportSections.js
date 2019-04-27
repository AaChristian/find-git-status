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

const printRepos = repositories => {
  if (repositories.length === 0) {
    return;
  }

  const titleText = "Projects with git repositories";
  printTitle(titleText, repositories.length);

  const longestValue = findLongestValue(repositories, "name");
  let spaces = strOfSpaces("Repository", longestValue);

  console.log(`Repository${spaces}| Path`);
  console.log("-".repeat(process.stdout.columns - 1));

  repositories.map(repo => {
    const spaces = strOfSpaces(repo.name, longestValue);
    console.log(`${repo.name}${spaces}| ${repo.path}`);
  });
  console.log("");
};

const printProjectsNotRepos = projectButNotRepo => {
  if (projectButNotRepo.length === 0) {
    return;
  }

  const titleText = "Projects without git repositories";
  printTitle(titleText, projectButNotRepo.length);

  const longestValue = findLongestValue(projectButNotRepo, "name");
  let spaces = strOfSpaces("Project", longestValue);

  console.log(`Project${spaces}| Path`);
  console.log("-".repeat(process.stdout.columns - 1));

  projectButNotRepo.map(repo => {
    const spaces = strOfSpaces(repo.name, longestValue);
    console.log(`${repo.name}${spaces}| ${repo.path}`);
  });
  console.log("");
};

const printReposWithoutRemote = reposWithoutRemote => {
  if (reposWithoutRemote.length === 0) {
    return;
  }

  const titleText = "Repositories with no remote";
  printTitle(titleText, reposWithoutRemote.length);

  const longestValue = findLongestValue(reposWithoutRemote, "name");
  let spaces = strOfSpaces("Project", longestValue);

  console.log(`Project${spaces}| Path`);
  console.log("-".repeat(process.stdout.columns - 1));

  reposWithoutRemote.map(repo => {
    const spaces = strOfSpaces(repo.name, longestValue);
    console.log(`${repo.name}${spaces}| ${repo.path}`);
  });
  console.log("");
};

const printChangedRepos = outdatedRepos => {
  if (outdatedRepos.length === 0) {
    return;
  }

  const titleText = "Repositories with uncommited changes";
  printTitle(titleText, outdatedRepos.length);

  const longestName = findLongestValue(outdatedRepos, "name");
  const longestPath = findLongestValue(outdatedRepos, "path");

  let spacesName = strOfSpaces("Repository", longestName);
  let spacesPath = strOfSpaces("Path", longestPath);

  console.log(`Repository${spacesName}| Path${spacesPath}| Changes`);
  console.log("-".repeat(process.stdout.columns - 1));

  outdatedRepos.map(repo => {
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
  printRepos,
  printChangedRepos,
  printReposWithoutRemote,
  printProjectsNotRepos
};
