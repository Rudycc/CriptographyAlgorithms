const { createPairs, deleteSpaces, getDictionary, inversemod26 } = require('./../utils')
const { affine, playFair } = require('./../algoritmos')

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

let cipheredMessage = 'VJDO DCPQAED PZLGXLGA IOGGTU MXEWP JT OGY XGTEPWUUO HA GJN NZHQECZEW MCDWA WII XGCMWOUAD HN BOEPCUM JUEDUJ NBHG WRHEEQOXUE OGU WLNC XG LIM'
let messages = [
  {
    plainText:'the only source of knowledge is experience',
    cipher:'GJD HZOB RCJEND HI XGTEPWUUO XC WRHEEQOXUE'
  },
  {
    plainText:'the difference between stupidity and genius is that genius has its limits',
    cipher: 'GJW UXPXUDOZNO BDUREOX JUJVLPGPM BLN UOGLJT XC GJAG UOGLJT JAC XUJ PCQLUJ'
  },
  {
    plainText:'only two things are infinite the universe and human stupidity and im not sure about the former',
    cipher:'TGBF PMM GZLTQJ BDO LGPXGLUD GJO HGLRDBTO ELN QJGBX TNJFCPLUM OGP LQ GMG TJDOEBCJZ ZXD AHBQOD'
  }
]
const start = Date.now()
const dictionary = getDictionary()
const clean = createPairs(deleteSpaces(messages[0].cipher.toLowerCase())).join('')

dictionary.forEach(word => {
  let firstResult = playFair.cipher(messages[0].plainText, word, alphabet)
  for(let key in inversemod26){
    for(let b = 1; b < 26; b++){
      let result = affine.cipher(alphabet, firstResult, {a: Number(key), b: b})
      if(clean === result){
        console.log('Playfair key ',word)
        console.log('Affine key a ', key)
        console.log('Affine key b', b)
        console.log(playFair.descipher(affine.descipher(alphabet, cipheredMessage.toLowerCase(), {a: Number(key), b: b}), word, alphabet))
        const end = Date.now()
        console.log('Time elapsed: ', end - start, ' milliseconds')
        process.exit(0)
      }
    }
  }
})
