/**
 * Test Scenario for headerReducer
 *
 * - headerReducer function
 *  - should return the initial state when given an unknown action
 *  - should set the title when given the setTitle action
 *  - should handle multiple setTitle actions sequentially
 *
 */

import { describe, it, expect } from 'vitest'
import { headerReducer, setTitle } from './header.reducer'

// Define the initial state for the tests
const initialState = {
  title: '',
}

describe('headerReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const action = { type: 'UNKNOWN_ACTION' }

    // Action
    const nextState = headerReducer(undefined, action)

    // Assert
    expect(nextState).toEqual(initialState)
  })

  it('should set the title when given the setTitle action', () => {
    // Arrange
    const newTitle = 'New Title'
    const action = setTitle(newTitle)

    // Action
    const nextState = headerReducer(initialState, action)

    // Assert
    expect(nextState.title).toBe(newTitle)
  })

  it('should handle multiple setTitle actions sequentially', () => {
    // Arrange
    const firstTitle = 'First Title'
    const secondTitle = 'Second Title'
    const firstAction = setTitle(firstTitle)
    const secondAction = setTitle(secondTitle)

    // Action
    const firstState = headerReducer(initialState, firstAction)

    // Assert
    expect(firstState.title).toBe(firstTitle)

    // Action
    const secondState = headerReducer(firstState, secondAction)

    // Assert
    expect(secondState.title).toBe(secondTitle)
  })

  it('should handle multiple setTitle actions sequentially with immediate checks', () => {
    // Arrange
    const firstTitle = 'First Title'
    const secondTitle = 'Second Title'

    // Action
    const firstState = headerReducer(initialState, setTitle(firstTitle))
    // Assert
    expect(firstState.title).toBe(firstTitle)

    // Action
    const secondState = headerReducer(firstState, setTitle(secondTitle))
    // Assert
    expect(secondState.title).toBe(secondTitle)
  })
})
