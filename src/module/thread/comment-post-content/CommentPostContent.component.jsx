import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CommentPropTypes, DetailThreadPropTypes } from '../../../types/thread';
import { showTime } from '../../../utils';
import {
  downvoteComment,
  neutralvoteComment,
  upvoteComment
} from '../../../store/threads/threads.reducer';

const { Title } = Typography;
export function CommentPostContent({ thread, comment }) {
  const { owner, createdAt, upVotesBy, downVotesBy } = comment;
  const { user } = useSelector((state) => state.users);
  const isUserMeUpvote = user ? upVotesBy.includes(user.id) : false;
  const isUserMeDownvote = user ? downVotesBy.includes(user.id) : false;
  const dispatch = useDispatch();

  const handleUpvote = () => {
    dispatch(
      upvoteComment({
        threadId: thread.id,
        commentId: comment.id,
        userId: user.id,
        isUserMeDownvote
      })
    );
  };
  const handleDownvote = () => {
    dispatch(
      downvoteComment({
        threadId: thread.id,
        commentId: comment.id,
        userId: user.id,
        isUserMeUpvote
      })
    );
  };
  const handleNeutralVote = () => {
    dispatch(
      neutralvoteComment({
        threadId: thread.id,
        commentId: comment.id,
        userId: user.id,
        isUserMeUpvote,
        isUserMeDownvote
      })
    );
  };

  return (
    comment && (
      <Card>
        <Flex vertical gap={20}>
          <Flex align="center" gap={5}>
            <Avatar src={owner.avatar} />
            <Title level={5} style={{ margin: 0 }}>
              {owner.name}
            </Title>
          </Flex>
          <Typography
            dangerouslySetInnerHTML={{
              __html: comment.content || ''
            }}
          />
          <Flex gap={5} align="center">
            <Button
              type="text"
              size="small"
              onClick={isUserMeUpvote ? handleNeutralVote : handleUpvote}>
              <Flex align="center" gap={5}>
                {isUserMeUpvote ? <LikeFilled /> : <LikeOutlined />}
                <Typography>{comment.upVotesBy.length}</Typography>
              </Flex>
            </Button>
            <Button
              type="text"
              size="small"
              onClick={isUserMeDownvote ? handleNeutralVote : handleDownvote}>
              <Flex align="center" gap={5}>
                {isUserMeDownvote ? <DislikeFilled /> : <DislikeOutlined />}

                <Typography>{comment.downVotesBy.length}</Typography>
              </Flex>
            </Button>
            <Flex align="center" gap={5}>
              {showTime(createdAt)}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    )
  );
}

CommentPostContent.propTypes = {
  thread: PropTypes.shape(DetailThreadPropTypes).isRequired,
  comment: PropTypes.shape(CommentPropTypes).isRequired
};
