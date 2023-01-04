import browser, { Tabs } from 'webextension-polyfill'

type Params = string | number

export async function openHomePage(route: Params = '', queryString: Params = ''): Promise<Tabs.Tab> {
  let extensionURL = browser.runtime.getURL('home.html')

  if (route !== null) {
    extensionURL += `#${route}`
  }

  if (queryString !== '') {
    extensionURL += `?${queryString}`
  }

  const result = await browser.tabs.create({ url: extensionURL })
  return result
}

export async function openExternalPage(url: string): Promise<Tabs.Tab> {
  const result = await browser.tabs.create({ url })
  return result
}
