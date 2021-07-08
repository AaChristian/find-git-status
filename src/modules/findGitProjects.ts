import fs from "fs";
import path from "path";
let globalConfig = require("../globalConfig");
import printReport from "./printReport";
import { printReposStatus } from "./gitStatus/report/printReportSections";
import { findAllGitRepos, findChangedRepos, findProjectsNotRepos, findReposWithoutRemote, addReposToIgnoreList } from "./gitStatus";

/**
 * Get all potential projects, all git repositories, repos without remote
 * and repos with changes.
 * @returns {Promise<>}
 */
export const findAllProjects = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    let repositories = [];
    let projectButNotRepo = [];
    let changedRepos = [];
    let reposWithoutRemote = [];

    const { directories } = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../config.json"), "utf-8")
    );

    for (let i = 0; i < directories.length; i++) {
      const directory = directories[i];
      console.log("Searching " + directory);
      console.log("globalConfig:", globalConfig);

      // Find all dirs where .git dir exist
      const reposInDir = await findAllGitRepos(
        directory,
        globalConfig.globOptions
      );

      console.log("1251654146161");

      // Add repos to ignore list, return the updated config
      globalConfig = await addReposToIgnoreList(reposInDir, globalConfig);

      // Find protential projects that arent git repositories
      const projectButNotRepoInDir = await findProjectsNotRepos(
        reposInDir,
        directory,
        globalConfig
      );



      // Check git status on repos
      const changedReposInDIr = await findChangedRepos(reposInDir);

      // Find repositores without remote
      const reposWithoutRemoteInDir = await findReposWithoutRemote(reposInDir);

      repositories = [...repositories, ...reposInDir];
      projectButNotRepo = [...projectButNotRepo, ...projectButNotRepoInDir];
      changedRepos = [...changedRepos, ...changedReposInDIr];
      reposWithoutRemote = [...reposWithoutRemote, ...reposWithoutRemoteInDir];
    }



    // Print report of findings
    printReport(
      repositories,
      projectButNotRepo,
      changedRepos,
      reposWithoutRemote
    );

    resolve();
  });
};

export const findGitStatusSmall = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    let repositories = [];
    let changedRepos = [];

    const { directories } = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../config.json"), "utf-8")
    );

    for (let i = 0; i < directories.length; i++) {
      const directory = directories[i];
      // Find all dirs where .git dir exist
      const reposInDir = await findAllGitRepos(
        directory,
        globalConfig.globOptions
      );

      // Check git status on repos
      const changedReposInDIr = await findChangedRepos(reposInDir);

      repositories = [...repositories, ...reposInDir];
      changedRepos = [...changedRepos, ...changedReposInDIr];
    }

    printReposStatus(repositories, changedRepos);

    resolve();
  });
};
