import { Buffer } from 'buffer'
import Transaction from 'arweave/web/lib/transaction'
import browser from 'webextension-polyfill'

import browerNotification from '@shared/borwser/notification'
import { Params, TransactionParams, TransactionApiFunction } from '@shared/interface/api'

import Arweave from '../Arweave'
import Store from '../Store'

class TransactionApi {
  private readonly _arweave = Arweave.arweave
  private readonly _store: Store

  constructor() {
    this._store = Store.getStore()
  }

  async [TransactionApiFunction.GetPrice](params: Params): Promise<string> {
    const { byteSize = 0, targetAddress } = params
    const price = await this._arweave.transactions.getPrice(byteSize, targetAddress)
    return this._arweave.ar.winstonToAr(price)
  }

  async [TransactionApiFunction.GetBalance](params: Params): Promise<string> {
    const { address } = params
    const balance = await this._arweave.wallets.getBalance(address)
    return this._arweave.ar.winstonToAr(balance)
  }

  async [TransactionApiFunction.CreateTransaction](data: Partial<TransactionParams>): Promise<boolean> {
    const key = this._store.getJwk()
    if (key === undefined) {
      throw new Error('Wallet Locked')
    }
    try {
      const transaction = await this._arweave.createTransaction(
        {
          target: data.target ?? '',
          quantity: this._arweave.ar.arToWinston(data.quantity ?? '0'),
          data: data.data !== undefined ? new Uint8Array(Buffer.from(data.data as string, 'hex')) : '',
        },
        key,
      )
      this.addTags(transaction, data.tags)
      await this.sign(transaction)

      let res = true
      if (data.dataSize !== undefined && Number(data.dataSize) >= 1024 * 1024) {
        res = await this.upload(transaction)
      } else {
        res = await this.post(transaction)
      }
      if (data.dataSize !== undefined && Number(data.dataSize) > 0) {
        await browerNotification({
          title: browser.i18n.getMessage(res ? 'uploadNotificationSuccess' : 'uploadNotificationFail'),
          message: browser.i18n.getMessage(res ? 'uploadNotificationSuccessMessage' : 'uploadNotificationFailMessage'),
        })
      } else {
        await browerNotification({
          title: browser.i18n.getMessage(res ? 'sendSuccess' : 'sendFail'),
          message: browser.i18n.getMessage(res ? 'sendSuccessNotificationMessage' : 'sendFailNotificationMessage'),
        })
      }
      return res
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('CreateTransaction error', e)
      return false
    }
  }

  private addTags(transaction: Transaction, tags: Array<{ name: string; value: string }> | undefined): void {
    if (tags !== undefined) {
      tags.forEach(tag => transaction.addTag(tag.name, tag.value))
    }
    transaction.addTag('App-Name', APP_NAME)
    transaction.addTag('App-Version', APP_VERSION)
    transaction.addTag('Unix-Time', `${Math.floor(Date.now() / 1000)}`)
  }

  async sign(transaction: Transaction): Promise<void> {
    const key = this._store.getJwk()
    if (key === undefined) {
      throw new Error('Wallet Locked')
    }
    await this._arweave.transactions.sign(transaction, key)
  }

  async upload(transaction: Transaction): Promise<boolean> {
    const uploader = await this._arweave.transactions.getUploader(transaction)

    while (!uploader.isComplete) {
      await uploader.uploadChunk()
    }
    return true
  }

  async post(transaction: Transaction): Promise<boolean> {
    const response = await this._arweave.transactions.post(transaction)

    if (response.status === 200) {
      return true
    }
    return false
  }
}

export default TransactionApi
