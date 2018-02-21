const { createPairs, deleteSpaces, inversemod26 } = require('./utils')

const caesar = {
  cipher: (alphabet, message, key) => {
    let messageArray = deleteSpaces(message).split('')
    return messageArray.map(letter => {
      let index = alphabet.findIndex(l => l === letter)
      index += key;
      index = index<0? alphabet.length + index: index
      index %= alphabet.length
      return alphabet[index]
    }).join('')
  },
  descipher: (alphabet, message, key) => {
    key = -key
    let messageArray = deleteSpaces(message).split('')
    return messageArray.map(letter => {
      let index = alphabet.findIndex(l => l === letter)
      index += key;
      index = index<0? alphabet.length + index: index
      index %= alphabet.length
      return alphabet[index]
    }).join('')
  },
} 

const affine = {
  cipher: (alphabet, message, key) => {
    let messageArray = deleteSpaces(message).split('')
    return messageArray.map(letter => {
      let index = alphabet.findIndex(l => l === letter)
      index *= key.a;
      index += key.b;
      index = index<0? alphabet.length + index: index
      index %= alphabet.length
      return alphabet[index]
    }).join('')
  },
  descipher: (alphabet, message, key) => {
    let messageArray = deleteSpaces(message).split('')
    return messageArray.map(letter => {
      let index = alphabet.findIndex(l => l === letter)
      index -= key.b;
      index = index<0? alphabet.length + index: index
      index *= inversemod26[key.a];
      index %= alphabet.length
      return alphabet[index]
    }).join('')
  },
}

const playFair = {
  cipher: (message, key, alphabet) => {
    let set = new Set
    key.split('').forEach(letter => {
      if(letter !== 'j')
        set.add(letter)
    })
    alphabet.forEach(letter => {
      if(letter !== 'j')
        set.add(letter)
    })
    let array = [...set]
    let pairs = createPairs(deleteSpaces(message))
    let ciphered = pairs.map(pair => {
      pair += pair.length !== 2 ? 'x' : ''
      let firstIndex = array.findIndex(i => pair[0] === 'j'? i === 'i' : i === pair[0])
      let secondIndex = array.findIndex(i => pair[1] === 'j'? i === 'i' : i === pair[1])
      let firstCoord = {
        column: firstIndex % 5,
        row: Math.floor(firstIndex/5),
      }
      let secondCoord = {
        column: secondIndex % 5,
        row: Math.floor(secondIndex/5),
      }
      let newfirstCoord, newSecondCoord = {}
      if(firstCoord.row === secondCoord.row){
        newfirstCoord = {
          column: (firstCoord.column + 1) % 5,
          row: firstCoord.row,
        }
        newSecondCoord = {
          column: (secondCoord.column + 1) % 5,
          row: secondCoord.row,
        }
      } else if(firstCoord.column === secondCoord.column){
        newfirstCoord = {
          column: firstCoord.column,
          row: (firstCoord.row + 1) % 5,
        }
        newSecondCoord = {
          column: secondCoord.column,
          row: (secondCoord.row + 1) % 5,
        }
      } else {
        newfirstCoord = {
          column: secondCoord.column,
          row: firstCoord.row,
        }
        newSecondCoord = {
          column: firstCoord.column,
          row: secondCoord.row,
        }
      }
      return '' + array[(newfirstCoord.row * 5) + newfirstCoord.column] + array[(newSecondCoord.row * 5) + newSecondCoord.column]
    })
    return ciphered.join(' ')
  },
  descipher: (message, key, alphabet) => {
    let set = new Set
    key.split('').forEach(letter => {
      if(letter !== 'j')
        set.add(letter)
    })
    alphabet.forEach(letter => {
      if(letter !== 'j')
        set.add(letter)
    })
    let array = [...set]
    let pairs = createPairs(deleteSpaces(message))
    let ciphered = pairs.map(pair => {
      pair += pair.length !== 2 ? 'x' : ''
      let firstIndex = array.findIndex(i => pair[0] === 'j'? i === 'i' : i === pair[0])
      let secondIndex = array.findIndex(i => pair[1] === 'j'? i === 'i' : i === pair[1])
      let firstCoord = {
        column: firstIndex % 5,
        row: Math.floor(firstIndex/5),
      }
      let secondCoord = {
        column: secondIndex % 5,
        row: Math.floor(secondIndex/5),
      }
      let newfirstCoord, newSecondCoord = {}
      if(firstCoord.row === secondCoord.row){
        newfirstCoord = {
          column: firstCoord.column - 1 < 0? 4 : (firstCoord.column - 1) % 5,
          row: firstCoord.row,
        }
        newSecondCoord = {
          column: secondCoord.column - 1 < 0? 4:(secondCoord.column - 1) % 5,
          row: secondCoord.row,
        }
      } else if(firstCoord.column === secondCoord.column){
        newfirstCoord = {
          column: firstCoord.column,
          row: firstCoord.row - 1 < 0? 4 : (firstCoord.row - 1) % 5,
        }
        newSecondCoord = {
          column: secondCoord.column,
          row: secondCoord.row - 1 < 0? 4: (secondCoord.row - 1) % 5,
        }
      } else {
        newfirstCoord = {
          column: secondCoord.column,
          row: firstCoord.row,
        }
        newSecondCoord = {
          column: firstCoord.column,
          row: secondCoord.row,
        }
      }
      return '' + array[(newfirstCoord.row * 5) + newfirstCoord.column] + array[(newSecondCoord.row * 5) + newSecondCoord.column]
    })
    return ciphered.join(' ')
  },
}

