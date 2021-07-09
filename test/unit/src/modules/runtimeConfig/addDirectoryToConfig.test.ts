const mockFs = require("mock-fs");
import fs from "fs";
import { addDirectoryToConfig } from "../../../../../src/modules/runtimeConfig";
import * as helpers from "../../../../../src/helpers";
import { mocked } from "ts-jest/utils";

jest.mock("../../../../../src/helpers");
const { createConfigIfNotExist } = mocked(helpers);

let config: any
let configPath: string, dirToAdd: string;

beforeEach(() => {
  // Set default variables
  config = { directories: [] };
  configPath = "config.json";
  dirToAdd = "C:/test/path";

  // Mock createConfig function resolve
  createConfigIfNotExist.mockResolvedValue();

  mockFs.mock({
    [configPath]: JSON.stringify(config, null, 2)
  });
});

afterEach(() => {
  mockFs.restore();
});

describe("addDirectoryToConfig", () => {
  test("should write path to file", () => {
    dirToAdd = "C:/test/path";

    expect.assertions(1);
    return addDirectoryToConfig(dirToAdd, configPath).then(() => {
      const { directories } = JSON.parse(fs.readFileSync(configPath, "utf-8"));

      expect(directories).toEqual([dirToAdd]);
    });
  });

  test("should throw error if directory is an empty string", () => {
    dirToAdd = "";

    expect.assertions(1);
    return addDirectoryToConfig(dirToAdd, configPath).catch(error => {
      expect(error).toMatch("Please specify a directory");
    });
  });

  test("should throw error if directory starts with --", () => {
    dirToAdd = "--nextArg";

    expect.assertions(1);
    return addDirectoryToConfig(dirToAdd, configPath).catch(error => {
      expect(error).toMatch("Please specify a directory");
    });
  });

  test("should call createConfigIfNotExist", () => {
    expect.assertions(1);
    return addDirectoryToConfig(dirToAdd, configPath).then(() => {
      expect(createConfigIfNotExist.mock.calls.length).toBe(2);
    });
  });

  test("should not add directory to config if it already exists", () => {
    config = { directories: ["C:/test/path"] };
    dirToAdd = "C:/test/path";

    mockFs.mock({
      [configPath]: JSON.stringify(config, null, 2)
    });

    expect.assertions(1);
    return addDirectoryToConfig(dirToAdd, configPath).catch(error => {
      expect(error).toMatch("Directory already exist");
    });
  });
});
