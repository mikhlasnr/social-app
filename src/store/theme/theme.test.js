/**
 * Test scenario for leaderboardsSlice
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given an unknown action
 *  - should handle the getLeaderboards pending state
 *  - should handle the getLeaderboards fulfilled state
 *  - should handle the getLeaderboards rejected state
 *  - should dispatch showLoading and hideLoading actions correctly
 */

import { describe, it, expect } from 'vitest'
import { themeReducer, toggleTheme, setTheme } from './theme.reducer'

describe('themeSlice reducer', () => {
  it('should return the initial state', () => {
    // arrange
    const initialState = 'light'

    // action
    const state = themeReducer(undefined, { type: '@@INIT' })

    // assert
    expect(state).toBe(initialState)
  })

  it('should handle toggleTheme action', () => {
    // arrange
    const initialState = 'light'

    // action
    const state = themeReducer(initialState, toggleTheme())

    // assert
    expect(state).toBe('dark')

    // action
    const newState = themeReducer(state, toggleTheme())

    // assert
    expect(newState).toBe('light')
  })

  it('should handle setTheme action to dark', () => {
    // arrange
    const initialState = 'light'
    const newTheme = 'dark'

    // action
    const state = themeReducer(initialState, setTheme(newTheme))

    // assert
    expect(state).toBe(newTheme)
  })

  it('should handle setTheme action to light', () => {
    // arrange
    const initialState = 'dark'
    const newTheme = 'light'

    // action
    const state = themeReducer(initialState, setTheme(newTheme))

    // assert
    expect(state).toBe(newTheme)
  })
})
