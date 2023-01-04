/**
 * store data gloabl in backend
 */

import { EventEmitter } from 'events'

export default class Store<State extends Object> extends EventEmitter {
  private _state: State
  private readonly _initialState: State

  constructor(state: State) {
    super()
    this._initialState = state
    this._state = state
  }

  public get state(): State {
    return this._state
  }

  public set(key: string, value: any): void {
    Reflect.set(this._state, key, value)
    this.emit('onChange', this._state)
  }

  public get(key: string): any {
    return Reflect.get(this._state, key)
  }

  public clear(): void {
    this._state = this._initialState
  }
}
