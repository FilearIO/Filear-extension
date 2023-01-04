import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { type TransactionEdge } from '@shared/interface'

import { HomeLayout } from '@views/components/Layout'
import List from '@views/components/List'
import { AppDispatch } from '@views/store'
import { listSelector, fetchAppList, pageInfoSelector } from '@views/store/app'
import { accountSelector } from '@views/store/wallet'

import UploadFile from './UploadFile'
import Item from './Item'

import style from './style.module.scss'

type ListProps = TransactionEdge & { id: string }

const Home: React.FC = () => {
  const account = useSelector(accountSelector)
  const list = useSelector(listSelector)
  const pageInfo = useSelector(pageInfoSelector)
  const dispatch = useDispatch<AppDispatch>()
  const requestRef = useRef(false)

  useEffect(() => {
    if (requestRef.current) return
    requestRef.current = true

    async function getList(): Promise<void> {
      if (account?.address === undefined) return
      if (list.length > 0) return

      await dispatch(fetchAppList({ address: account.address }))
    }
    void getList()
  }, [account])

  const request = async (): Promise<void> => {
    if (account?.address === undefined) return
    if (!pageInfo.hasNextPage) return

    await dispatch(fetchAppList({ address: account.address, after: list[list.length - 1].cursor }))
  }

  return (
    <HomeLayout>
      <div className={style.main}>
        <UploadFile />
        <div className={style.list}>
          <List<ListProps>
            height={104}
            data={list.map(item => ({ id: item.node.id, ...item }))}
            render={(data, index) => <Item item={data} index={index} />}
            request={request}
          />
        </div>
      </div>
    </HomeLayout>
  )
}

export default Home
