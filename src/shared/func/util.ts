export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export // this is a direct translation to code of the spec
// @see https://github.com/benjamingr/RegExp.escape
function escapeRegex(S) {
  // 1. let str be ToString(S).
  // 2. ReturnIfAbrupt(str).
  const str = String(S);
  // 3. Let cpList be a List containing in order the code
  // points as defined in 6.1.4 of str, starting at the first element of str.
  const cpList = Array.from(str[Symbol.iterator]());
  // 4. let cuList be a new List
  const cuList = [];
  // 5. For each code point c in cpList in List order, do:
  for (const c of cpList) {
    // i. If c is a SyntaxCharacter then do:
    if ('^$\\.*+?()[]{}|'.indexOf(c) !== -1) {
      // a. Append "\" to cuList.
      cuList.push('\\');
    }
    // Append c to cpList.
    cuList.push(c);
  }
  // 6. Let L be a String whose elements are, in order, the elements of cuList.
  const L = cuList.join('');
  // 7. Return L.
  return L;
}
