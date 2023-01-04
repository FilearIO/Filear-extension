import { Buffer } from 'buffer'

export async function readFile(file: File): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const uint8Array = new Uint8Array(e.target?.result as any)
      const hexString = Buffer.from(uint8Array as any).toString('hex')
      resolve(hexString)
    }
    fileReader.onerror = e => reject(e)
    fileReader.readAsArrayBuffer(file)
  })
}
