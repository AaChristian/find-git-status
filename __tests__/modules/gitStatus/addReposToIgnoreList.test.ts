const {
  addReposToIgnoreList
} = require("../../../src/modules/gitStatus");
const globalConfig = require("../../../src/globalConfig");

describe("addReposToIgnoreList", () => {
  test("should add repos to ignore list", () => {
    const lengthBefore = globalConfig.ignoreDirs.length;

    const reposToAdd = ["testDir"];
    const expectedNewIgnoreDirs = [...globalConfig.ignoreDirs, "**/testDir/**"];

    expect.assertions(3);

    return addReposToIgnoreList(reposToAdd, globalConfig).then(
      newGlobalConfig => {
        expect(newGlobalConfig.ignoreDirs).toHaveLength(
          lengthBefore + reposToAdd.length
        );
        expect(newGlobalConfig.ignoreDirs).toEqual(expectedNewIgnoreDirs);

        globalConfig.ignoreDirs = expectedNewIgnoreDirs;

        expect(newGlobalConfig).toEqual(globalConfig);
      }
    );
  });
});
