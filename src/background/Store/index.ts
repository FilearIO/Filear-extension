import type { JWKInterface } from '@shared/interface'
import Store from '@shared/borwser/store'

interface State {
  key: JWKInterface
  network: string
  lock: boolean
}

const initialState = {
  key: undefined,
  lock: true,
}

export default class BackgroundStore {
  static backgroundStore: BackgroundStore
  private readonly store: Store<Partial<State>>

  static getStore(): BackgroundStore {
    if (this.backgroundStore === undefined) {
      this.backgroundStore = new BackgroundStore()
    }
    return this.backgroundStore
  }

  private constructor() {
    this.store = new Store<Partial<State>>(initialState)
  }

  public setJwk(value: JWKInterface | undefined): void {
    this.store.set('jwk', value)
    this.store.emit('onChangeKey', this.store.state)
  }

  public getJwk(): JWKInterface | undefined {
    return this.store.get('jwk')
  }

  public setLock(value: boolean): void {
    this.store.set('lock', value)
  }

  public getLock(): boolean {
    return this.store.get('lock')
  }
}
