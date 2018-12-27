const printInfo = (repositories, projectButNotRepo, outdatedRepos) => {

    // Print general info
    printInfoSmall(repositories, projectButNotRepo, outdatedRepos);

    // Print all repos
    printRepos(repositories);
    // Print repos that have changes not commited
    printChangedRepos(outdatedRepos);
    // Print projects that are not repos
    printProjectsNotRepos(projectButNotRepo);
}

const printInfoSmall = (repositories, projectButNotRepo, outdatedRepos) => {
    console.log("\nProjects found:\t\t" + (repositories.length + projectButNotRepo.length));
    console.log("Repositories found:\t" + repositories.length);
    console.log("Repositories outdated:\t" + outdatedRepos.length);
    console.log("Projects but not repos:\t" + projectButNotRepo.length + "\n");
}

const printRepos = (repositories) => {

    const titleText = "Projects with git repositories";
    printTitle(titleText, repositories.length);

    const longestValue = findLongestValue(repositories, "name");
    let tab = tabs("Repository", longestValue);

    console.log(`Repository${tab}| Path`);
    console.log('-'.repeat(process.stdout.columns - 1));

    repositories.map(repo => {
        const tab = tabs(repo.name, longestValue);
        console.log(`${repo.name}${tab}| ${repo.path}`);
    });
    console.log("");
}

const printProjectsNotRepos = (projectButNotRepo) => {

    const titleText = "Projects without git repositories";
    printTitle(titleText, projectButNotRepo.length);

    const longestValue = findLongestValue(projectButNotRepo, "name");
    let tab = tabs("Project", longestValue);

    console.log(`Project${tab}| Path`);
    console.log('-'.repeat(process.stdout.columns - 1));

    projectButNotRepo.map(repo => {
        const tab = tabs(repo.name, longestValue);
        console.log(`${repo.name}${tab}| ${repo.path}`);
    });
    console.log("");
}

const printChangedRepos = (outdatedRepos) => {

    const titleText = "Repositories with uncommited changes";
    printTitle(titleText, outdatedRepos.length);

    const longestName = findLongestValue(outdatedRepos, "name");
    const longestPath = findLongestValue(outdatedRepos, "path");

    let tabName = tabs("Repository", longestName);
    let tabPath = tabs("Path", longestPath);

    console.log(`Repository${tabName}| Path${tabPath}| Changes`);
    console.log('-'.repeat(process.stdout.columns - 1));

    outdatedRepos.map(repo => {
        repo.changes.map((change, index) => {
            let name = "";
            let path = "";
            if (index === 0) {
                name = repo.name;
                path = repo.path;
            }
            const tabName = tabs(name, longestName);
            const tabPath = tabs(path, longestPath);

            console.log(`${name}${tabName}| ${path}${tabPath}| ${change}`);
        });
        console.log('-'.repeat(process.stdout.columns - 1));
    });
}

const printTitle = (titleText, found) => {
    const cliLength = process.stdout.columns - 1;

    console.log('='.repeat(cliLength));
    console.log(' '.repeat((cliLength / 2) - (titleText.length / 2)) + titleText);
    console.log("Found: " + found);
    console.log('='.repeat(cliLength));
}

const findLongestValue = (object, property) => {
    let length = 0;
    Object.keys(object).forEach(key => {
        const str = object[key][property];
        if (str.length > length) {
            length = str.length;
        }
    })
    return length;
}

const tabs = (str, longestValue) => {
    const lengthDiff = longestValue - str.length;
    const tab = " ".repeat(lengthDiff > 0 ? lengthDiff + 1 : 1)
    return tab;
}

module.exports = {
    printInfo
};
