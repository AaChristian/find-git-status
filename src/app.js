require("dotenv").config();
const gitStatus = require("./modules/findGitStatus");
const {
  isFirstRealArgumentSet,
  processArguments
} = require("./modules/manageArguments");

const start = () => {
  return new Promise(async (resolve, reject) => {
    console.time("app");

    if (isFirstRealArgumentSet(process.argv[2])) {
      await processArguments(process.argv.slice(2));
    }

    if (!isFirstRealArgumentSet(process.argv[2])) {
      await gitStatus();
    }

    console.timeEnd("app");
    resolve();
  });
};

start();

module.exports = start;
