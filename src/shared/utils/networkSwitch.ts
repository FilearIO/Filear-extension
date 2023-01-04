import type { ArweaveConfig } from '../interface'

export default function netwrokSwitch(url: string): ArweaveConfig {
  const urlParse = new URL(url)
  let port = urlParse.port
  if (port === '') {
    port = urlParse.protocol.includes('https') ? '443' : '80'
  }
  return {
    host: urlParse.hostname,
    port: Number(port),
    protocol: urlParse.protocol.slice(0, -1),
  }
}
