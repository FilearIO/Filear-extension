import browser from 'webextension-polyfill'

export async function popupWindow(
  route: string = '',
  queryString: string = '',
  callback?: VoidFunction,
): Promise<number | undefined> {
  let extensionURL = browser.runtime.getURL('home.html')

  if (route !== '') {
    extensionURL += `#${route}`
  }

  if (queryString !== '') {
    extensionURL += `?${queryString}`
  }

  const { width = 0, left = 0, top = 0 } = await browser.windows.getLastFocused()

  const w = await browser.windows.create({
    width: 375,
    height: 620,
    url: extensionURL,
    focused: true,
    type: 'popup',
    top,
    left: Math.floor(left + width - 450),
  })

  browser.windows.onRemoved.addListener(windowId => {
    if (w.id !== null && windowId === w.id && callback !== undefined) {
      callback()
    }
  })

  return w.id
}
