const gitStatus = require("../../../../src/modules/findGitStatus");
const gitStatusModules = require("../../../../src/modules/gitStatus");
const printReport = require("../../../../src/modules/printReport");
const fs = require("fs");

jest.mock("../../../../src/modules/gitStatus");
jest.mock("../../../../src/modules/printReport");
jest.mock("fs");

beforeEach(() => {
  gitStatusModules.addReposToIgnoreList.mockResolvedValue([]);
  gitStatusModules.findAllGitRepos.mockResolvedValue([]);
  gitStatusModules.findProjectsNotRepos.mockResolvedValue([]);
  gitStatusModules.findChangedRepos.mockResolvedValue([]);
  gitStatusModules.findReposWithoutRemote.mockResolvedValue([]);

  printReport.mockReturnValue();
});

afterEach(() => {
  // Reset mocks
  jest.resetAllMocks();
});

describe("gitStatus", () => {
  test("should call addReposToIgnoreList", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return gitStatus().then(() => {
      expect(gitStatusModules.addReposToIgnoreList.mock.calls.length).toBe(1);
    });
  });

  test("should call findAllGitRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return gitStatus().then(() => {
      expect(gitStatusModules.findAllGitRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findProjectsNotRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return gitStatus().then(() => {
      expect(gitStatusModules.findProjectsNotRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findChangedRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return gitStatus().then(() => {
      expect(gitStatusModules.findChangedRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findReposWithoutRemote", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return gitStatus().then(() => {
      expect(gitStatusModules.findReposWithoutRemote.mock.calls.length).toBe(1);
    });
  });

  test("should call printReport", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return gitStatus().then(() => {
      expect(printReport.mock.calls.length).toBe(1);
    });
  });
});
