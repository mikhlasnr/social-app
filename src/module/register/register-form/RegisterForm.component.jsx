import { Button, Flex, Form, Input } from 'antd'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export function RegisterForm({ onFinish, status }) {
  return (
    <Form
      name="register"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 6,
            message: 'Password minimum 6 character!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!'),
              )
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Flex vertical gap={5}>
          <Button
            type="primary"
            htmlType="submit"
            loading={status === 'loading'}
            block
          >
            Register
          </Button>
          <span>
            Already have an account? <Link to="/login">Login now</Link>
          </span>
        </Flex>
      </Form.Item>
    </Form>
  )
}

RegisterForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
}
