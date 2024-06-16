import { Card, Spin, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import AuthLayout from '../../components/auth-layout/AuthLayout.component'

import { RegisterForm } from '../../module/register/register-form/RegisterForm.component'
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
          <RegisterForm onFinish={onFinish} status={status} />
        </Card>
      </Spin>
    </AuthLayout>
  )
}
