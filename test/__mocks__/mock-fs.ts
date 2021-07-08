/**
 * This mocks the mock-fs package to allow console.logs in the code.
 */

const fsMock = jest.genMockFromModule("mock-fs") as any;
// import * as fsMock from "mock-fs";

let logsTemp = [];
let logMock;

exports.mock = config => {
  logMock = jest.spyOn(console, "log").mockImplementation((...args) => {
    logsTemp.push(args);
  });
  fsMock(config);
};

exports.restore = () => {
  logMock.mockRestore();
  fsMock.restore();
  logsTemp.map(el => console.log(...el));
  logsTemp = [];
};
