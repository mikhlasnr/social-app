// themeSlice.test.js
import { describe, it, expect } from 'vitest'
import { themeReducer, toggleTheme, setTheme } from './theme.reducer'

describe('themeSlice reducer', () => {
  it('should return the initial state', () => {
    // arrange
    const initialState = 'light'

    // act
    const state = themeReducer(undefined, { type: '@@INIT' })

    // assert
    expect(state).toBe(initialState)
  })

  it('should handle toggleTheme action', () => {
    // arrange
    const initialState = 'light'

    // act
    const state = themeReducer(initialState, toggleTheme())

    // assert
    expect(state).toBe('dark')

    // act
    const newState = themeReducer(state, toggleTheme())

    // assert
    expect(newState).toBe('light')
  })

  it('should handle setTheme action to dark', () => {
    // arrange
    const initialState = 'light'
    const newTheme = 'dark'

    // act
    const state = themeReducer(initialState, setTheme(newTheme))

    // assert
    expect(state).toBe(newTheme)
  })

  it('should handle setTheme action to light', () => {
    // arrange
    const initialState = 'dark'
    const newTheme = 'light'

    // act
    const state = themeReducer(initialState, setTheme(newTheme))

    // assert
    expect(state).toBe(newTheme)
  })
})