const vigenere = {
  cipher: (alphabet, matrix, message, key) => {
    let messageArray = deleteSpaces(message).match(new RegExp(`.{1,${key.length}}`, "g"))
    return messageArray.map(section => {
      return section.split('').map((s,index) => {
        let firstIndex = alphabet.findIndex(l => l === key[index])
        let secondIndex = alphabet.findIndex(l => l === s)
        return matrix[firstIndex][secondIndex]
      }).join('')
    }).join('')
  },
  descipher: (alphabet, matrix, message, key) => {
    let messageArray = deleteSpaces(message).match(new RegExp(`.{1,${key.length}}`, "g"))
    return messageArray.map(section => {
      return section.split('').map((s,index) => {
        let firstIndex = alphabet.findIndex(l => l === key[index])
        let secondIndex = matrix[firstIndex].findIndex(l => l === s)
        return alphabet[secondIndex]
      }).join('')
    }).join('')
  }
}

const railFence = {
  cipher: (message, key) => {
    let cleanMessage = deleteSpaces(message)
    let rails = []
    for(let i = 0; i < key; i++){
      rails.push([])
    }
    let index = 0
    let wordIndex = 0
    while(wordIndex < cleanMessage.length){
      while(index < key){
        if(wordIndex >= cleanMessage.length){
          break
        }
        rails[index].push(cleanMessage[wordIndex])
        wordIndex++
        index++
      }
      index = key - 2
      while(index >= 0){
        if(wordIndex >= cleanMessage.length){
          break
        }
        rails[index].push(cleanMessage[wordIndex])
        wordIndex++
        index--
      }
      index = 1
    }
    return rails.map(rail => rail.join('')).join('')
  },
  descipher: (message, key) => {
    let numberLetters = (key * 2) -2
    let cleanMessage = deleteSpaces(message)
    let places = []
    let rails = []
    for(let i = 0; i < key; i++){
      rails.push([])
    }
    let index = 0
    let wordPosition = 0
    for(wordPosition = 0; wordPosition < cleanMessage.length; wordPosition++){
      if(index < cleanMessage.length){
        places.push({
          positon: index,
          letter: cleanMessage[wordPosition],
        })
        index += numberLetters
      } else break
    }
    for(let j = 1; j< key-1; j++){
      let secondI = j
      for(wordPosition; wordPosition < cleanMessage.length; wordPosition++){
        if(secondI < cleanMessage.length){
          places.push({
            positon: secondI,
            letter: cleanMessage[wordPosition],
          })
        }else break
        if((secondI + numberLetters - (2 * j)) < cleanMessage.length){
          places.push({
            positon: secondI + numberLetters - (2 * j),
            letter: cleanMessage[wordPosition+1],
          })
          wordPosition++
          secondI += numberLetters
        } else break
      }
    }
    let thirdIndex = key-1
    for(wordPosition; wordPosition < cleanMessage.length; wordPosition++){
      if(thirdIndex < cleanMessage.length){
        places.push({
          positon: thirdIndex,
          letter: cleanMessage[wordPosition],
        })
        thirdIndex += numberLetters
      } else break
    }
    let desciphered = ''
    for(let i=0; i < cleanMessage.length; i++){
      let pair = places.find(e => e.positon === i)
      desciphered += pair.letter
    }
    return desciphered
  }
}

const columnar = {
  cipher: (message, key, alphabet) => {
    let cleanMessage = deleteSpaces(message)
    let table = []
    let messageArray = cleanMessage.match(new RegExp(`.{1,${key.length}}`, "g"))
    key.split('').forEach((k) => {
      table.push([])
      
    })
    messageArray.forEach(m => {
      m.split('').forEach((p, i) => {
        table[i].push(p)
      })
    })
    let orderedTable = []
    alphabet.forEach(letter => {
      key.split('').forEach((part, index) => {
        if(letter === part){
          orderedTable.push(table[index])
        }
      })
    })
    return orderedTable.map(column => column.join('')).join('')
  },
  descipher: (message, key, alphabet) => {
    let cleanMessage = deleteSpaces(message)
    let orderedKey = ''
    let orders = key.split('').map(x => 0)
    let currentPosition = 0
    alphabet.forEach(letter => {
      key.split('').forEach((part, i) => {
        if(letter === part){
          orderedKey += part
          orders[i] = currentPosition
          currentPosition++
        }
      })
    })
    let maps = {}
    let table = []
    let partLength = Math.ceil(cleanMessage.length / key.length)
    let incompleteColumns = (partLength * key.length) - cleanMessage.length
    let completeColumns = key.length - incompleteColumns
    let columns = [] 
    let ind = 0
    for(let i = 0; i < cleanMessage.length;){
      if(orders.findIndex((coso) => coso === ind) < completeColumns) {
        columns.push(cleanMessage.substr(i,partLength))
        i += partLength
      }
      else {
        columns.push(cleanMessage.substr(i,partLength - 1))
        i += partLength - 1
      }
      ind++
    }
    orderedKey.split('').forEach((k, index) => {
      if(maps[k]){
        maps[k].push(columns[index])
      }else{
        maps[k] = [columns[index]]
      }
    })
    let orderedColumns = []
    key.split('').forEach((part) => {
      orderedColumns.push(maps[part].shift())
    })
    for(let i = 0; i < partLength; i++){
      table.push([])
    }
    orderedColumns.forEach(c => {
      c.split('').forEach((a, index) => {
        table[index].push(a)
      })
    })
    return table.map(column => column.join('')).join('')
  }
}

module.exports = {
  caesar,
  affine,
  playFair,
  vigenere,
  railFence,
  columnar
}