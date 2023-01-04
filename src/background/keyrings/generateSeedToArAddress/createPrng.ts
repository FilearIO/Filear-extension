import forge from 'node-forge'
import HmacDrgb from 'hmac-drbg'
import hash from 'hash.js'

const createPrng = (seed: Uint8Array): any => {
  const hmacDrgb = new HmacDrgb({
    hash: hash.sha256,
    entropy: forge.util.binary.hex.encode(seed),
    nonce: null,
    pers: null,
  })

  return {
    getBytesSync: (size: number) => {
      const bytesArray = hmacDrgb.generate(size)
      const bytes = new Uint8Array(bytesArray)
      return forge.util.binary.raw.encode(bytes)
    },
  }
}

export default createPrng
