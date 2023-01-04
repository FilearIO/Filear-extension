import browser from 'webextension-polyfill'

import * as open from '@shared/borwser/open'

import initBackgroundPortConnect from './backgroundPortConnect'

browser.runtime.onInstalled.addListener(({ reason }): void => {
  if (reason === 'install') {
    void open.openHomePage()
  }
})

initBackgroundPortConnect()
