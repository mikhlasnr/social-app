import { describe, it, expect } from 'vitest'
import { themeReducer, toggleTheme, setTheme } from './theme.reducer'

/**
 * Test Scenario for themeReducer
 *
 * - themeReducer function
 *   - should return the initial state
 *   - should handle toggleTheme action
 *   - should handle setTheme action to dark
 *   - should handle setTheme action to light
 *   - should handle two consecutive toggleTheme actions
 */

describe('themeReducer function', () => {
  it('should return the initial state', () => {
    // Arrange
    const initialState = 'light'

    // Action
    const state = themeReducer(undefined, { type: '@@INIT' })

    // Assert
    expect(state).toBe(initialState)
  })

  it('should handle toggleTheme action', () => {
    // Arrange
    const initialState = 'light'

    // Action
    const state = themeReducer(initialState, toggleTheme())

    // Assert
    expect(state).toBe('dark')

    // Action
    const newState = themeReducer(state, toggleTheme())

    // Assert
    expect(newState).toBe('light')
  })

  it('should handle setTheme action to dark', () => {
    // Arrange
    const initialState = 'light'
    const newTheme = 'dark'

    // Action
    const state = themeReducer(initialState, setTheme(newTheme))

    // Assert
    expect(state).toBe(newTheme)
  })

  it('should handle setTheme action to light', () => {
    // Arrange
    const initialState = 'dark'
    const newTheme = 'light'

    // Action
    const state = themeReducer(initialState, setTheme(newTheme))

    // Assert
    expect(state).toBe(newTheme)
  })

  it('should handle two consecutive toggleTheme actions', () => {
    // Arrange
    const initialState = 'light'

    // Action - First Toggle
    const stateAfterFirstToggle = themeReducer(initialState, toggleTheme())

    // Assert - First Toggle
    expect(stateAfterFirstToggle).toBe('dark')

    // Action - Second Toggle
    const stateAfterSecondToggle = themeReducer(
      stateAfterFirstToggle,
      toggleTheme(),
    )

    // Assert - Second Toggle
    expect(stateAfterSecondToggle).toBe('light')
  })
})
