/**
 * skenario testing
 *
 * - LoginForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm.component'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

const renderLoginForm = (onFinish) => {
  return render(
    <BrowserRouter>
      <LoginForm onFinish={onFinish} status="idle" />
    </BrowserRouter>,
  )
}

const typeInInput = async (placeholder, value) => {
  const input = await screen.findByPlaceholderText(placeholder)
  await userEvent.type(input, value)
  return input
}

describe('LoginForm component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle email typing correctly', async () => {
    // Arrange
    renderLoginForm(vi.fn())
    const emailInput = await typeInInput('Email', 'test@example.com')

    // Assert
    expect(emailInput.value).toBe('test@example.com')
  })

  it('should handle password typing correctly', async () => {
    // Arrange
    renderLoginForm(vi.fn())
    const passwordInput = await typeInInput('Password', 'password123')

    // Assert
    expect(passwordInput.value).toBe('password123')
  })

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn()
    renderLoginForm(mockLogin)
    await typeInInput('Email', 'test@example.com')
    await typeInInput('Password', 'password123')
    const loginButton = await screen.findByRole('button', { name: /login/i })

    // Action
    await userEvent.click(loginButton)

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })
})
