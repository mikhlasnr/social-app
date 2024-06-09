import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Spin,
  Typography,
  message,
} from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'
import AuthLayout from '../../components/auth-layout/AuthLayout.component'
import { loginUser } from '../../store/users/users.reducer'

const { Title } = Typography

export function Login() {
  const { login } = useAuth()
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.users)

  const onFinish = async (values) => {
    try {
      const response = await dispatch(
        loginUser({ requestBody: values }),
      ).unwrap()
      const { data } = await response
      if (data.status === 'fail') {
        throw data
      }
      message.success(response.message)
      const { token } = data
      await login(token)
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <AuthLayout>
      <Spin spinning={status === 'loading'}>
        <Card>
          <Title level={1}>Login</Title>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
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
                  Login
                </Button>
                <span>
                  Dont have an account yet? Come on{' '}
                  <Link to="/register">Register</Link>
                </span>
              </Flex>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </AuthLayout>
  )
}
