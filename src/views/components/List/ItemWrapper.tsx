import React, { useEffect, useRef, useMemo, useState } from 'react'

export interface ItemDataBase {
  id: string
}

export type RenderFunction<T> = (data: T, index: number) => React.ReactNode

interface ItemWrapperProps<T extends ItemDataBase> {
  height: number
  data: T
  index: number
  render: RenderFunction<T>
  request?: () => {}
}

let idCache = '_'

function ItemWrapper<T extends ItemDataBase>({
  height,
  render,
  data,
  index,
  request,
}: ItemWrapperProps<T>): React.ReactElement {
  const [show, setShow] = useState<boolean>(false)
  const ref = useRef(null)
  const reqRef = useRef<VoidFunction | undefined>(undefined)

  useEffect(() => {
    reqRef.current = request
  }, [request])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      const [entry] = entries
      setShow(entry.isIntersecting)
      if (entry.isIntersecting && reqRef.current !== undefined && idCache !== data.id) {
        idCache = data.id
        reqRef.current()
      }
    })
    if (ref.current !== null) intersectionObserver.observe(ref.current)
    return () => {
      intersectionObserver.disconnect()
    }
  }, [])

  const ele = useMemo(() => render(data, index), [render, data, index])

  return useMemo(
    () => (
      <div ref={ref} style={{ height: `${height}px` }}>
        {show && ele}
      </div>
    ),
    [height, show, ele],
  )
}

export default ItemWrapper
