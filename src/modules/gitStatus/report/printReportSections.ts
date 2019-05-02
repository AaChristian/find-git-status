import printTitle from "./printTitle";
import { findLongestValue, strOfSpaces } from "../../../helpers";
import { uniqBy } from "lodash";

/**
 * Print the number of projects and git repositories found
 * @param {Array<object>} repositories
 * @param {Array<object>} projectButNotRepo
 * @param {Array<object>} changedRepos
 * @param {Array<object>} reposWithoutRemote
 */
const printInfoSmall = (
  repositories,
  projectButNotRepo,
  changedRepos,
  reposWithoutRemote
) => {
  console.log(
    "\nProjects found:\t\t\t" + (repositories.length + projectButNotRepo.length)
  );
  console.log("Repositories found:\t\t" + repositories.length);
  console.log("Repositories changed:\t\t" + changedRepos.length);
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

/**
 * Print out the status of the found git repositories. The following is printed
 * out for each repository: Modified, deleted and untracked files
 * @param {Array<object>} repositories The git repositories
 * @param {Array<object>} changedRepos The git repositories with changes
 */
const printReposStatus = (repositories, changedRepos) => {
  // Remove duplicate repos by looking at the repos path
  const uniqueRepos = uniqBy([...changedRepos, ...repositories], "path");

  /**
   * Create header string of file changes to keep track of
   */
  const statusToTrack = ["M", "D", "U"];
  const spacesFileCount = strOfSpaces(".", 3);
  let headerFilesTrack = "";
  for (let i = 0; i < statusToTrack.length; i++) {
    const element = statusToTrack[i];
    headerFilesTrack += element;
    if (i !== statusToTrack.length - 1) {
      headerFilesTrack += spacesFileCount;
    }
  }

  const longestName = findLongestValue(uniqueRepos, "name");
  const spacesName = strOfSpaces("Repository", longestName);

  // Example: Repository M(modified) D(deleted) U(untracked)
  const header = `Repository${spacesName} ${headerFilesTrack}`;
  console.log(header);
  console.log("-".repeat(header.length));

  // For each repo
  uniqueRepos.forEach(repo => {
    // Object to keep track of the found status changes for the repo
    const filesFound = {
      modified: 0,
      deleted: 0,
      untracked: 0
    };
    if (repo.changes) {
      repo.changes.forEach(change => {
        // Get the first two characters of the "changes" element
        const changeType = change.substring(0, 2);
        switch (changeType) {
          case " M":
            filesFound.modified++;
            break;
          case " D":
            filesFound.deleted++;
            break;
          case "??":
            filesFound.untracked++;
            break;
        }
      });
    }

    /**
     * Create result string for the repo of number of files found with changes
     */
    let resultFoundString = "";
    Object.keys(filesFound).forEach(track => {
      const trackTypeFound = filesFound[track];
      resultFoundString +=
        "" + trackTypeFound + strOfSpaces(trackTypeFound + "", 3);
    });

    // Log the results for the repo
    const spacesName = strOfSpaces(repo.name, longestName);
    console.log(`${repo.name}${spacesName} ${resultFoundString}`);
  });
};

module.exports = {
  printInfoSmall,
  printBasicSection,
  printChangedRepos,
  printReposStatus
};
