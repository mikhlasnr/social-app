import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Tag, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  downvoteThread,
  neutralvoteThread,
  upvoteThread
} from '../../../store/threads/threads.reducer';
import { DetailThreadPropTypes } from '../../../types/thread';
import { showTime } from '../../../utils';

const { Title } = Typography;

export function ThreadCard({ thread }) {
  const { owner } = thread;

  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const isUserMeUpvote = user ? thread.upVotesBy.includes(user.id) : false;
  const isUserMeDownvote = user ? thread.downVotesBy.includes(user.id) : false;
  const handleUpvote = () => {
    dispatch(upvoteThread({ threadId: thread.id, userId: user.id, isUserMeDownvote }));
  };
  const handleDownvote = () => {
    dispatch(downvoteThread({ threadId: thread.id, userId: user.id, isUserMeUpvote }));
  };
  const handleNeutralVote = () => {
    dispatch(
      neutralvoteThread({ threadId: thread.id, userId: user.id, isUserMeUpvote, isUserMeDownvote })
    );
  };
  return (
    thread && (
      <Card>
        <Flex vertical gap={15}>
          <Flex vertical gap={10}>
            <Flex wrap="wrap" gap={5}>
              <Tag>#{thread.category}</Tag>
            </Flex>
            <Flex align="center" gap={10}>
              <Avatar size={26} src={owner.avatar} shape="circle" />
              <Title level={3} style={{ margin: 0 }}>
                {owner.name}
              </Title>
            </Flex>
            <Title level={3}>{thread.title}</Title>
            <Typography
              dangerouslySetInnerHTML={{
                __html: thread.body || ''
              }}
            />
          </Flex>
          <Flex gap={10} align="center">
            <Button
              type="text"
              size="small"
              onClick={isUserMeUpvote ? handleNeutralVote : handleUpvote}>
              <Flex align="center" gap={5}>
                {isUserMeUpvote ? <LikeFilled /> : <LikeOutlined />}
                <Typography>{thread.upVotesBy.length}</Typography>
              </Flex>
            </Button>
            <Button
              type="text"
              size="small"
              onClick={isUserMeDownvote ? handleNeutralVote : handleDownvote}>
              <Flex align="center" gap={5}>
                {isUserMeDownvote ? <DislikeFilled /> : <DislikeOutlined />}
                <Typography>{thread.downVotesBy.length}</Typography>
              </Flex>
            </Button>
            <Flex align="center" gap={5}>
              {showTime(thread.createdAt)}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    )
  );
}

ThreadCard.propTypes = {
  thread: PropTypes.shape(DetailThreadPropTypes).isRequired
};
