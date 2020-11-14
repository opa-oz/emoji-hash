import emojiTable from './generated/table';
import type { EmojiHasher, EmojiTable, Options } from './types';

class EmojiHasherSingletone implements EmojiHasher {
  table: EmojiTable;
  defaultOptions: Options;
  maxBase: number;

  constructor() {
    this.table = emojiTable as EmojiTable;

    const base = Object.keys(this.table).length;
    this.maxBase = base;
    this.defaultOptions = {
      base
    };
  }

  getHash(input: string, options?: Options): string {
    return this.transformBinary(this.getBitwise(input), options);
  }

  /**
   * @see {@link http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/}
   */
  getBitwise(str: string): number {
    let hash = 0;
    if (str.length == 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);

      hash = (hash << 5) - hash + ch;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  transformBinary(input: number, options?: Options): string {
    const stack = [];
    const sign = input < 0 ? this.table[0] : '';
    const { base, length } = options ?? this.defaultOptions;
    let num;
    let result = '';
    let expectedLength = 0;
    let shouldUseLength = false;

    if (length !== null && length !== undefined && !Number.isNaN(length)) {
      if (length <= 0) {
        throw new Error('property `length` must equals at least 1');
      }

      shouldUseLength = true;
      expectedLength = length - (sign ? 1 : 0);
    }

    if (base > this.maxBase) {
      throw new Error(`'base' mustn't be bigger than ${this.maxBase}`);
    }

    input = Math.abs(input);

    while (input >= base) {
      if (shouldUseLength && stack.length >= expectedLength) {
        break;
      }

      num = input % base;
      input = Math.floor(input / base);
      stack.push(this.table[num]);
    }

    if (input > 0 && input < base) {
      if (!shouldUseLength || (shouldUseLength && stack.length < expectedLength)) {
        stack.push(this.table[input]);
      }
    }

    for (let i = stack.length - 1; i >= 0; i--) {
      result += stack[i];
    }

    return sign + result;
  }

  useTable(newTable: EmojiTable): void {
    if (!newTable || typeof newTable !== 'object' || !Object.keys(newTable).length) {
      throw new Error('newTable must contains dictionary');
    }

    this.table = newTable;
    const base = Object.keys(this.table).length;
    this.maxBase = base;
    this.defaultOptions = { ...this.defaultOptions, base };
  }
}

const instance = new EmojiHasherSingletone();
export const getHash = instance.getHash.bind(instance);
export const useTable = instance.useTable.bind(instance);
export const getBitwise = instance.getBitwise.bind(instance);
export const transformBinary = instance.transformBinary.bind(instance);
export default instance;
