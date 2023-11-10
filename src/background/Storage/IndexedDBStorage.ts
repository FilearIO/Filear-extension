import { UploadFile } from '@shared/interface/api'

const DB_NAME = 'Filear'
const DB_VERSION = 1

const OBJECT_STORE = {
  FILE: 'file',
}

export default class IndexedDBStorage {
  private readonly connection: Promise<IDBDatabase>

  constructor() {
    this.connection = IndexedDBStorage.connection()
  }

  public static async connection(): Promise<IDBDatabase> {
    return await new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = e => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(new Error(`Failed to create indexedDB`))
      }
      request.onupgradeneeded = () => {
        request.result.createObjectStore(OBJECT_STORE.FILE, { keyPath: 'id' })
      }
      request.onsuccess = () => {
        resolve(request.result)
      }
    })
  }

  async saveUploadFile(data: string, name: string, type: string): Promise<boolean> {
    const db = await this.connection
    return await new Promise((resolve, reject) => {
      const request = db.transaction(OBJECT_STORE.FILE, 'readwrite').objectStore(OBJECT_STORE.FILE).put({
        id: 1,
        data,
        name,
        type,
      })

      request.onsuccess = () => {
        resolve(true)
      }
      request.onerror = e => {
        reject(e)
      }
    })
  }

  async getUploadFile(): Promise<UploadFile> {
    const db = await this.connection
    return await new Promise((resolve, reject) => {
      const request = db.transaction(OBJECT_STORE.FILE, 'readonly').objectStore(OBJECT_STORE.FILE).get(1)

      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = e => {
        reject(e)
      }
    })
  }

  async delUploadFile(): Promise<boolean> {
    const db = await this.connection
    return await new Promise((resolve, reject) => {
      const request = db.transaction('saveFile', 'readwrite').objectStore('saveFile').delete(1)

      request.onsuccess = () => {
        resolve(true)
      }
      request.onerror = e => {
        reject(e)
      }
    })
  }
}
