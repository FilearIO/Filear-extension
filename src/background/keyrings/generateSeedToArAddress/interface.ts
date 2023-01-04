export interface PrivateKey {
  modulus: Uint8Array
  publicExponent: number
  privateExponent: Uint8Array
  prime1: Uint8Array
  prime2: Uint8Array
  exponent1: Uint8Array
  exponent2: Uint8Array
  coefficient: Uint8Array
}

export interface KeyPair {
  privateKey: PrivateKey
}
