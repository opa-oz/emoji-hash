export type EmojiTable = { [key: string]: string };

export type Options = {
  base: number;
};

export interface EmojiHasher {
  table: EmojiTable;
  defaultOptions: Options;
  maxBase: number;

  getHash(input: string, options?: Options): string;

  getBitwise(str: string): number;

  transformBinary(input: number, options?: Options): string;

  useTable(newTable: EmojiTable): void;
}
