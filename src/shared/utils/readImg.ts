import { readFile } from './readFile'

export async function readImg(image: HTMLImageElement): Promise<string> {
  image.crossOrigin = '*'
  const name = image.currentSrc.split('/').pop() ?? 'unknow'

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  const ctx = canvas.getContext('2d')
  ctx?.drawImage(image, 0, 0, image.width, image.height)

  return await new Promise(resolve => {
    canvas.toBlob(async function (blob) {
      const file = new File([blob as BlobPart], name)

      resolve(readFile(file))
    })
  })
}
