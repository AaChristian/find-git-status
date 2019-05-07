import printTitle from "./printTitle";
import { findLongestValue, strOfSpaces } from "../../../helpers";
import { uniqBy } from "lodash";
import { GitProject } from "../../../types";

/**
 * Print the number of projects and git repositories found
 * @param {Array<GitProject>} repositories
 * @param {Array<GitProject>} projectButNotRepo
 * @param {Array<GitProject>} changedRepos
 * @param {Array<GitProject>} reposWithoutRemote
 */
export const printInfoSmall = (
  repositories: Array<GitProject>,
  projectButNotRepo: Array<GitProject>,
  changedRepos: Array<GitProject>,
  reposWithoutRemote: Array<GitProject>
): void => {
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
 * @param {Array<GitProject>} content The content of the section
 * @param {string} title The title
 * @param {string} nameHeader The header value of the name of the project/repository
 */
export const printBasicSection = (
  content: Array<GitProject>,
  title: string,
  nameHeader: string
): void => {
  if (content.length === 0) {
    return;
  }
  // Print header/title
  printTitle(title, content.length);

  const longestValue: number = findLongestValue(content, "name");
  let spaces: string = strOfSpaces(nameHeader, longestValue);

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
 * @param {Array<GitProject>} changedRepos The changed repositories
 */
export const printChangedRepos = (changedRepos: Array<GitProject>): void => {
  if (changedRepos.length === 0) {
    return;
  }

  const titleText: string = "Repositories with uncommited changes";
  printTitle(titleText, changedRepos.length);

  const longestName: number = findLongestValue(changedRepos, "name");
  const longestPath: number = findLongestValue(changedRepos, "path");

  let spacesName: string = strOfSpaces("Repository", longestName);
  let spacesPath: string = strOfSpaces("Path", longestPath);

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
      const spacesName: string = strOfSpaces(name, longestName);
      const spacesPath: string = strOfSpaces(path, longestPath);

      console.log(`${name}${spacesName}| ${path}${spacesPath}| ${change}`);
    });
    console.log("-".repeat(process.stdout.columns - 1));
  });
};

/**
 * Print out the status of the found git repositories. The following is printed
 * out for each repository: Modified, deleted and untracked files
 * @param {Array<GitProject>} repositories The git repositories
 * @param {Array<GitProject>} changedRepos The git repositories with changes
 */
export const printReposStatus = (
  repositories: Array<GitProject>,
  changedRepos: Array<GitProject>
): void => {
  // Remove duplicate repos by looking at the repos path
  const uniqueRepos: Array<GitProject> = uniqBy(
    [...changedRepos, ...repositories],
    "path"
  );

  /**
   * Create header string of file changes to keep track of
   */
  const statusToTrack: string[] = ["M", "D", "U"];
  const spacesFileCount: string = strOfSpaces(".", 3);
  let headerFilesTrack = "";
  for (let i = 0; i < statusToTrack.length; i++) {
    const element = statusToTrack[i];
    headerFilesTrack += element;
    if (i !== statusToTrack.length - 1) {
      headerFilesTrack += spacesFileCount;
    }
  }

  const longestName: number = findLongestValue(uniqueRepos, "name");
  const spacesName: string = strOfSpaces("Repository", longestName);

  // Example: Repository M(modified) D(deleted) U(untracked)
  const header: string = `Repository${spacesName} ${headerFilesTrack}`;
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
        const changeType: string = change.substring(0, 2);
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
    const spacesName: string = strOfSpaces(repo.name, longestName);
    console.log(`${repo.name}${spacesName} ${resultFoundString}`);
  });
};
