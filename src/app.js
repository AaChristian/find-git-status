require("dotenv").config();
const { gitStatus } = require("./modules/findGitStatus");

const start = async () => {
  console.time("app");
  await gitStatus();
  console.timeEnd("app");
};

start();
