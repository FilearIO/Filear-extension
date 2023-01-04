/**
 * use Web SubtleCrypto Api to Crypto password
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
 *
 * refer:
 *    https://github.com/MetaMask/browser-passworder
 */

import { Buffer } from 'buffer'

export type Password = string

const ENCODING_TYPE = 'utf-8'
const ALGO = 'AES-GCM'

export function getSalt(byteCount = 32): string {
  const view = new Uint8Array(byteCount)
  crypto.getRandomValues(view)
  const b64encoded = btoa(String.fromCharCode.apply(null, view as unknown as number[]))
  return b64encoded
}

async function getCryptoKeyFromPassword(
  password: string,
  salt: string = getSalt(),
  exportable = false,
): Promise<CryptoKey> {
  const passBuffer = Buffer.from(password, ENCODING_TYPE)
  const saltBuffer = Buffer.from(salt, 'base64')

  const key = await crypto.subtle.importKey('raw', passBuffer, { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey'])

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 10000,
      hash: 'SHA-256',
    },
    key,
    { name: ALGO, length: 256 },
    exportable,
    ['encrypt', 'decrypt'],
  )

  return derivedKey
}

export async function encrypt<R>(dataObj: R, password: Password): Promise<string> {
  const salt = getSalt()
  const cryptoKey = await getCryptoKeyFromPassword(password, salt)

  const data = JSON.stringify(dataObj)
  const dataBuffer = Buffer.from(data, ENCODING_TYPE)
  const vector = crypto.getRandomValues(new Uint8Array(16))

  const buf = await crypto.subtle.encrypt(
    {
      name: ALGO,
      iv: vector,
    },
    cryptoKey,
    dataBuffer,
  )

  const buffer = new Uint8Array(buf)
  const payload = {
    data: Buffer.from(buffer).toString('base64'),
    iv: Buffer.from(vector).toString('base64'),
    salt,
  }
  return JSON.stringify(payload)
}

export async function decrypt(text: string, password: Password): Promise<unknown> {
  let decryptedObj

  try {
    const payload = JSON.parse(text)
    const encryptedData = Buffer.from(payload.data, 'base64')
    const vector = Buffer.from(payload.iv, 'base64')

    const cryptoKey = await getCryptoKeyFromPassword(password, payload.salt)
    const result = await crypto.subtle.decrypt({ name: ALGO, iv: vector }, cryptoKey, encryptedData)

    const decryptedData = new Uint8Array(result)
    const decryptedStr = Buffer.from(decryptedData).toString(ENCODING_TYPE)
    decryptedObj = JSON.parse(decryptedStr)
  } catch (e) {
    throw new Error('Incorrect password')
  }

  return decryptedObj
}
