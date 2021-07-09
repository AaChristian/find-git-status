import { isFirstRealArgumentSet, isSubstringInArgumentArray, processArguments } from "../../../../src/modules/manageArguments";
import addDirectoryToConfig from "../../../../src/modules/runtimeConfig/addDirectoryToConfig";
import printHelp from "../../../../src/modules/runtimeConfig/printHelp";
import * as helpers from "../../../../src/helpers";
import * as findGitProjects from "../../../../src/modules/findGitProjects";
import { mocked } from "ts-jest/utils";

jest.mock("../../../../src/modules/runtimeConfig/addDirectoryToConfig");
jest.mock("../../../../src/modules/runtimeConfig/printHelp");
jest.mock("../../../../src/helpers");
jest.mock("../../../../src/modules/findGitProjects");
const addDirectoryToConfigMock = mocked(addDirectoryToConfig);
const printHelpMock = mocked(printHelp);
const helpersMock = mocked(helpers);
const findGitProjectsMock = mocked(findGitProjects);


describe("isFirstRealArgumentSet", () => {
  test("should return true", () => {
    expect(isFirstRealArgumentSet("--arg")).toBe(true);
  });

  test("should return false if argument is not given", () => {
    expect(isFirstRealArgumentSet(undefined)).toBe(false);
  });

  test("should return false if argument is an empty string", () => {
    expect(isFirstRealArgumentSet("")).toBe(false);
  });
});

describe("processArguments", () => {
  test("should call addDirectoryToConfig", () => {
    addDirectoryToConfigMock.mockResolvedValue();

    expect.assertions(1);
    return processArguments(["--config-add"]).then(() => {
      expect(addDirectoryToConfigMock.mock.calls.length).toBe(1);
    });
  });

  test("should call createConfigIfNotExist", () => {
    helpersMock.createConfigIfNotExist.mockResolvedValue();

    expect.assertions(1);
    return processArguments(["--init"]).then(() => {
      expect(helpersMock.createConfigIfNotExist.mock.calls.length).toBe(1);
    });
  });

  test("should call findGitStatusSmall", () => {
    findGitProjectsMock.findGitStatusSmall.mockResolvedValue();

    expect.assertions(1);
    return processArguments(["--git-status"]).then(() => {
      expect(findGitProjectsMock.findGitStatusSmall.mock.calls.length).toBe(1);
    });
  });

  test("should call printHelp", () => {
    // printHelpMock.mockResolvedValue();

    expect.assertions(1);
    return processArguments(["--help"]).then(() => {
      expect(printHelpMock.mock.calls.length).toBe(1);
    });
  });
});

describe("isSubstringInArgumentArray", () => {
  test("should return true", () => {
    const argArray = ["--arg1", "--arg2"];
    const arg = "--arg2";
    expect(isSubstringInArgumentArray(arg, argArray)).toBe(true);
  });

  test("should return false", () => {
    const argArray = ["--arg1", "--arg2"];
    const arg = "--arg3";
    expect(isSubstringInArgumentArray(arg, argArray)).toBe(false);
  });
});
