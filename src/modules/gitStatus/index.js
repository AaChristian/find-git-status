const findAllGitRepos = require("./findAllGitRepos");
const findChangedRepos = require("./findChangedRepos");
const findProjectsNotRepos = require("./findProjectsNotRepos");
const findReposWithoutRemote = require("./findReposWithoutRemote");
const addReposToIgnoreList = require("./addReposToIgnoreList");

module.exports = {
  findAllGitRepos,
  findChangedRepos,
  findProjectsNotRepos,
  findReposWithoutRemote,
  addReposToIgnoreList
};
