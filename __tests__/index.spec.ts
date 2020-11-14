import { getHash } from '../src';

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
