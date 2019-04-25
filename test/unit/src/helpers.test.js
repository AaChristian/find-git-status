const mockFs = require("mock-fs");
const fs = require("fs");
const { createConfigIfNotExist } = require("../../../src/helpers");

beforeEach(() => {
  mockFs.mock();
});

afterEach(() => {
  mockFs.restore();
});

describe("createConfigIfNotExist", () => {
  test("should create file if it not already exists", () => {
    const pathToCheck = "file.json";

    expect(fs.existsSync(pathToCheck)).toBe(false);

    return createConfigIfNotExist(pathToCheck).then(() => {
      expect(fs.existsSync(pathToCheck)).toBe(true);
    });
  });
});
