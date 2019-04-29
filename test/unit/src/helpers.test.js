const mockFs = require("mock-fs");
const fs = require("fs");
const {
  createConfigIfNotExist,
  findLongestValue,
  strOfSpaces,
  lengthOfLongestOptionsList
} = require("../../../src/helpers");

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

describe("findLongestValue", () => {
  const arrayOfObjs = [
    { key1: "str1", key2: "long-string" },
    { key1: "hello", key2: "long-string2" },
    { key1: "str2", key2: "long-string345" }
  ];
  test("should return 5", () => {
    expect(findLongestValue(arrayOfObjs, "key1")).toBe(5);
  });
  test("should return 14", () => {
    expect(findLongestValue(arrayOfObjs, "key2")).toBe(14);
  });
});

describe("strOfSpaces", () => {
  test("should return string of spaces with length of 4", () => {
    expect(strOfSpaces("str1", 7)).toHaveLength(4);
  });
  test("should return string of spaces with length of 17", () => {
    expect(strOfSpaces("string", 22)).toHaveLength(17);
  });
  test("should return string of spaces with length of 1 if length of string is the same as the given number", () => {
    expect(strOfSpaces("str", 3)).toHaveLength(1);
  });
});

describe("lengthOfLongestOptionsList", () => {
  test("should return 9", () => {
    const options = {
      test: { valid: ["-t", "-test"] },
      test2: { valid: ["-t", "-t2"] }
    };

    expect(lengthOfLongestOptionsList(options, ", ")).toBe(9);
    expect(lengthOfLongestOptionsList(options)).toBe(9);
  });
});
