import browser from 'webextension-polyfill'

class Storage {
  async getItem(key: string): Promise<string | undefined> {
    const res = await browser.storage.local.get(key)
    return res[key]
  }

  async setItem(key: string, value: string): Promise<void> {
    return await browser.storage.local.set({ [key]: value })
  }

  async removeItem(key: string): Promise<void> {
    return await browser.storage.local.remove(key)
  }

  async clear(): Promise<void> {
    return await browser.storage.local.clear()
  }
}

export default Storage
