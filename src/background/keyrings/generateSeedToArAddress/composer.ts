/**
 * refer
 * https://github.com/ipfs-shipyard/js-crypto-key-composer
 */

import { Buffer } from 'buffer'
import asn from 'asn1.js'

import { PrivateKey } from './interface'

const RsaPrivateKeyASN = asn.define('RSAPrivateKey', function (this: any) {
  this.seq().obj(
    this.key('version').int(),
    this.key('modulus').int(),
    this.key('publicExponent').int(),
    this.key('privateExponent').int(),
    this.key('prime1').int(),
    this.key('prime2').int(),
    this.key('exponent1').int(),
    this.key('exponent2').int(),
    this.key('coefficient').int(),
  )
})

const objidValues = new Proxy(
  {},
  {
    get: (obj, key: string) => {
      if (key === 'hasOwnProperty') {
        return (key: string) => key.indexOf('.') > 0
      }

      return key.indexOf('.') > 0 ? key : undefined
    },
  },
)

const AlgorithmASN = asn.define('Algorithm', function (this: any) {
  this.seq().obj(this.key('id').objid(objidValues), this.key('parameters').optional().any())
})

const PrivateKeyASN = asn.define('PrivateKeyInfo', function (this: any) {
  this.seq().obj(
    this.key('version').int(),
    this.key('privateKeyAlgorithm').use(AlgorithmASN),
    this.key('privateKey').octstr(),
    this.key('attributes').implicit(0).optional().any(),
    this.key('publicKey').implicit(1).optional().bitstr(),
  )
})

export const composePrivateKey = (privateKey: PrivateKey): Uint8Array => {
  const _privateKey = {
    version: 0,
    modulus: Buffer.from(privateKey.modulus),
    publicExponent: privateKey.publicExponent,
    privateExponent: Buffer.from(privateKey.privateExponent),
    prime1: Buffer.from(privateKey.prime1),
    prime2: Buffer.from(privateKey.prime2),
    exponent1: Buffer.from(privateKey.exponent1),
    exponent2: Buffer.from(privateKey.exponent2),
    coefficient: Buffer.from(privateKey.coefficient),
  }
  const rasPrivateKeyASNL = RsaPrivateKeyASN.encode(_privateKey)
  const privateKeyASNL = PrivateKeyASN.encode({
    version: 0,
    privateKeyAlgorithm: {
      id: '1.2.840.113549.1.1.1', // RAS OIDS
      parameters: Buffer.from('0500', 'hex'),
    },
    privateKey: Buffer.from(rasPrivateKeyASNL),
  })
  return privateKeyASNL
}
