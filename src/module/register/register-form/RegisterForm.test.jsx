/**
 * Test Scenario for RegisterForm component
 *
 * - RegisterForm component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should handle confirm password typing correctly
 *  - should call onFinish function when register button is clicked
 */

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { RegisterForm } from './RegisterForm.component'

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

describe('RegisterForm component', () => {
  afterEach(() => {
    cleanup()
  })
  it('should handle name typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <RegisterForm onFinish={vi.fn()} status="idle" />
      </BrowserRouter>,
    )
    const nameInput = await screen.findByLabelText('Name')

    // Action
    await userEvent.type(nameInput, 'John Doe')

    // Assert
    expect(nameInput.value).toBe('John Doe')
  })

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <RegisterForm onFinish={vi.fn()} status="idle" />
      </BrowserRouter>,
    )
    const emailInput = await screen.findByLabelText('Email')

    // Action
    await userEvent.type(emailInput, 'john@example.com')

    // Assert
    expect(emailInput.value).toBe('john@example.com')
  })

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <BrowserRouter>
        <RegisterForm onFinish={vi.fn()} status="idle" />
      </BrowserRouter>,
    )
    const passwordInput = await screen.findByLabelText('Password')

    // Action
    await userEvent.type(passwordInput, 'password123')

    // Assert
    expect(passwordInput.value).toBe('password123')
  })

  it('should call onFinish function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn()
    render(
      <BrowserRouter>
        <RegisterForm onFinish={mockRegister} status="idle" />
      </BrowserRouter>,
    )
    const nameInput = await screen.findByLabelText('Name')
    const emailInput = await screen.findByLabelText('Email')
    const passwordInput = await screen.findByLabelText('Password')
    const confirmPasswordInput =
      await screen.findByLabelText('Confirm Password')

    const registerButton = await screen.findByRole('button', {
      name: /register/i,
    })

    await userEvent.type(nameInput, 'John Doe')
    await userEvent.type(emailInput, 'john@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.type(confirmPasswordInput, 'password123')

    // Action
    await userEvent.click(registerButton)

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirm: 'password123',
    })
  })
})
