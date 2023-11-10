import injectWalletInterface from './injectedWalletInterface'
import keepAlive from './keepAlive'
import SaveButton from './SaveButton'

injectWalletInterface()
keepAlive()

// eslint-disable-next-line no-new
new SaveButton()
