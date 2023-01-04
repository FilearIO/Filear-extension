import { EventEmitter } from 'events'
import Arweave from 'arweave'

import type { ArweaveConfig } from '@shared/interface'
import { DEFAULT_AR_CONFIG } from '@shared/constants'
import netwrokSwitch from '@shared/utils/networkSwitch'

const DEFAULT_CONFIG = netwrokSwitch(DEFAULT_AR_CONFIG.url)

class ArweaveInstance extends EventEmitter {
  static Instance = new ArweaveInstance()

  private _arweave: Arweave | undefined

  public get arweave(): Arweave {
    return this._arweave as Arweave
  }

  private constructor() {
    super()
    this.init(DEFAULT_CONFIG)
    this.on('arweaveConfigUpdate', (config: ArweaveConfig) => this.init(config))
  }

  private init(config: ArweaveConfig): void {
    const _conf = {
      ...DEFAULT_CONFIG,
      ...config,
    }
    this._arweave = Arweave.init(_conf)
  }
}

export default ArweaveInstance.Instance
