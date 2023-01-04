export default function downloadFile(content: string, contentType: string, fileName: string): void {
  const el = document.createElement('a')

  el.setAttribute('href', `data:${contentType};charset=utf-8,${encodeURIComponent(content)}`)
  el.setAttribute('download', fileName)
  el.style.display = 'none'

  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
}
