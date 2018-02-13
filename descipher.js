const { createPairs, deleteSpaces, getDictionary, getVigenereMatrix } = require('./utils')
const { caesar, affine, vigenere, railFence, columnar } = require('./algoritmos')

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

//console.log(getVigenereMatrix())

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



/*
let newMessage = message.split(' ').join('')

let pairs = newMessage.match(/.{1,2}/g)
console.log(pairs.join(' '))
let repetitions = {}

pairs.forEach( pair => {
  repetitions[pair] = repetitions[pair] !== undefined ?repetitions[pair]+1:1;
})

console.log(repetitions)*/

let matches = {}
let error = false

messages.forEach(pair => {
  let cipher = createPairs(deleteSpaces(pair.cipher))
  let plainText = createPairs(deleteSpaces(pair.plainText))

  cipher.forEach((p,i) => {
    let reversed = p.split('').reverse().join('')
    let reversedPlain = plainText[i].split('').reverse().join('')
    //console.log(reversed)
    if((matches[p] && matches[p] !== plainText[i]) || (matches[reversed] && matches[reversed] !== reversedPlain)){
      error = true
    } else {
      matches[p] = plainText[i]
      matches[reversed] = reversedPlain
    }
  })
})

let clues = []

for(let key in matches) {
  if(matches[matches[key].toUpperCase()]) {
    clues.push({
      [key]: matches[key],
      [matches[key]]: matches[matches[key].toUpperCase()]
    })
  }
}

let possibleRows = []

clues.forEach((clue,i) => {
  if(i%2) return
  let set = new Set()
  for(let key in clue){
    set.add(key[0].toLowerCase())
    set.add(key[1].toLowerCase())
    set.add(clue[key][0])
    set.add(clue[key][1])
  }
  possibleRows.push(set)
})

//console.log(possibleRows)

//console.log(clues)

console.log('Hay error ', error)
if(!error) {
  console.log(matches)
}

let cleanCiphered = createPairs(deleteSpaces(cipheredMessage))
let deciphered = cleanCiphered.map(pair => matches[pair]?matches[pair]:pair)

//console.log(deciphered.join(''))


//Pure logical thinking cannot yield us any knowledge of the empirical world; all knowledge of reality starts from experience and end in it

let c = vigenere.cipher(alphabet, getVigenereMatrix(), messages[0].plainText, 'palabra')
//console.log(c)
//console.log(vigenere.descipher(alphabet, getVigenereMatrix(), c, 'palabra'))

let testNoSpace = deleteSpaces(messages[0].plainText)
const matrix = getVigenereMatrix()
/*
getDictionary().forEach(word => {
  let c = columnar.cipher(testNoSpace, word, alphabet)
  
  if(!columnar.descipher(c, word, alphabet).includes(testNoSpace)){
    console.log(columnar.descipher(c, word, alphabet))
    console.log(word)
    console.log('something went wrong')
  }
})*/

const something = 'LOEI XZPX HRZW WOGIJ IS HLVL HNN AAAP DF RGUE DLSI HO ESL KO DLW ILIEK LOEI QGHX DF WZVW GLG BSVZRY VTRIJH ERV XZLMCIDKIS RW KAOXI MCQOMIV JOVH SCH TF XWTPDELXSN JPGD TRIQ GMGYXDF DY MFWIRZX ZLAFIFH KRRGWZ AXH ZJWBRRV UADYJTW RZGZLS PVGB IXGIFZE DLWN ERV XZL LYVVH ENU SOUEBW GU XHVMJ MAMIK DXHVVK IUD WLTAAIHK VF DLWXV EOGWSLORUT XHV WMTMOVK UPONIJ PS DS LWI SLQELR CAWTX TYSMNH DS AIWECJ AA OXPQ AMVV EFK DSI TJX IW XZHT PPGLIR NMLO BKWW XRFVGLPOX QWTX TYI THSOWL LIEU SMABBENTW HZW VPGXMLN JOI WOLEDIKI XHZRYZ TEVF HSUIIKA BI XZTMR UIWKS VMDXIS KLSA FOWLTV SDIDS FKV ODVSV XZHN GIWSW'
//console.log(something.substr(4,4))
const words = something.split(' ')
const dictionary = getDictionary()
/*
dictionary.forEach(word => {
  let possible = vigenere.descipher(alphabet, matrix, something.toLowerCase(), word)
  let currentIndex = 0
  let counter = 0
  for(let i = 0; i< words.length; i++){
    if(word.length !== 11){
      break
    }
    let value = possible.substr(currentIndex, words[i].length)
    currentIndex += words[i].length
    if(dictionary.some(match => match === value)){
      counter++
    }
  }/*
  words.forEach(w => {
    let value = possible.substr(currentIndex, w.length)
    currentIndex += w.length
    if(dictionary.some(match => match === value)){
      counter ++
    }
  })
  if(counter > 80){
    console.log('Message: ', possible, ' Key: ', word)
  }
})
*/
let test = 'party'
//console.log(test.split('').sort((a,b) => a > b).join(''))

