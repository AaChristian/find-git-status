export interface GitProject {
  name: string;
  path: string;
  changes?: string[];
}

export interface Option {
  valid: string[];
  description: string;
}

export interface UserOptions {
  [key: string]: Option;
}

export interface GlobOptions {
  ignore: string[];
  dot: boolean;
}

export interface GlobalConfig {
  isProjectCheck: string[];
  ignoreDirs: string[];
  globOptions: GlobOptions;
}
