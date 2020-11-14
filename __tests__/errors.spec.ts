import { getBitwise, transformBinary } from '../src';

test('Should throw an error when gets incorrect base', () => {
  const f = () => transformBinary(getBitwise('random input'), { base: 100 });

  expect(f).toThrowError();
});

describe('When gets incorrect length', () => {
  const testTable = [0, -1, -200, -1000];

  testTable.forEach((length) => {
    test(`should throw an error (length=${length})`, () => {
      const f = () => transformBinary(getBitwise('random input'), { base: 62, length });

      expect(f).toThrowError();
    });
  });
});