//console.log(cw)
//console.log(columnar.descipher(cw, 'correspondent', alphabet))

const test2 = 'WTPSUGHYEDTWUBTNSSEERTTHTEAHEEOOHAEGTMULNTWRMSKEADMTSOMENAGHLHLRWLOODTELKIHDTWIESTNEYMNGUOCYVDYETNMTNTITIETOEFTMOSMIEHTBACCEISHITMSHWTEDTTLGORAAOLBAPONEEEUUOSAISEEOHFNTEEAIILWIPARIEHNESUOOESIAFDMHABYHRWPTAHSOEGHEATLAMOOLNRSTNHLHOHCPHITTWHGSNWBAIWGYNLUETYNPRIIPADHERNWEHTWEEYONHOHVTRETNHVHELTERRLIAADEOLEEELTUESXSTLESKLAAIRIINOFELRRRIGHMLMUOYEWEAFNILRDAGEOEREAGTTWAUSNNTHMUNDHDNHTADREEUEFCTHIRDTRUAGNHITAHDFCEEORDWOLNINONERTTTAPRLUEIEORUENAYOLYPEWCTFNISAEGNERLSHNSHSSAETTTOHSITOIIEHEOMELIASSTTTSHMRHEHLUIORNBSNYATLWYTPEDREIIOETRLRWSTMEHUSMREYARERIHEYGPBNEBTTODTHUETTBARSTDGAHBEDTVSVIDTEOAPOTACADEAIUIEACHHEUILSQOSSIOOLOECATSWNMCTAIDELYOAUOMEFCVGDTHWWHFOELASEFNUMLTRUANGAGWLCEOQTRWTULIOWLERDIKPPELHUISYRBDKIITODEASNETRERUHVOBIEETDONSOOPNUTNIESEDNHKWDFDRSISEREPMIAATEOUAMWMDABRAEMWUMPIEEEOEOETLSREBEIRAUSIEHNSHSIWRETDHBHTBWORAWOORILTIEOPRFSLOTFOOEUIMELLUMNTVRTBNEHRAEPFEUNMNRBESECRYAKEHPELNAROBISIENSIOWEOTPAITNNFCEMNEAINTLTRNHEODTAFHMMROTWTUTCNKWLINSYREHYOSHEEAEEAUNFESHMAATNONOTEOSUNLTEAEORTDGEHSIDELOIREOILSTAAIHATTOEOEOHSMSLGLEPYAHHAHBDELHTUODRTIWTYETIWYEIRNMOOENEKYYIIYEIDESWPESNOENAAEANYTIDPOEOTLTEWEAOLTOAHYHNLWNCSRIUALHPGNHELNOEFFTENUETIIMNNFIEHUCISUAEDPUDRHTHBKIPSESWTENOORNMENIIWYLTRHEYRERUITAENACMETOEAAALVWETDSLANNIYRASRVTHSIOALEFIULOCHHHAHOIEANGOEOTKKNAOEYENCETPANOOHDAHSATAAGEUEEEENOTEIIYTTAEEOSLDOEUKIWRMHLRITIAIRNAORTOEBTONFVONTSWOEENTEMBKSDTUODAFICRHTTSWKTABONTOWANYTIGHDOIMMTTROYLGNMEMCWHRIDENIGHODDNITALAAZTAREWHETTOAICELHHHULHACISEEIASARDSEIHLSRDIESEAFOSHINEOLTRETASMSOTKTTTTLKTOEKACYNHAASMLSDEDIMEITIAWDEETEEAOFNNYHDUTQCSUCNDGOWVLNNADENTRCIMFRTIMESFHTMVTHOOTTAOANNTOORFANOSNUAUFYKOAECYNWAIASAEISENODARISRNHDHEEIMASAIIHBEYGVTBRUDNFTVSHRTEMNAISAHOODLUGCODSEOTTFTEIEEOORYOATAWNFONATIEEHHCIITSLHTHRNBYHHNHEONOAYEOIOSYEYERNOEEDNTRTAAOEDRANHSINMEHLKRAAAHOLSNOTIEAETTAMHFARNTNPSTHAASEIIAGTATSDAVWINEALIOYUTNAEIUYMSLYPDEAYAHRROCOSDEIMITSISEHDIFKNINLHAFCUAGGOBNMIUEHLOTIHDEELGORTRLHOSDEIERTPFOOEIAETATMTIMSTODSUUEITORTIGTROOEUTAOFCHPSNTVPOERCNOKERTATBWACFDEITDCVIIRPFESEENSYOHIHOYFVEEYMSPIOKEYRURNEIAWIEOORNNDLEEFAEASSOENSOLNUTNREDLHWAHWTWEGAEERITEITEOFSPTRSGAAHEDATENNPODESTNEIAEHDMEAIRUHTTTTRHWHIKOTDGBLWIITIGTLMDLELARHTGLTNWREYOYLIDTOFHDDOHANEONHNNTAASUACTFSHEHOSMEIOOLEMLTRCFUTTONHHIHHLYOAINGOSIYAEOEIEIOTEAISFNMISEIVAIUIEILOITIEABSTTURSSHOACYRAEHEFEOSHTRTAKHKTNANYTSEHRTOWIPNMCUATIGOULMVOGITHGRUHNNENLSRNIRERTKEHSIEDHIPMBONTCISPAUHHNFAHTOHLKWCEROAITFKNEIBUEFIUAWWCOTEODMAEHTWCEHHAAMDEFASSTIDERLEEFAEMFSISNEDINPAISOAALNRYGEHWSAUSTHDHFOLTULOTNEDRGEODOHHNRNDSLHTIAUDMHOERRHRSESTOTOOMNTTUDTRNTIERTTEWIIHVRAMIIEWOTFCCJDGNLIOLISAASSENRPHVTYCAEIEUSVLTAEAFAGEYVTISAYYSUEHAYCDTGBISLERAIEIVTITHSIAUSUOTELNUXOSGHAHITODFIOLEIDILNENRNCDSCMHBCCOOIRSSPHWYWYRHNLLEOAANFSKPFONNNTUSEHATAENONOAUCB'
let cw = columnar.descipher(test2.toLowerCase(), 'sherlock', alphabet)
console.log(cw)
let secondDictionary = dictionary.map(a => a)
dictionary.forEach(word => {
  if(word.length !== 1){    
    let possible = columnar.cipher(deleteSpaces(messages[0].plainText.toLowerCase()), word, alphabet)
    if(columnar.descipher(possible, word, alphabet) !== deleteSpaces(messages[0].plainText.toLowerCase())){
      console.log('Something went wrong with ', word)
      console.log(possible)
      console.log(columnar.descipher(possible, word, alphabet))
    }
  }
  
})


