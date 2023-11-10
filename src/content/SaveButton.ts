/**
 * save button
 */

import { v4 as uuidv4 } from 'uuid'
import Browser from 'webextension-polyfill'

import PortConnect, { PortName } from '@shared/port'
import { UploadInterface, type UploadFileParams } from '@shared/interface/api'
// import { readImg } from '@shared/utils/readImg'

import { fetchImg } from './fetchImg'

const style = [
  'border: none',
  'border-radius: 10px',
  'padding: 0 8px',
  'width: auto',
  'height: 20px',
  'font: 11px/20px "Helvetica Neue", Helvetica, sans-serif',
  'font-weight: bold',
  'line-height: 20px',
  'text-indent: 12px',
  'color: #3772FF',
  'background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDUwIDUwIiBmaWxsPSJub25lIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNTUxXzE1MSkiPjxwYXRoIGQ9Ik00OC41OTM0IDQ1LjE3MlYxNy43MzQ3QzQ4LjU5MzQgMTYuODQyNiA0Ny44Njg0IDE2LjExNzYgNDYuOTc2MyAxNi4xMTc2SDQ2LjU3MkM0NS42Nzk5IDE2LjExNzYgNDQuOTU0OSAxNS4zOTI1IDQ0Ljk1NDkgMTQuNTAwNVYxNC40MzM2QzQ0Ljk1NDkgMTMuNTQxNiA0NC4yMjk5IDEyLjgxNjUgNDMuMzM3OCAxMi44MTY1SDMzLjQyOEMzMi41MzU5IDEyLjgxNjUgMzEuODEwOSAxMy41NDE2IDMxLjgxMDkgMTQuNDMzNkMzMS44MTA5IDE1LjMyNTcgMzEuMDg1OSAxNi4wNTA3IDMwLjE5MzggMTYuMDUwN0gxMC43MDVDOS44MTI5MiAxNi4wNTA3IDkuMDg3ODkgMTYuNzc1OCA5LjA4Nzg5IDE3LjY2NzhWNDMuNTU0OUM5LjA4Nzg5IDQ0LjQ0NyA5LjgxMjkyIDQ1LjE3MiAxMC43MDUgNDUuMTcySDQ4LjU5MzRaIiBmaWxsPSIjMzc3MkZGIi8+PHBhdGggZD0iTTQzLjEzMDYgMTguNjQwMUw0OC41OTM0IDQ1LjE3Mkw5LjU5OTA2IDQ0LjkzNDhMNC41NTM5NiAxOC42NDAxSDQzLjEzMDZaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0zNi44MTI1IDIxLjAzOTFIMi4xMjgyN0MwLjYwNDcxNiAyMS4wMzkxIC0wLjQyNDM1MiAyMi41OTk0IDAuMTczNzEgMjMuOTk5M0w4LjcwMzYxIDQzLjk1NTlDOS4xNDEzIDQ0Ljk3ODMgMTAuMTUwMyA0NS42MzY1IDExLjI1OTYgNDUuNjIzMUw0OC41OTM0IDQ1LjE3MjFMMzguNzYzOCAyMi4zMjIxQzM4LjQyOTYgMjEuNTQwMyAzNy42NjEyIDIxLjAzNTggMzYuODEyNSAyMS4wMzU4VjIxLjAzOTFaIiBmaWxsPSIjOTM2RUZDIi8+PHBhdGggZD0iTTQ0LjM3MzUgMTEuNTEzNUgzMi4xMTgzQzMyLjExODMgNS4xNTUzNiAzNy4yNzM2IDAgNDMuNjMxOCAwSDQ5LjQyODdDNDkuOTkgMCA1MC4yMTcyIDAuNzE1MDAyIDQ5Ljc2MjggMS4wNDU3N0M0Ny43MTEzIDIuNTI5MjQgNDQuNTc0IDUuNzMwMDQgNDQuMzc2OSAxMS41MTM1SDQ0LjM3MzVaIiBmaWxsPSIjMzc3MkZGIi8+PHBhdGggZD0iTTQxLjg5MTEgNS43NTM0MUM0Mi41NzU3IDUuNzUzNDEgNDMuMTMwNyA1LjE5ODQ0IDQzLjEzMDcgNC41MTM4NUM0My4xMzA3IDMuODI5MjYgNDIuNTc1NyAzLjI3NDI5IDQxLjg5MTEgMy4yNzQyOUM0MS4yMDY1IDMuMjc0MjkgNDAuNjUxNiAzLjgyOTI2IDQwLjY1MTYgNC41MTM4NUM0MC42NTE2IDUuMTk4NDQgNDEuMjA2NSA1Ljc1MzQxIDQxLjg5MTEgNS43NTM0MVoiIGZpbGw9IndoaXRlIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDBfNTUxXzE1MSI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjQ1LjYyMzEiIGZpbGw9IndoaXRlIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+) 4px 50% no-repeat',
  'background-size: 12px 12px',
  'text-align: center',
  'vertical-align: middle',
  'cursor: pointer',
  // extra rules for extensions only
  'position: absolute',
  'opacity: 1',
  'z-index: 800000',
  'display: none',
  '-webkit-font-smoothing: antialiased',
  '-moz-osx-font-smoothing: grayscale',
]

