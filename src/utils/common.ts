import crypto from 'crypto'
export const generateRandomString = (length: number) => {
  const bytes = crypto.randomBytes(length)
  return bytes.toString('hex')
}
