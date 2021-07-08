require("dotenv").config();
import { findAllProjects } from "./modules/findGitProjects";
import { isFirstRealArgumentSet, processArguments } from "./modules/manageArguments";

const start = async () => {
  try {
    console.time("app");

    console.log("GIOEROG");

    if (isFirstRealArgumentSet(process.argv[2])) {
      await processArguments(process.argv.slice(2));
    }

    console.log("fefefe");
    if (!isFirstRealArgumentSet(process.argv[2])) {
      console.log("1251654146161");
      await findAllProjects();
    }

    console.timeEnd("app");

  } catch (error) {
    console.log(error)
  }
};

start();

// export default start;
