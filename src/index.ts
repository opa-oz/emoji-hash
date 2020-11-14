import transformBinary from './methods/transformBinary';
import getBitwise from './methods/getBitwise';

function getHash(input: string): string {
  return transformBinary(getBitwise(input));
}

export default getHash;
