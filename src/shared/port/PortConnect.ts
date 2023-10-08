/**
 * Port
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/Port
 */

import Browser, { Runtime } from 'webextension-polyfill'
import { fromEventPattern, take, tap, share, Observable, takeUntil, filter } from 'rxjs'

import { Message, Response } from '../interface'

export enum PortName {
  CONTENT__BACKGROUND = 'filear_content__bakckground',
  UI__BACKGROUND = 'filear_ui__background',
  KEEP_ALIVE = 'filear_keep_alive',
}

export default class PortConnect {
  private readonly _port: Runtime.Port
  private readonly _disconnectStream: Observable<Runtime.Port>
  private readonly _messagesStream: Observable<any>
  private _connected: boolean

  public static connectToBackground(name: PortName): PortConnect {
    return new PortConnect(Browser.runtime.connect({ name }))
  }

  constructor(port: Runtime.Port) {
    this._port = port
    this._disconnectStream = fromEventPattern<Runtime.Port>(
      handler => this._port.onDisconnect.addListener(handler),
      handler => this._port.onDisconnect.removeListener(handler),
    ).pipe(
      take(1),
      tap(() => (this._connected = false)),
      share(),
    )
    this._messagesStream = fromEventPattern(
      handler => this._port.onMessage.addListener(handler),
      handler => this._port.onMessage.removeListener(handler),
      msg => msg,
    ).pipe(share(), takeUntil(this._disconnectStream))
    this._connected = true
  }

  public get onMessage(): Observable<any> {
    return this._messagesStream
  }

  public get onDisconnect(): Observable<Runtime.Port> {
    return this._disconnectStream
  }

  public get connected(): boolean {
    return this._connected
  }

  public sendMessage<Req, Res>(msg: Message<Req>): Observable<Response<Req, Res>>
  public sendMessage<Req, Res>(msg: Response<Req, Res>): Observable<Response<Req, Res>>
  public sendMessage<Req, Res>(msg: Message<Req> | Response<Req, Res>): Observable<Response<Req, Res>> {
    if (this._port === undefined) {
      throw new Error('Not connected to background!')
    }
    this._port.postMessage(msg)
    return this._messagesStream.pipe(filter(m => m.uuid === msg.uuid))
  }
}
