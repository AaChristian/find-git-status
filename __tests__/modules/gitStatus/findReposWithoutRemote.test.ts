const {
  findReposWithoutRemote
} = require("../../../src/modules/gitStatus");
const { exec } = require("child_process");

jest.mock("child_process");

beforeEach(() => {
  // Reset mock so that mockResolvedValueOnce works correctly
  exec.mockReset();
});

describe("findReposWithoutRemote", () => {
  test("should return empty array if no repositories is given", () => {
    const repositories = [];

    exec.mockImplementation((cmd, opt, cb) => cb(null, "test", null));

    return findReposWithoutRemote(repositories).then(result => {
      expect(result).toEqual([]);
      expect(exec.mock.calls.length).toBe(0);
    });
  });

  test("should return empty array if none all repositories have remote URLs", () => {
    const repositories = [
      { name: "proj", path: "testDir/proj" },
      { name: "proj2", path: "testDir/dir2/proj2" }
    ];

    exec
      .mockImplementationOnce((cmd, opt, cb) =>
        cb(null, "remote url one", null)
      )
      .mockImplementationOnce((cmd, opt, cb) =>
        cb(null, "remote url two", null)
      );

    return findReposWithoutRemote(repositories).then(result => {
      expect(result).toEqual([]);
      expect(exec.mock.calls.length).toBe(2);
    });
  });

  test("should return array with one element if one of the repositories does not have remote", () => {
    const repositories = [
      { name: "proj", path: "testDir/proj" },
      { name: "proj2", path: "testDir/dir2/proj2" },
      { name: "proj3", path: "testDir/dir2/proj3" }
    ];

    exec
      .mockImplementationOnce((cmd, opt, cb) =>
        cb(null, "remote url one", null)
      )
      .mockImplementationOnce((cmd, opt, cb) => cb(null, "", null))
      .mockImplementationOnce((cmd, opt, cb) =>
        cb(null, "remote url three", null)
      );

    const expectedResult = [{ name: "proj2", path: "testDir/dir2/proj2" }];

    return findReposWithoutRemote(repositories).then(result => {
      expect(result).toEqual(expectedResult);
      expect(exec.mock.calls.length).toBe(3);
    });
  });

  test("should ", () => { });
});
