import Hasher, { getHash, useTable } from '../src';
import fakeTable from '../__mocks__/table';

describe('Usage with different table', () => {
  const originalTable = Hasher.table;
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

  beforeAll(() => {
    useTable(fakeTable);
  });

  afterAll(() => {
    useTable(originalTable);
  });

  testTableForHash.forEach((input) => {
    test('should generate hash correctly with fake table', () => {
      expect(getHash(input)).toMatchSnapshot();
    });
  });
});
