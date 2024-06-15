import { Card, Spin, Typography, message } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import AuthLayout from '../../components/auth-layout/AuthLayout.component'
import { useAuth } from '../../hook/useAuth'
import { LoginForm } from '../../module/login/login-form/LoginForm.component'
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
          <LoginForm onFinish={onFinish} status={status} />
        </Card>
      </Spin>
    </AuthLayout>
  )
}
