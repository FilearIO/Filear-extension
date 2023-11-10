import { readFile } from '@shared/utils/readFile'

export const fetchImg = async (url: string): Promise<{ hexString: string; name: string; type: string }> => {
  try {
    const name = url.split('?')[0].split('/').pop() ?? 'unknow'

    const res = await fetch(url)
    const type = res.headers.get('Content-Type')

    const fileBlob = await res.blob()

    const file = new File([fileBlob], name, { type: type ?? fileBlob.type })

    const hexString = await readFile(file)

    return {
      hexString,
      name,
      type: type ?? fileBlob.type,
    }
  } catch {
    return {
      hexString: '',
      name: '',
      type: '',
    }
  }
}
