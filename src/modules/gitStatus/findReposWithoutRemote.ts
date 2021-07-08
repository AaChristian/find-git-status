import { GitProject } from "../../types";

const { exec } = require("child_process");

/**
 * Find which repositories in a list that does not have a remote URL
 * @param {Array<object>} repositories The repositories to check
 * @returns {Promise<Array<object>>} The outdated repositories, with name, path and changes
 */
const findReposWithoutRemote = async (repositories: GitProject[]): Promise<GitProject[]> => {
  /**
   * Check if the repository has a remote URL
   * @param {object} repo The repo to check
   * @returns {Promise<object | null} Returns the repo if it does NOT have a remote, else null
   */
  const findGitRemote = (repo: GitProject): Promise<GitProject> => {
    return new Promise(async (resolve, reject) => {
      // The command to execute to check for remote
      const command = "git config --get remote.origin.url";

      // Execute the command
      exec(command, { cwd: repo.path }, (error, stdout, stderr) => {
        let repoWithoutRemote = null;

        // If the output is empty, the repo does not have a remote url
        if (stdout === "") {
          repoWithoutRemote = {
            name: repo.name,
            path: repo.path
          };
        }

        // Resolve promise
        resolve(repoWithoutRemote);
      });
    });
  };

  return new Promise((resolve, reject) => {
    Promise.all(repositories.map(repo => findGitRemote(repo))).then(result => {
      let reposWithoutRemote: GitProject[] = [];

      // For all results from the promises, only push to reposWithoutRemote arry
      // if the result is not null, ie if the repo does not have remote.
      for (let i = 0; i < result.length; i++) {
        if (result[i] !== null) {
          reposWithoutRemote.push(result[i]);
        }
      }

      resolve(reposWithoutRemote);
    });
  });
};

export default findReposWithoutRemote;
