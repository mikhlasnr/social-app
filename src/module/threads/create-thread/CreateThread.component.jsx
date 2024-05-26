import { Button, Flex, Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postThreads } from '../../../store/threads/threads.reducer';

const { TextArea } = Input;

export function CreateThread() {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const postThread = async (values) => {
    const { title, body, category } = values;
    let requestBody = { title, body };
    if (category) requestBody = { ...requestBody, category };

    try {
      setIsLoading(true);
      dispatch(postThreads({ requestBody }));
      form.resetFields();
      message.success('Thread created successfully');
      setIsOpen(false);
    } catch (error) {
      message.error('Thread created failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = (values) => {
    if (values) {
      postThread(values);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} size="large">
        Create Thread
      </Button>
      <Modal
        open={isOpen}
        maskClosable={false}
        title="Create Thread"
        onCancel={handleCancel}
        footer={null}>
        <Form
          form={form}
          name="form-note"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            requiredMarkValue: true,
            layout: 'vertical',
            title: '',
            body: ''
          }}
          disabled={isLoading}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input title!'
              }
            ]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="body"
            rules={[
              {
                required: true,
                message: 'Please input content'
              }
            ]}>
            <TextArea size="large" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Flex gap={16} justify="flex-end">
              <Button size="large" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button size="large" type="primary" htmlType="submit" loading={isLoading}>
                Create
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