dictionary.forEach(word => {
  if(word.length !== 1){    
    let possible = columnar.descipher(test2.toLowerCase(), word, alphabet)
    if(possible.split('the').length > 15){
      console.log('key ', word)
      console.log(possible.substr(0,100))
    }
  }
  
})
/*
console.log(test2.length)
console.log(test2[0], test2[3], test2[7], test2[11])
console.log(test2[1], test2[673], test2[(673 * 2)], test2[(673*3)])

let railTest = railFence.cipher(messages[0].plainText, 2)
console.log(railFence.cipher(messages[0].plainText, 2))
console.log(railFence.descipher(railTest, 2))
console.log(railFence.cipher(messages[0].plainText, 3))
console.log(railFence.cipher(messages[0].plainText, 4))
console.log(railFence.cipher(messages[0].plainText, 5))

for(let i = 1601; i < 2602; i++){
  console.log(railFence.descipher(test2, i).substring(0,100))
}*/



//Message:  they that have power to hurt and will do none that donotdothethingtheymostdoshowwhomovingothersarethemselvesasstoneunmovedcoldandtotemptationslowtheyrightlydoinheritheavensgracesandhusbandnaturesrichesfromexpensetheyarethelordsandownersoftheirfacesothersbutstewardsoftheirexcellencethesummersfloweristothesummersweetthoughtoitselfitonlyliveanddiebutifthatflowerwithbaseinfectionmeetthebasestweedoutbraveshisdignityforsweetestthingsturnsourestbytheirdeedsliliesthatfestersmellfarworsethanweeds  Key:  shakespeare
const set = new Set
alphabet.forEach(letter => { set.add(letter) })
console.log(set)