import { findAllProjects, findGitStatusSmall } from "../../src/modules/findGitProjects";
import * as gitStatus from "../../src/modules/gitStatus";
import printReport from "../../src/modules/printReport";
import * as printReportSections from "../../src/modules/gitStatus/report/printReportSections";
import fs from "fs";
import { mocked } from "ts-jest/utils";

jest.mock("../../src/modules/gitStatus");
jest.mock("../../src/modules/printReport");
jest.mock("../../src/modules/gitStatus/report/printReportSections");
jest.mock("fs");
const gitStatusMock = mocked(gitStatus);
const printReportMock = mocked(printReport);
const printReportSectionsMock = mocked(printReportSections);

beforeEach(() => {
  gitStatusMock.addReposToIgnoreList.mockResolvedValue({
    isProjectCheck: [],
    ignoreDirs: [],
    globOptions: {
      ignore: [],
      dot: true,
    }
  });
  gitStatusMock.findAllGitRepos.mockResolvedValue([]);
  gitStatusMock.findProjectsNotRepos.mockResolvedValue([]);
  gitStatusMock.findChangedRepos.mockResolvedValue([]);
  gitStatusMock.findReposWithoutRemote.mockResolvedValue([]);

  printReportMock.mockReturnValue();
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
      expect(gitStatusMock.addReposToIgnoreList.mock.calls.length).toBe(1);
    });
  });

  test("should call findAllGitRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusMock.findAllGitRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findProjectsNotRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusMock.findProjectsNotRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findChangedRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusMock.findChangedRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findReposWithoutRemote", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(gitStatusMock.findReposWithoutRemote.mock.calls.length).toBe(1);
    });
  });

  test("should call printReport", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findAllProjects().then(() => {
      expect(printReportMock.mock.calls.length).toBe(1);
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
      expect(gitStatusMock.findAllGitRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call findChangedRepos", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findGitStatusSmall().then(() => {
      expect(gitStatusMock.findChangedRepos.mock.calls.length).toBe(1);
    });
  });

  test("should call printReposStatus", () => {
    fs.readFileSync = jest
      .fn()
      .mockReturnValue(JSON.stringify({ directories: ["testDir1"] }, null, 2));

    expect.assertions(1);
    return findGitStatusSmall().then(() => {
      expect(printReportSectionsMock.printReposStatus.mock.calls.length).toBe(1);
    });
  });
});
