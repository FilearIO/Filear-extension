export default <T extends Record<string, string>, R extends keyof T>(obj: T, prefix: string): T =>
  new Proxy(obj, {
    get(target, prop) {
      if (typeof prop !== 'string') {
        return
      }
      return `${prefix}_${target[prop as R]}`
    },
  })
