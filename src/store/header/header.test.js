/**
 * Test scenario for headerReducer
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
    // arrange
    const action = { type: 'UNKNOWN_ACTION' }

    // action
    const nextState = headerReducer(undefined, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it('should set the title when given the setTitle action', () => {
    // arrange
    const newTitle = 'New Title'
    const action = setTitle(newTitle)

    // action
    const nextState = headerReducer(initialState, action)

    // assert
    expect(nextState.title).toBe(newTitle)
  })

  it('should handle multiple setTitle actions sequentially', () => {
    // arrange
    const firstTitle = 'First Title'
    const secondTitle = 'Second Title'
    const firstAction = setTitle(firstTitle)
    const secondAction = setTitle(secondTitle)

    // action
    let nextState = headerReducer(initialState, firstAction)

    // assert
    expect(nextState.title).toBe(firstTitle)

    // action
    nextState = headerReducer(nextState, secondAction)

    // assert
    expect(nextState.title).toBe(secondTitle)
  })
})
