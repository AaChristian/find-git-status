const findAllGitRepos = require("./findAllGitRepos");
const findOutdatedRepos = require("./findOutdatedRepos");
const findProjectsNotRepos = require("./findProjectsNotRepos");
const findReposWithoutRemote = require("./findReposWithoutRemote");

module.exports = {
  findAllGitRepos,
  findOutdatedRepos,
  findProjectsNotRepos,
  findReposWithoutRemote
};
