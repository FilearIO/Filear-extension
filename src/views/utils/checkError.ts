export default function checkError(error: any): boolean {
  if (error === undefined || error === '') {
    return false
  }
  return true
}
