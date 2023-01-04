export const formatQuantity = (num: number): number => {
  return Math.floor(num * 10000) / 10000
}

export const formatImageUrl = (url = '', id: string): string => {
  if (url === '') return ''
  return url.endsWith('/') ? `${url}${id}` : `${url}/${id}`
}

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString()
}

export const formatFileSize = (size: number): string => {
  if (size < 1024) {
    return `${size} B`
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`
  }
  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`
}
