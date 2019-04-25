const gitStatus = require("../../../../src/modules/findGitStatus");
const gitStatusModules = require("../../../../src/modules/gitStatus");
const output = require("../../../../src/modules/output");
const fs = require("fs");

jest.mock("../../../../src/modules/gitStatus");
jest.mock("../../../../src/modules/output");
jest.mock("fs");

beforeEach(() => {
  gitStatusModules.addReposToIgnoreList.mockResolvedValue([]);
  gitStatusModules.findAllGitRepos.mockResolvedValue([]);
  gitStatusModules.findProjectsNotRepos.mockResolvedValue([]);
  gitStatusModules.findOutdatedRepos.mockResolvedValue([]);
  gitStatusModules.findReposWithoutRemote.mockResolvedValue([]);

  output.printInfo.mockReturnValue();
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

  test("should call findOutdatedRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return gitStatus().then(() => {
      expect(gitStatusModules.findOutdatedRepos.mock.calls.length).toBe(1);
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

  test("should call printInfo", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return gitStatus().then(() => {
      expect(output.printInfo.mock.calls.length).toBe(1);
    });
  });
});
