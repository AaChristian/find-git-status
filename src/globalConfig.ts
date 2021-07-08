/**
 * The files that indicate if a directory is a coding project
 */
const isProjectCheck = [
  ".env",
  "readme.md",
  "README.md",
  "package.json",
  "package-lock.json",
  "composer.json",
  "composer.lock"
];

/**
 * Directories to ignore while traversing the file system
 */
let ignoreDirs = ["**/node_modules/**", "**/vendor/**"];

/**
 * The options to use when traversing the file system using glob
 */
let globOptions = {
  ignore: ignoreDirs,
  dot: true
};

export {
  isProjectCheck,
  ignoreDirs,
  globOptions
};
