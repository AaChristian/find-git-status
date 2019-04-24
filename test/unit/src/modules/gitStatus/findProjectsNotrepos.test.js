const mockFs = require("mock-fs");
const {
  findProjectsNotRepos
} = require("../../../../../src/modules/gitStatus");
const { isProjectCheck } = require("../../../../../src/globalConfig");

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
  test("should return empty array if no directory is given", () => {
    return findProjectsNotRepos().then(result => {
      expect(result).toEqual([]);
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
    return findProjectsNotRepos(repositories, "testDir").then(result => {
      expect(result).toHaveLength(0);
    });
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

    return findProjectsNotRepos(repositories, "testDir").then(result => {
      expect(result).toHaveLength(0);
    });
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

    return findProjectsNotRepos(repositories, "testDir").then(result => {
      expect(result).toHaveLength(1);
      expect(result).toEqual([{ name: "proj3", path: "testDir/dir2/proj3" }]);
    });
  });

  test.each(isProjectCheck)(
    "should return array with one element when checking for %s",
    a => {
      mockFs.mock({
        testDir: { testProject: { [a]: "content" } }
      });

      return findProjectsNotRepos(repositories, "testDir").then(result => {
        expect(result).toHaveLength(1);
        expect(result).toEqual([
          { name: "testProject", path: "testDir/testProject" }
        ]);
      });
    }
  );
});
