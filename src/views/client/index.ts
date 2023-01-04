import type { Message, Response } from '@shared/interface'

import { v4 as uuidv4 } from 'uuid'
// import { get } from 'lodash'
import { lastValueFrom, take } from 'rxjs'

import PortConnect, { PortName } from '@shared/port'

import { AppDispatch } from '../store'

// import actoins from './actions'

class Client {
  private _inited = false
  private _portConnect: PortConnect | null = null
  private _dispatch: AppDispatch | undefined

  public init(dispatch: AppDispatch): void {
    if (this._inited) {
      throw new Error('Client has inited!')
    }
    this._inited = true
    this._dispatch = dispatch
    this.initClient()
  }

  private initClient(): void {
    this._portConnect = PortConnect.connectToBackground(PortName.UI__BACKGROUND)
    this._portConnect.onDisconnect.subscribe(() => {
      this.initClient()
    })
    // this._portConnect.onMessage.subscribe((msg: Response) => this.handlerMessage(msg))
  }

  // private handlerMessage(msg: Response): void {
  //   if (this._dispatch === undefined) {
  //     throw new Error('Client not inited!')
  //   }
  //   const { success, data, message, payload } = msg
  //   // eslint-disable-next-line no-console
  //   console.log('res', msg)
  //   if (success && payload.action !== undefined) {
  //     this._dispatch(get(actoins, payload.action)?.(data))
  //   }
  //   if (!success) {
  //     // eslint-disable-next-line no-console
  //     console.error(message)
  //   }
  // }

  public async request<Req, Res>(msg: Omit<Message<Req>, 'uuid'>): Promise<Response<Req, Res>> {
    if (this._portConnect !== null && this._inited) {
      const _msg = {
        ...msg,
        uuid: uuidv4(),
      }
      return await lastValueFrom(this._portConnect.sendMessage<Req, Res>(_msg).pipe(take(1)))
    } else {
      throw new Error('Failed to send message to background service. Port not connected.')
    }
  }
}

let client: Client

export default (): Client => {
  if (client === undefined) client = new Client()
  return client
}
