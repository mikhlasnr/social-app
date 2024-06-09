import { MoonOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalStorage } from '../../hook/useLocalStorage'
import { setTheme, toggleTheme } from '../../store/theme/theme.reducer'

function ThemeToggle() {
  const selectedTheme = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const [localStorageTheme, setLocalStorageTheme] = useLocalStorage(
    'theme',
    'light',
  )

  useEffect(() => {
    dispatch(setTheme(localStorageTheme))
  }, [dispatch, localStorageTheme])

  useEffect(() => {
    setLocalStorageTheme(selectedTheme)
  }, [selectedTheme, setLocalStorageTheme])

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24,
      }}
      icon={<SettingOutlined />}
      tooltip={<div>Setting</div>}
    >
      <FloatButton
        icon={selectedTheme === 'light' ? <MoonOutlined /> : <SunOutlined />}
        tooltip={
          <div>{selectedTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</div>
        }
        onClick={handleToggle}
      />
    </FloatButton.Group>
  )
}

export default ThemeToggle
