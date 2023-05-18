import CryptoJS from 'crypto-js'

export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const hashTo32BitString = (input: string): string => {
  const hash = CryptoJS.SHA256(input)
  const hashWords = hash.words
  const hexString =
    hashWords[0].toString(16) +
    hashWords[1].toString(16) +
    hashWords[2].toString(16) +
    hashWords[3].toString(16)
  return hexString.substr(0, 8)
}
