const mockFs = require("mock-fs");
const {
  findProjectsNotRepos
} = require("../../../src/modules/gitStatus");
const globalConfig = require("../../../src/globalConfig");

beforeEach(() => {
  mockFs.mock();
});

afterEach(() => {
  mockFs.restore();
});

const repositories = [
  { name: "proj", path: "testDir/proj" },
  { name: "proj2", path: "testDir/dir2/proj2" }
];

describe("findProjectsNotRepos", () => {
  test("should return empty array if no arguments is given", () => {
    expect.assertions(1);
    return findProjectsNotRepos().catch(error => {
      expect(error).toMatch("Missing arguments");
    });
  });

  test("should return empty array if only two is given", () => {
    expect.assertions(1);
    return findProjectsNotRepos([], "dir1").catch(error => {
      expect(error).toMatch("Missing arguments");
    });
  });

  test("should return empty array if directory is not a project", () => {
    mockFs.mock({
      testDir: {
        dir1: {
          "test.txt": "file content"
        }
      }
    });

    expect.assertions(1);

    return findProjectsNotRepos(repositories, "testDir", globalConfig).then(
      result => {
        expect(result).toHaveLength(0);
      }
    );
  });

  test("should return empty array if a potential project has already been marked as a git repo", () => {
    mockFs.mock({
      testDir: {
        dir1: { "test.txt": "file content", dir2: {} },
        dir2: {
          "test.txt": "file content",
          proj: { ".git": {}, ".gitignore": "content" },
          proj2: { ".gitignore": "..", ".env": "content" }
        }
      }
    });

    expect.assertions(1);

    return findProjectsNotRepos(repositories, "testDir", globalConfig).then(
      result => {
        expect(result).toHaveLength(0);
      }
    );
  });

  test("should return array with one element", () => {
    mockFs.mock({
      testDir: {
        dir1: { "test.txt": "file content", dir2: {} },
        dir2: {
          "test.txt": "file content",
          proj: { ".git": {}, ".gitignore": "content" },
          proj2: { ".gitignore": "..", ".env": "content" },
          proj3: { ".gitignore": "..", ".env": "content" }
        }
      }
    });

    expect.assertions(2);

    return findProjectsNotRepos(repositories, "testDir", globalConfig).then(
      result => {
        expect(result).toHaveLength(1);
        expect(result).toEqual([{ name: "proj3", path: "testDir/dir2/proj3" }]);
      }
    );
  });

  test.each(globalConfig.isProjectCheck)(
    "should return array with one element when checking for %s",
    a => {
      mockFs.mock({
        testDir: { testProject: { [a]: "content" } }
      });

      expect.assertions(2);

      return findProjectsNotRepos(repositories, "testDir", globalConfig).then(
        result => {
          expect(result).toHaveLength(1);
          expect(result).toEqual([
            { name: "testProject", path: "testDir/testProject" }
          ]);
        }
      );
    }
  );
});
