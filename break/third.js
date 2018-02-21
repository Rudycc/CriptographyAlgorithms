const { getDictionary, englishAlphabet, getVigenereMatrix } = require('./../utils')
const { vigenere } = require('./../algoritmos')

const cipheredMessage = 'LOEI XZPX HRZW WOGIJ IS HLVL HNN AAAP DF RGUE DLSI HO ESL KO DLW ILIEK LOEI QGHX DF WZVW GLG BSVZRY VTRIJH ERV XZLMCIDKIS RW KAOXI MCQOMIV JOVH SCH TF XWTPDELXSN JPGD TRIQ GMGYXDF DY MFWIRZX ZLAFIFH KRRGWZ AXH ZJWBRRV UADYJTW RZGZLS PVGB IXGIFZE DLWN ERV XZL LYVVH ENU SOUEBW GU XHVMJ MAMIK DXHVVK IUD WLTAAIHK VF DLWXV EOGWSLORUT XHV WMTMOVK UPONIJ PS DS LWI SLQELR CAWTX TYSMNH DS AIWECJ AA OXPQ AMVV EFK DSI TJX IW XZHT PPGLIR NMLO BKWW XRFVGLPOX QWTX TYI THSOWL LIEU SMABBENTW HZW VPGXMLN JOI WOLEDIKI XHZRYZ TEVF HSUIIKA BI XZTMR UIWKS VMDXIS KLSA FOWLTV SDIDS FKV ODVSV XZHN GIWSW'
const start = Date.now()
const words = cipheredMessage.split(' ')
const matrix = getVigenereMatrix()
const dictionary = getDictionary()

for(let i = 0; i < dictionary.length; i++){
  if(dictionary[i].length === 11) {
    let possible = vigenere.descipher(englishAlphabet, matrix, cipheredMessage.toLowerCase(), dictionary[i])
    let currentIndex = 0
    let counter = 0
    words.forEach(w => {
      let value = possible.substr(currentIndex, w.length)
      currentIndex += w.length
      if(dictionary.some(match => match === value)){
        counter ++
      }
    })
    if(counter > 80){
      console.log('Message: ', possible, ' Key: ', dictionary[i])
      break
    }
  }
}

const end = Date.now()
console.log('Time elapsed: ', end - start, ' milliseconds')


//Message:  they that have power to hurt and will do none that donotdothethingtheymostdoshowwhomovingothersarethemselvesasstoneunmovedcoldandtotemptationslowtheyrightlydoinheritheavensgracesandhusbandnaturesrichesfromexpensetheyarethelordsandownersoftheirfacesothersbutstewardsoftheirexcellencethesummersfloweristothesummersweetthoughtoitselfitonlyliveanddiebutifthatflowerwithbaseinfectionmeetthebasestweedoutbraveshisdignityforsweetestthingsturnsourestbytheirdeedsliliesthatfestersmellfarworsethanweeds  Key:  shakespeare
