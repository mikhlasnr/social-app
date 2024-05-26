import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { postThreadDetailComment } from '../../../store/threads/threads.reducer';
import { DetailThreadPropTypes } from '../../../types/thread';

export function AddComment({ thread }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const postComment = async (values) => {
    try {
      setIsLoading(true);
      dispatch(postThreadDetailComment({ threadId: thread.id, content: values.content }));
      form.resetFields();
      message.success('Comment submitted successfully');
    } catch (error) {
      message.error('Comment submitted failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = (values) => {
    if (values) {
      postComment(values);
    }
  };

  return (
    <Form
      form={form}
      name="form-comment"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      initialValues={{
        requiredMarkValue: false
      }}>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: 'Please input comment!'
          }
        ]}
        style={{ marginBottom: 10 }}>
        <Input.TextArea
          style={{ resize: 'none' }}
          rows={4}
          placeholder="Send comment"
          disabled={isLoading}
        />
      </Form.Item>
      <Form.Item>
        <Button block size="large" type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

AddComment.propTypes = {
  thread: PropTypes.shape(DetailThreadPropTypes).isRequired
};
