import {
  CommentOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Tag, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThreadsPropTypes } from '../../../types/threads'
import { showTime } from '../../../utils'
import {
  downvoteThread,
  neutralvoteThread,
  upvoteThread,
} from '../../../store/threads/threads.reducer'

const { Title } = Typography

export function ThreadsCard({ thread }) {
  const { users, user } = useSelector((state) => state.users)
  const [userOwner, setUserOwner] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    if (thread && users.length > 0) {
      const findUserOwner = users.find(
        (userData) => userData.id === thread.ownerId,
      )
      if (findUserOwner) setUserOwner(findUserOwner)
    }
  }, [thread, users])

  const isUserMeUpvote = user ? thread.upVotesBy.includes(user.id) : false
  const isUserMeDownvote = user ? thread.downVotesBy.includes(user.id) : false
  const handleUpvote = () => {
    dispatch(
      upvoteThread({ threadId: thread.id, userId: user.id, isUserMeDownvote }),
    )
  }
  const handleDownvote = () => {
    dispatch(
      downvoteThread({ threadId: thread.id, userId: user.id, isUserMeUpvote }),
    )
  }
  const handleNeutralVote = () => {
    dispatch(
      neutralvoteThread({
        threadId: thread.id,
        userId: user.id,
        isUserMeUpvote,
        isUserMeDownvote,
      }),
    )
  }
  return (
    thread && (
      <Card>
        <Flex vertical gap={15}>
          <Link to={`/thread/${thread.id}`}>
            <Flex vertical gap={10}>
              <Flex wrap="wrap" gap={5}>
                <Tag>#{thread.category}</Tag>
              </Flex>
              {userOwner && (
                <Flex align="center" gap={10}>
                  <Avatar size={26} src={userOwner.avatar} shape="circle" />
                  <Title level={3} style={{ margin: 0 }}>
                    {userOwner.name}
                  </Title>
                </Flex>
              )}
              <Title level={3}>{thread.title}</Title>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: thread.body || '',
                }}
              />
            </Flex>
          </Link>
          <Flex gap={10} align="center">
            <Button
              type="text"
              size="small"
              disabled={user === null}
              onClick={isUserMeUpvote ? handleNeutralVote : handleUpvote}
            >
              <Flex align="center" gap={5}>
                {isUserMeUpvote ? <LikeFilled /> : <LikeOutlined />}
                <Typography>{thread.upVotesBy.length}</Typography>
              </Flex>
            </Button>
            <Button
              type="text"
              size="small"
              disabled={user === null}
              onClick={isUserMeDownvote ? handleNeutralVote : handleDownvote}
            >
              <Flex align="center" gap={5}>
                {isUserMeDownvote ? <DislikeFilled /> : <DislikeOutlined />}

                <Typography>{thread.downVotesBy.length}</Typography>
              </Flex>
            </Button>
            <Link to={`/thread/${thread.id}`}>
              <Button type="link" size="small">
                <Flex align="center" gap={5}>
                  <CommentOutlined />
                  <Typography>{thread.totalComments}</Typography>
                </Flex>
              </Button>
            </Link>
            <Flex align="center" gap={5}>
              {showTime(thread.createdAt)}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    )
  )
}

ThreadsCard.propTypes = {
  thread: ThreadsPropTypes.isRequired,
}
