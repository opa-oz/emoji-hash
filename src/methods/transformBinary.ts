import emojiTable from 'table.js';

const maxBase = Object.keys(emojiTable).length;

export type Options = {
  base: number;
};

const defaultOptions: Options = {
  base: maxBase
};

function transformBinary(input: number, options = defaultOptions): string {
  const stack = [];
  const sign = input < 0 ? emojiTable[0] : '';
  const { base } = options;
  let num;
  let result = '';

  if (base > maxBase) {
    throw new Error(`'base' shouldn't be bigger than ${maxBase}`);
  }

  input = Math.abs(input);

  while (input >= base) {
    num = input % base;
    input = Math.floor(input / base);
    stack.push(emojiTable[num]);
  }

  if (input > 0 && input < base) {
    stack.push(emojiTable[input]);
  }

  for (let i = stack.length - 1; i >= 0; i--) {
    result += stack[i];
  }

  return sign + result;
}

export default transformBinary;
