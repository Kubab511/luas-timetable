export enum line {
  GREEN,
  RED
};

export interface stop {
  nameEN: string,
  nameGA: string,
  line: line,
  code: string
};