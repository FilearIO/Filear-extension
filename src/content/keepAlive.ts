/**
 * Workaround to avoid service-worker be killed by Chrome
 * https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
 */

import Browser from 'webextension-polyfill'
import PortConnect, { PortName } from '@shared/port'

export default function keepAlive(): void {
  let port: PortConnect
  function connect(): void {
    port = new PortConnect(Browser.runtime.connect({ name: PortName.KEEP_ALIVE }))
    // eslint-disable-next-line no-console
    port.onMessage.subscribe(res => console.log(res))
    port.onDisconnect.subscribe(connect)
  }
  connect()
}
