const DB_NAME = 'Filear'
const DB_VERSION = 1
// const DATA_VERSION = 0

export default class IndexedDBStorage {
  private readonly connection: Promise<IDBDatabase>

  constructor() {
    this.connection = IndexedDBStorage.openDbConnection()
    // void this.connection.then(async () => {
    //   const meta = await this.loadMeta()
    //   if (meta?.dataVersion < DATA_VERSION) {
    //     // update db data version
    //     await this.saveMeta({
    //       ...meta,
    //       dataVersion: DATA_VERSION,
    //     })
    //   }
    // })
  }

  public static async openDbConnection(): Promise<IDBDatabase> {
    return await new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = e => {
        // eslint-disable-next-line no-console
        console.error(e)
        reject(new Error('Failed to create indexedDB'))
      }
      request.onsuccess = () => {
        resolve(request.result)
      }
    })
  }

  // async loadMeta(): Promise<GlobalMeta> {
  //   return await this.connection.then(
  //     async db =>
  //       await new Promise((resolve, reject) => {
  //         const request = db.transaction([StoreName.META]).objectStore(StoreName.META).get(GLOBAL_META_ID)

  //         request.onsuccess = event => {
  //           resolve(request.result)
  //         }
  //         request.onerror = event => {
  //           reject(event)
  //         }
  //       }),
  //   )
  // }
}
