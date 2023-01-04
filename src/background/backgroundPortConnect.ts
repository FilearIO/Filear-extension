import type { Message } from '@shared/interface'

import browser from 'webextension-polyfill'

import PortConnect, { PortName } from '@shared/port'

import handler from './Api'

export default function initBackgroundPortConnect(): void {
  browser.runtime.onConnect.addListener(port => {
    if (port.name === PortName.KEEP_ALIVE) {
      BackgroundKeepAliveService.init(port)
    }
    if (port.name !== PortName.KEEP_ALIVE) {
      BackgroundService.init(port)
    }
  })
}

class BackgroundService {
  private readonly portConnect: PortConnect

  public static init(port: browser.Runtime.Port): BackgroundService {
    return new BackgroundService(port)
  }

  constructor(port: browser.Runtime.Port) {
    this.portConnect = new PortConnect(port)
    this.portConnect.onMessage.subscribe((msg: Message<any>) => this.handlerMessage(msg))
  }

  handlerMessage(msg: Message<any>): void {
    handler(msg)
      .then(res => {
        this.portConnect.sendMessage({ uuid: msg.uuid, success: true, data: res, message: '', payload: msg })
      })
      .catch(err => {
        this.portConnect.sendMessage({
          uuid: msg.uuid,
          success: false,
          data: undefined,
          message: err.message,
          payload: msg,
        })
      })
  }
}

/**
 * https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension
 */
class BackgroundKeepAliveService {
  private readonly portConnect: PortConnect
  private timer: NodeJS.Timeout | undefined

  public static init(port: browser.Runtime.Port): BackgroundService {
    return new BackgroundService(port)
  }

  constructor(port: browser.Runtime.Port) {
    this.portConnect = new PortConnect(port)
    this.portConnect.onDisconnect.subscribe(this.deleteTimer)
    this.timer = setTimeout(this.forceReconnect, 250e3, port)
  }

  forceReconnect(port: browser.Runtime.Port): void {
    this.deleteTimer(port)
    port.disconnect()
  }

  deleteTimer(port: browser.Runtime.Port): void {
    if (this.timer !== undefined) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }
}
