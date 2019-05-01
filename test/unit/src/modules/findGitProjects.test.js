const {
  findAllProjects,
  findGitStatusSmall
} = require("../../../../src/modules/findGitProjects");
const gitStatusModules = require("../../../../src/modules/gitStatus");
const printReport = require("../../../../src/modules/printReport");
const printReportSections = require("../../../../src/modules/gitStatus/report/printReportSections");
const fs = require("fs");

jest.mock("../../../../src/modules/gitStatus");
jest.mock("../../../../src/modules/printReport");
jest.mock("../../../../src/modules/gitStatus/report/printReportSections");
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

describe("findAllProjects", () => {
  test("should call addReposToIgnoreList", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusModules.addReposToIgnoreList.mock.calls.length).toBe(1);
    });
  });

  test("should call findAllGitRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusModules.findAllGitRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findProjectsNotRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusModules.findProjectsNotRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findChangedRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusModules.findChangedRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findReposWithoutRemote", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusModules.findReposWithoutRemote.mock.calls.length).toBe(1);
    });
  });

  test("should call printReport", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(printReport.mock.calls.length).toBe(1);
    });
  });
});

describe("findGitStatusSmall", () => {
  test("should call findAllGitRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findGitStatusSmall().then(() => {
      expect(gitStatusModules.findAllGitRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findChangedRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findGitStatusSmall().then(() => {
      expect(gitStatusModules.findChangedRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call printReposStatus", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findGitStatusSmall().then(() => {
      expect(printReportSections.printReposStatus.mock.calls.length).toBe(1);
    });
  });
});
