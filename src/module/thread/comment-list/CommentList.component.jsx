import { Flex, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { DetailThreadPropTypes } from '../../../types/thread';
import { AddComment } from '../add-comment/AddComment.component';
import { CommentPostContent } from '../comment-post-content/CommentPostContent.component';

const { Title } = Typography;
export function CommentList({ thread }) {
  const { comments } = thread;
  return (
    <div>
      <AddComment thread={thread} />
      <Title level={2}>Comments ({comments.length})</Title>
      <Flex vertical gap={10}>
        {comments.map((comment) => (
          <CommentPostContent key={comment.id} thread={thread} comment={comment} />
        ))}
      </Flex>
    </div>
  );
}

CommentList.propTypes = {
  thread: PropTypes.shape(DetailThreadPropTypes).isRequired
};
