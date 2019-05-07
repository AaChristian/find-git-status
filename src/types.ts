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
