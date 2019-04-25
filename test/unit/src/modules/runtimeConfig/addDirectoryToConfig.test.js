const mockFs = require("mock-fs");
const fs = require("fs");
const {
  addDirectoryToConfig
} = require("../../../../../src/modules/runtimeConfig");

beforeEach(() => {
  mockFs.mock();
});

afterEach(() => {
  mockFs.restore();
});

describe("addDirectoryToConfig", () => {
  test("should write path to file", () => {
    const config = { directories: [] };
    const configPath = "config.json";
    const dirToAdd = "C:/test/path";
    mockFs.mock({
      [configPath]: JSON.stringify(config, null, 2)
    });

    expect.assertions(1);
    return addDirectoryToConfig(dirToAdd, configPath).then(() => {
      const { directories } = JSON.parse(fs.readFileSync(configPath), "utf-8");

      expect(directories).toEqual([dirToAdd]);
    });
  });

  test("should throw error if path is an empty string", () => {
    const config = { directories: [] };
    const configPath = "config.json";
    const dirToAdd = "";
    mockFs.mock({
      [configPath]: JSON.stringify(config, null, 2)
    });

    expect.assertions(1);
    return addDirectoryToConfig(dirToAdd, configPath).catch(error => {
      expect(error).toMatch("Please specify a directory");
    });
  });

  test("should throw error if path starts with --", () => {
    const config = { directories: [] };
    const configPath = "config.json";
    const dirToAdd = "--nextArg";
    mockFs.mock({
      [configPath]: JSON.stringify(config, null, 2)
    });

    expect.assertions(1);
    return addDirectoryToConfig(dirToAdd, configPath).catch(error => {
      expect(error).toMatch("Please specify a directory");
    });
  });
});
