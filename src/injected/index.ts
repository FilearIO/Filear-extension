import WalletInterface from './WalletInterface'

try {
  Object.defineProperty(window, 'filearWallet', {
    enumerable: false,
    configurable: false,
    value: new WalletInterface(),
  })
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn(
    `[${APP_NAME} Wallet] Unable to attach to window.arweaveWallet. There are likely multiple the Arweave wallets installed.`,
  )
}
