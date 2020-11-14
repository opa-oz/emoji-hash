/**
 * @see {@link http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/}
 */
function getBitwise(str: string): number {
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

export default getBitwise;
