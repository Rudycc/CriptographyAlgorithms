
let o = {
  ['+']: (a,b) => a + b,
  [56]: 'a',
}
console.log(o['+'](1,2))
console.log(o[56])