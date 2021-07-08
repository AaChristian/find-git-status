import { GitProject, GlobalConfig } from "../../types";

/**
 * Add a list of repositories/directories to the ignore list
 * @param {Array<string>} repositories The repsitory directories to add
 * @param {GlobalConfig} globalConfig The globalConfig which contains ignoreDirs
 * @returns {Promise<GlobalConfig>} Returns the globalConfig with the updated ignoreDirs
 */
const addReposToIgnoreList = (
  repositories: Array<GitProject>,
  globalConfig: GlobalConfig
): Promise<GlobalConfig> => {
  return new Promise<GlobalConfig>((resolve, reject) => {
    // For each repository to add to list, create proper pattern to be used
    // when searching with glob
    const ignoredRepos = repositories.map(value => {
      return "**/" + value + "/**";
    });

    const { ignoreDirs } = globalConfig;

    // Add repositories to the ignore dirs array
    const newIgnoreDirs = [...ignoreDirs, ...ignoredRepos];

    // Update ignoreDirs in config
    globalConfig.ignoreDirs = newIgnoreDirs;

    // Update ignore option for glob with the updated ignore list
    globalConfig.globOptions.ignore = newIgnoreDirs;

    resolve(globalConfig);
  });
};

export default addReposToIgnoreList;
