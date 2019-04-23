require("dotenv").config();
const gitStatus = require("./modules/gitStatus.js");

const start = async () => {
  console.time("app");
  await gitStatus();
  console.timeEnd("app");
};

start();
