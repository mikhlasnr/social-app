import { Button, Flex, Form, Input } from 'antd'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export function LoginForm({ onFinish, status }) {
  return (
    <Form name="login" onFinish={onFinish} layout="vertical" scrollToFirstError>
      <Form.Item
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="name" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Flex vertical gap={5}>
          <Button
            type="primary"
            htmlType="submit"
            loading={status === 'loading'}
            block
          >
            Login
          </Button>
          <span>
            Dont have an account yet? Come on{' '}
            <Link to="/register">Register</Link>
          </span>
        </Flex>
      </Form.Item>
    </Form>
  )
}

LoginForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
}
