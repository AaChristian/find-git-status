require('dotenv').config();
const fs = require('fs');
const glob = require("glob");
const exec = require('child_process').exec;
const async = require('async');
const output = require('./output');

console.log("Searching " + process.env.DIR_SEARCH);

// console.log(__dirname);

const isProjectCheck = [".env", "readme.md", "README.md", "package.json", "package-lock.json", "composer.json", "composer.lock"];
let ignoreDirs = ["**/node_modules/**", "**/vendor/**"];

// const repositories = [];
// const projectButNotRepo = [];
// const outdatedRepos = [];

let options = {
    ignore: ignoreDirs,
    dot: true
}
const start = async () => {
    console.time("app");
    // Find all dirs where .git dir exist
    const repositories = await findAllGitRepos();

    // Add repos to ignore list
    await addReposToIgnoreList(repositories);

    // Find protential projects that arent git repositories
    const projectButNotRepo = await findProjectsNotRepos(repositories);

    // Check git status on repos
    const outdatedRepos = await findOutdatedRepos(repositories);

    // Print all info
    output.printInfo(repositories, projectButNotRepo, outdatedRepos);
    console.timeEnd("app");
}

const findAllGitRepos = () => {
    return new Promise((resolve, reject) => {
        const repositories = [];
        glob(process.env.DIR_SEARCH + '/**/.git', options, (err, res) => {
            if (err) {
                console.log('Error', err);
            } else {
                // Sort ascending by length of path
                res.sort((a, b) => a.length - b.length);
                // console.log(res);
                res.forEach((path) => {
                    const repo = path.split("/").slice(-2)[0];
                    if (!repositories.includes(repo)) {
                        repositories.push({
                            name: repo,
                            path: path.substring(0, path.lastIndexOf("/"))
                        });
                    }
                });
                // console.log("repositories: ", repositories);
                resolve(repositories);
            }
        });
    });
}

const findProjectsNotRepos = (repositories) => {
    return new Promise((resolve, reject) => {
        const projectButNotRepo = [];
        const projectCheckPattern = process.env.DIR_SEARCH + "/**/*(" + isProjectCheck.join('|') + ")";

        glob(projectCheckPattern, options, (err, res) => {
            if (err) {
                console.log('Error', err);
            } else {
                // Sort ascending by length of path
                res.sort((a, b) => a.length - b.length);
                // console.log(res);
                res.forEach((path) => {
                    const pathArray = path.split("/");
                    const repo = pathArray.slice(-2)[0];
                    // console.log(projectButNotRepo);
                    // console.log(pathArray);
                    // console.log(repo);
                    let repoExistsInProjectArr = projectButNotRepo.some(el => pathArray.includes(el.name));
                    let repoExistsInRepoArr = repositories.some(el => pathArray.includes(el.name));
                    // console.log(repoExistsInProjectArr);
                    // console.log(repoExistsInRepoArr);
                    if (!repoExistsInRepoArr && !repoExistsInProjectArr) {
                        projectButNotRepo.push({
                            name: repo,
                            path: path.substring(0, path.lastIndexOf("/"))
                        });
                    }
                });
                // console.log("projectButNotRepo: ", projectButNotRepo);
                resolve(projectButNotRepo);
            }
        });
    });
}

const addReposToIgnoreList = (repositories) => {
    const ignoredRepos = repositories.map(value => {
        return "**/" + value + "/**";
    });
    ignoreDirs = [...ignoreDirs, ...ignoredRepos];
    options.ignore = ignoreDirs;
    // console.log(options);
}

start();

const findOutdatedRepos = async (repositories) => {

    let outdatedRepos = [];

    const checkGitStatus = (repo, callback) => {
        exec("git status --porcelain", {cwd: repo.path}, (error, stdout, stderr) => {
            if (stdout !== "") {
                const changes = stdout.split("\n").filter(change => {
                    return change !== "";
                });
                outdatedRepos.push({
                    name: repo.name,
                    path: repo.path,
                    changes: changes
                });
            }
            callback();
        });
    }

    return new Promise((resolve, reject) => {
        async.map(repositories, checkGitStatus, () => {
            resolve(outdatedRepos);
        });
    });
}

// const checkIfGitRepo = (path) => {
//     const options = {
//         cwd: path
//     }
//     execute("git rev-parse --is-inside-work-tree", options);
// }

// const execute = (command, options = {}) => {
//     exec(command, options, (error, stdout, stderr) => {
//         console.log('stdout: ' + stdout);
//         console.log('stderr: ' + stderr);
//         if (error !== null) {
//             console.log('exec error: ' + error);
//         } else {
//             callback(stdout)
//         }
//     });
// }
