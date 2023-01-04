/**
 * refer
 * https://github.com/ipfs-shipyard/js-human-crypto-keys
 */

import forge from 'node-forge'
import type { JWKInterface } from '@shared/interface'

import Arweave from '../../Arweave'
import createPrng from './createPrng'
import { composePrivateKey } from './composer'
import { KeyPair } from './interface'

const rsa = forge.pki.rsa

export const generateSeedToArJwk = async (seed: Uint8Array): Promise<JWKInterface> => {
  const { privateKey } = await generateSeedToKeyPair(seed)
  const composedPrivateKey = composePrivateKey(privateKey)
  const jwk = await generatePrivateKeyToJwk(composedPrivateKey)
  return jwk
}

export const generateArJwkToAddress = async (jwk: JWKInterface): Promise<string> => {
  const address = await Arweave.arweave.wallets.jwkToAddress(jwk)
  return address
}

const generateSeedToKeyPair = async (seed: Uint8Array): Promise<KeyPair> => {
  return await new Promise((resolve, reject) => {
    rsa.generateKeyPair(
      {
        bits: 4096,
        e: 65537,
        prng: createPrng(seed),
        algorithm: 'PRIMEINC',
      },
      function (err, keypair) {
        if (err !== null) {
          reject(err)
        }
        const { privateKey } = keypair
        resolve({
          privateKey: {
            modulus: new Uint8Array(privateKey.n.toByteArray()),
            publicExponent: privateKey.e.intValue(),
            privateExponent: new Uint8Array(privateKey.d.toByteArray()),
            prime1: new Uint8Array(privateKey.p.toByteArray()),
            prime2: new Uint8Array(privateKey.q.toByteArray()),
            exponent1: new Uint8Array(privateKey.dP.toByteArray()),
            exponent2: new Uint8Array(privateKey.dQ.toByteArray()),
            coefficient: new Uint8Array(privateKey.qInv.toByteArray()),
          },
        })
      },
    )
  })
}

async function generatePrivateKeyToJwk(privateKey: Uint8Array): Promise<JWKInterface> {
  const key = await crypto.subtle.importKey('pkcs8', privateKey, { name: 'RSA-PSS', hash: 'SHA-256' }, true, ['sign'])
  const jwk = await crypto.subtle.exportKey('jwk', key)

  return {
    kty: jwk.kty as string,
    e: jwk.e as string,
    n: jwk.n as string,
    d: jwk.d,
    p: jwk.p,
    q: jwk.q,
    dp: jwk.dp,
    dq: jwk.dq,
    qi: jwk.qi,
  }
}
