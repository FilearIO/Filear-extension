import browser from 'webextension-polyfill'

export default function injectWalletInterface(): void {
  try {
    const script = document.createElement('script')
    const url = browser.runtime.getURL('injected-script.js')
    script.setAttribute('src', url)
    script.setAttribute('type', 'module')
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const container = document.head || document.documentElement
    container.insertBefore(script, container.firstElementChild)
    container.removeChild(script)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Failed to inject ${APP_NAME} Wallet interface`, e)
  }
}
