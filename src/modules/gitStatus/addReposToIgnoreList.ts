/**
 * Add a list of repositories/directories to the ignore list
 * @param {Array<string>} repositories The repsitory directories to add
 * @param {object} globalConfig The globalConfig which contains ignoreDirs
 * @returns {Promise<object>} Returns the globalConfig with the updated ignoreDirs
 */
const addReposToIgnoreList = (repositories, globalConfig) => {
  return new Promise((resolve, reject) => {
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
