import React from 'react'
import { createRoot, type Root } from 'react-dom/client'

import type { BaseConfig } from './types'
import ToastList, { type ToastListRef } from './ToastList'

type Config = Omit<BaseConfig, 'id'>

let key = 0

class ToastInstance {
  private root: Root | undefined
  private queue: BaseConfig[] = []
  private ref: ToastListRef | null = null

  constructor() {
    this.init()
  }

  private init(): void {
    const div = document.createElement('div')
    document.body.appendChild(div)
    this.root = createRoot(div)
  }

  public run(config: Config): void {
    key = ++key % 100
    const baseConfig = { ...config, id: key }
    this.queue.push(baseConfig)

    if (this.ref === null) {
      this.root?.render(
        <React.StrictMode>
          <ToastList queue={this.queue} maxCount={3} ref={ref => (this.ref = ref)} />
        </React.StrictMode>,
      )
    }

    this.ref?.open(baseConfig)
    this.queue = []
  }
}

const toastInstance = new ToastInstance()

export default {
  info: (config: Omit<Config, 'type'>) => toastInstance.run({ ...config, type: 'info' }),
  success: (config: Omit<Config, 'type'>) => toastInstance.run({ ...config, type: 'success' }),
  fail: (config: Omit<Config, 'type'>) => toastInstance.run({ ...config, type: 'fail' }),
}
