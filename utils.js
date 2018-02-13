const fs = require('fs')
const getDictionary = () => {
  let contents = fs.readFileSync('dictionary.txt','utf8');
  return contents.split('\n').map(word => word.toLowerCase()).filter(word => !word.includes("'"))
}
const deleteSpaces = m => m.split(' ').join('')
const createPairs = m => m.match(/.{1,2}/g)
const inversemod26 = {
  [1]: 1,
  [3]: 9,
  [5]: 21,
  [7]: 15,
  [9]: 3,
  [11]: 19,
  [15]: 7,
  [17]: 23,
  [19]: 11,
  [21]: 5,
  [23]: 17,
  [25]: 25,
}

const englishAlphabet =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const getVigenereMatrix = () => {
  let currentAlphabet = ['z','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']
  return currentAlphabet.map((letter) => {
  let out = currentAlphabet.shift()
  currentAlphabet.push(out)
  return [...currentAlphabet]
})
}

module.exports = {
  deleteSpaces,
  createPairs,
  getDictionary,
  inversemod26,
  englishAlphabet,
  getVigenereMatrix
}