const {
  isFirstRealArgumentSet,
  isSubstringInArgumentArray,
  processArguments
} = require("../../../../src/modules/manageArguments");
const addDirectoryToConfig = require("../../../../src/modules/runtimeConfig/addDirectoryToConfig");
const printHelp = require("../../../../src/modules/runtimeConfig/printHelp");
const helpers = require("../../../../src/helpers");

jest.mock("../../../../src/modules/runtimeConfig/addDirectoryToConfig");
jest.mock("../../../../src/modules/runtimeConfig/printHelp");
jest.mock("../../../../src/helpers");

describe("isFirstRealArgumentSet", () => {
  test("should return true", () => {
    expect(isFirstRealArgumentSet("--arg")).toBe(true);
  });

  test("should return false if argument is not given", () => {
    expect(isFirstRealArgumentSet()).toBe(false);
  });

  test("should return false if argument is an empty string", () => {
    expect(isFirstRealArgumentSet("")).toBe(false);
  });
});

describe("processArguments", () => {
  test("should call addDirectoryToConfig", () => {
    addDirectoryToConfig.mockResolvedValue("test");

    expect.assertions(1);
    return processArguments(["--config-add"]).then(() => {
      expect(addDirectoryToConfig.mock.calls.length).toBe(1);
    });
  });

  test("should call createConfigIfNotExist", () => {
    helpers.createConfigIfNotExist.mockResolvedValue();

    expect.assertions(1);
    return processArguments(["--init"]).then(() => {
      expect(helpers.createConfigIfNotExist.mock.calls.length).toBe(1);
    });
  });

  test("should call printHelp", () => {
    printHelp.mockResolvedValue();

    expect.assertions(1);
    return processArguments(["--help"]).then(() => {
      expect(printHelp.mock.calls.length).toBe(1);
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
