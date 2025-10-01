export enum line {
  GREEN,
  RED,
  NONE
};

export interface StopType {
  nameEN: string,
  nameGA: string,
  line: line,
  code: string
};
