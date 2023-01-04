import browser, { Notifications } from 'webextension-polyfill'

type Config = Notifications.NotificationItem

export default async function browerNotification(config: Config): Promise<void> {
  await browser.notifications.create({
    type: 'basic',
    iconUrl: browser.runtime.getURL('icons/logo64.png'),
    title: config.title,
    message: config.message,
  })
}
