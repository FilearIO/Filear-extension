import React from 'react'
import ItemWrapper, { type RenderFunction, type ItemDataBase } from './ItemWrapper'

interface ListProps<ItemData extends ItemDataBase> {
  height: number
  data: ItemData[]
  render: RenderFunction<ItemData>
  request?: () => {}
}

function List<ItemData extends ItemDataBase>({
  height,
  data,
  render,
  request,
}: ListProps<ItemData>): React.ReactElement {
  return (
    <div>
      {data.map((item, index) => (
        <ItemWrapper<ItemData>
          key={item.id}
          height={height}
          data={item}
          index={index}
          render={render}
          request={index === data.length - 2 ? request : undefined}
        />
      ))}
    </div>
  )
}

export default List
