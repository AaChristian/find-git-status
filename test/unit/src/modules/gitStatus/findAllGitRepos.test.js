const mockFs = require("mock-fs");
const { findAllGitRepos } = require("../../../../../src/modules/gitStatus");
const { globOptions } = require("../../../../../src/globalConfig");

beforeEach(() => {
  mockFs.mock();
});

afterEach(() => {
  mockFs.restore();
});

describe("findAllGitRepos", () => {
  test("should reject if no arguments given", () => {
    expect.assertions(1);
    return findAllGitRepos().catch(error => {
      expect(error).toMatch("Missing arguments");
    });
  });

  test("should reject if only one argument is given", () => {
    expect.assertions(1);
    return findAllGitRepos().catch(error => {
      expect(error).toMatch("Missing arguments");
    });
  });

  test("should return empty array if no directory is given", () => {
    expect.assertions(1);
    return findAllGitRepos("", globOptions).then(result => {
      expect(result).toEqual([]);
    });
  });

  test("should return empty array if directory is not a git repo", () => {
    mockFs.mock({
      testDir: {
        dir1: {
          "test.txt": "file content"
        }
      }
    });

    expect.assertions(1);

    return findAllGitRepos("testDir", globOptions).then(result => {
      expect(result).toHaveLength(0);
    });
  });

  test("should return empty array even if a directory inside node_modules is a git repository", () => {
    mockFs.mock({
      testDir: {
        dir1: {
          "test.txt": "file content",
          dir2: { node_modules: { pack1: { ".git": "content" } } }
        }
      }
    });

    expect.assertions(1);

    return findAllGitRepos("testDir", globOptions).then(result => {
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
          proj2: { ".gitignore": "..", ".env": "content" }
        }
      }
    });

    expect.assertions(2);

    return findAllGitRepos("testDir", globOptions).then(result => {
      expect(result).toHaveLength(1);
      expect(result).toEqual([{ name: "proj", path: "testDir/dir2/proj" }]);
    });
  });

  test("should return array with 3 elements", () => {
    mockFs.mock({
      testDir: {
        dir1: { "test.txt": "file content", dir2: {} },
        dir2: {
          "test.txt": "file content",
          proj: { ".git": {}, ".gitignore": "content" }
        },
        subDir: {
          "test.txt": "file content",
          dir3: { proj2: { ".git": {}, ".gitignore": "content" } },
          dir4: {
            proj3: { ".git": { config: "conf content" }, ".env": "content" }
          }
        }
      }
    });

    expect.assertions(2);

    return findAllGitRepos("testDir", globOptions).then(result => {
      expect(result).toHaveLength(3);
      expect(result).toEqual([
        { name: "proj", path: "testDir/dir2/proj" },
        { name: "proj2", path: "testDir/subDir/dir3/proj2" },
        { name: "proj3", path: "testDir/subDir/dir4/proj3" }
      ]);
    });
  });
});
