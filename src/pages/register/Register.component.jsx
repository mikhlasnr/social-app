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
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import AuthLayout from '../../components/auth-layout/AuthLayout.component'

import { registerUser } from '../../store/users/users.reducer'

const { Title } = Typography

export function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.users)

  const onFinish = async (values) => {
    try {
      const requestBody = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
      const response = await dispatch(registerUser({ requestBody })).unwrap()
      const { data } = await response
      if (data.status === 'fail') {
        throw data
      }
      message.success(response.message)
      navigate('/login')
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <AuthLayout>
      <Spin spinning={status === 'loading'}>
        <Card>
          <Title level={1}>Register</Title>
          <Form
            name="login"
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
                      new Error(
                        'The new password that you entered do not match!',
                      ),
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
        </Card>
      </Spin>
    </AuthLayout>
  )
}
