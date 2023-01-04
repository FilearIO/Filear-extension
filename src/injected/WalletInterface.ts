export default class WalletInterface {
  public readonly walletName = APP_NAME
  public readonly walletVersion = APP_VERSION

  public test(): string {
    return 'Filear Wallet'
  }

  public connect(): void {
    // eslint-disable-next-line no-console
    console.log('connect')
  }

  public disconnect(): void {
    // eslint-disable-next-line no-console
    console.log('disconnect')
  }
}
