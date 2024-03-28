import { getHash } from '../src';
import { describe, test } from '@jest/globals';

const testTable = [
  {
    input1: 'mine input',
    input2: 'mine input',
    expected: true,
    title: 'Should generate the same hash for both inputs'
  },
  {
    input1: 'mine input',
    input2: 'not mine input',
    expected: false,
    title: 'Should generate different hash for different inputs'
  },
  {
    input1:
      'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs',
    input2: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
    expected: false,
    title: 'Should generate different hash for different long inputs'
  },
  {
    input1: 'https://jestjs.io/docs/ru/configuration',
    input2: 'string input',
    expected: false,
    title: 'Should generate hash for urls as well'
  },
  {
    input1: 'https://www.typescriptlang.org',
    input2: 'https://jestjs.io/docs/ru/configuration',
    expected: false,
    title: 'Should generate different hash for different urls'
  },
  {
    input1: 'https://www.typescriptlang.org',
    input2: 'https://www.typescriptlang.org',
    expected: true,
    title: 'Should generate the same hash for the same url'
  }
];

testTable.forEach(({ input1, input2, title, expected }) => {
  test(title, () => {
    const tryOne = getHash(input1);
    const tryTwo = getHash(input2);

    if (process.env.VERBOSE) {
      console.log(
        `| T1: ${tryOne} |\n| T2: ${tryTwo} |\n|Expected: ${expected ? 'Same' : 'Different'} |\n|Result:  ${
          (tryTwo === tryOne) == expected ? '✅' : '🛑'
        } |`
      );
    }
    expect(tryOne === tryTwo).toEqual(expected);
  });
});

const testTableForHash = [
  'https://yandex.ru',
  'https://github.com/opa-oz/emoji-hash',
  'My text is awesome',
  'Hi guys',
  'opa-oz',
  '@gahara',
  'Python',
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
];

testTableForHash.forEach((input) => {
  test('Should generate hash correctly', () => {
    expect(getHash(input)).toMatchSnapshot();
  });
});

describe('Get bitwise not longer than 5 emoji', () => {
  testTableForHash.forEach((input) => {
    test('should generate hash correctly', () => {
      const output = getHash(input, { length: 5, base: 62 });

      // Cannot use symbols count, because of an emoji usually isn't a single symbol
      // expect(output.length).toEqual(5);
      expect(output).toMatchSnapshot();
    });
  });
});
