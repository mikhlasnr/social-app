import { Alert, Card, Flex, Skeleton } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BaseContainer } from '../../components/base-container/BaseContainer.component'
import { CommentList } from '../../module/thread/comment-list/CommentList.component'
import { ThreadCard } from '../../module/thread/thread-card/ThreadCard'
import { setTitle } from '../../store/header/header.reducer'
import { getThreadDetail } from '../../store/threads/threads.reducer'
import './Thread.styles.scss'

export function Thread() {
  const { threadId } = useParams()
  const { thread, status, error } = useSelector((state) => state.threads)
  const dispatch = useDispatch()

  useEffect(() => {
    if (threadId) {
      dispatch(getThreadDetail({ threadId }))
    }
    dispatch(setTitle('Thread'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId])

  if (status === 'loading')
    return (
      <BaseContainer>
        <Card>
          <Skeleton />
        </Card>
      </BaseContainer>
    )

  if (status === 'failed')
    return <Alert message={error.toString()} type="error" />

  return (
    thread && (
      <BaseContainer>
        <div className="thread">
          <Flex vertical gap={20}>
            <ThreadCard thread={thread} />
            <CommentList thread={thread} />
          </Flex>
        </div>
      </BaseContainer>
    )
  )
}
