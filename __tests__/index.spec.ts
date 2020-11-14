import getHash from '../src';

test('should return proper hash each time', () => {
  const INPUT = 'my input';
  const tryOne = getHash(INPUT);
  const tryTwo = getHash(INPUT);

  expect(tryOne).toEqual(tryTwo);
});