const config = {
  offset: {
    top: 10,
    left: 10,
    right: 32,
  },
}

function getPosition(ele: HTMLElement): { top: number; left: number; bottom: number; right: number } {
  const rect = ele.getBoundingClientRect()
  return {
    top: Math.round(Number(rect.top) + window.scrollY),
    left: Math.round(Number(rect.left) + window.scrollX),
    bottom: Math.round(Number(rect.bottom) + window.scrollY),
    right: Math.round(Number(rect.right) + window.scrollX),
  }
}

function checkImage(img: HTMLImageElement): boolean {
  // all images can have hoverbuttons until one of our functions says otherwise
  let blockButton = false
  // if any of these functions return true, the image should not show a hoverbutton
  ;[
    // be sure our image has a source
    () => {
      if (img.currentSrc === undefined || img.currentSrc === '') {
        return true
      }
    },
    // be sure our current source came from a server
    () => {
      if (img.currentSrc.match(/^http/) == null && img.currentSrc.match(/^data/) == null) {
        return true
      }
    },
    // be sure the displayed height AND width are both greater than 90px
    () => {
      if (img.naturalHeight < 90 || img.naturalWidth < 90) {
        return true
      }
    },
    // if natural size is at least 90x90, check that displayed height OR width > 119
    () => {
      if (img.naturalHeight > 119 || img.naturalWidth > 119) {
        return false
      } else {
        return true
      }
    },
    // some images are resized using img.height and img.width; don't hover over these if the actual source sizes are too small
    () => {
      if (img.height < 90 || img.width < 90) {
        return true
      }
    },
    // if we're at least 90x90, check that height OR width > 119
    () => {
      if (img.height > 119 || img.width > 119) {
        return false
      } else {
        return true
      }
    },
  ].forEach(it => {
    if (it() === true) {
      blockButton = true
    }
  })
  return blockButton
}

export default class SaveButton {
  private saveButtonEle!: HTMLSpanElement
  private appended = false
  private hoverImg: HTMLImageElement | null = null
  private saveButtonShow = false
  private hideTimer: number | undefined = undefined

  constructor() {
    this.init()
  }

  private init(): void {
    this.createEle()
    this.bindEmit()
  }

  private createEle(): void {
    this.saveButtonEle = document.createElement('span')
    this.saveButtonEle.innerText = 'save'
    this.saveButtonEle.setAttribute('style', style.join('!important;'))
  }

  private bindEmit(): void {
    document.onreadystatechange = () => {
      if (document.readyState === 'interactive') {
        document.body.addEventListener('click', this.click.bind(this))
        // when mouse over an element, check if show hoverbuttons
        document.body.addEventListener('mouseover', this.mouseover.bind(this))
        document.body.addEventListener('mouseout', this.mouseout.bind(this))

        window.addEventListener('blur', this.hide.bind(this))
      }
    }
  }

  private async click(e: Event): Promise<void> {
    const ele = e.target as HTMLElement
    if (ele === this.saveButtonEle && this.hoverImg !== null) {
      // const data = await readImg(this.hoverImg)
      const { hexString, name, type } = await fetchImg(this.hoverImg.currentSrc)

      const port = new PortConnect(Browser.runtime.connect({ name: PortName.CONTENT__BACKGROUND }))
      port.sendMessage<UploadFileParams, any>({
        uuid: uuidv4(),
        methods: UploadInterface.UploadFile,
        params: {
          data: hexString,
          name,
          type,
        },
      })
    }
  }

  private mouseover(e: MouseEvent): void {
    const ele = e.target as HTMLElement
    if (ele === this.saveButtonEle) {
      window.clearTimeout(this.hideTimer)
    }

    if (ele !== null && ele.tagName === 'IMG' && !checkImage(ele as HTMLImageElement)) {
      window.clearTimeout(this.hideTimer)

      // append to body on first hover over eligible image
      if (!this.appended) {
        document.body.appendChild(this.saveButtonEle)
        this.appended = true
      }

      const p = getPosition(ele)
      this.saveButtonEle.style.top = `${p.top + config.offset.top}px`
      this.saveButtonEle.style.left = `${p.left + config.offset.left}px`
      this.saveButtonEle.style.display = 'block'
      this.hoverImg = ele as HTMLImageElement
      this.saveButtonShow = true
    }
  }

  private mouseout(e: MouseEvent): void {
    if (this.saveButtonShow) {
      const ele = e.target as HTMLElement
      if (ele !== this.saveButtonEle) {
        this.hide()
      }
    }
  }

  private hide(): void {
    window.clearTimeout(this.hideTimer)
    this.hideTimer = window.setTimeout(() => {
      this.saveButtonEle.style.display = 'none'
      this.saveButtonEle.style.display = 'none'
      this.saveButtonShow = false
    }, 100)
  }
}
