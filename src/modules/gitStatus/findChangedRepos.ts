import { GitProject } from "../../types";

const { exec } = require("promisify-child-process");

/**
 * Check the git status of a list of repositories
 * @param {Array<object>} repositories The repositories to check
 * @returns {Promise<Array<object>>} The outdated repositories, with name, path and changes
 */
const findChangedRepos = async (repositories: GitProject[]): Promise<GitProject[]> => {
  /**
   * Check git status for a repository
   * @param {object} repo The repo to check
   * @returns {Promise<object | null} Returns null if no repo found
   */
  const checkGitStatus = (repo): Promise<GitProject> => {
    return new Promise(async (resolve, reject) => {
      let outDatedRepo: GitProject = null;

      // Check status
      const { stdout } = await exec("git status --porcelain", {
        cwd: repo.path
      });

      // If the output was not empty
      if (stdout !== "") {
        const changes = stdout.split("\n").filter(change => {
          return change !== "";
        });

        outDatedRepo = {
          name: repo.name,
          path: repo.path,
          changes: changes
        };
      }

      // Resolve promise
      resolve(outDatedRepo);
    });
  };

  return new Promise((resolve, reject) => {
    Promise.all(repositories.map(repo => checkGitStatus(repo))).then(result => {
      let changedRepos: GitProject[] = [];

      // For all results from the promises, only push to changedRepos arry
      // if the result is not null, ie if the repo is outdated.
      for (let i = 0; i < result.length; i++) {
        if (result[i] !== null) {
          changedRepos.push(result[i]);
        }
      }

      resolve(changedRepos);
    });
  });
};

export default findChangedRepos;
