/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should display login page correctly', () => {
    // Verifies that the elements are visible on the login page
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button').contains(/login/i).should('be.visible')
  })

  it('should display alert when email is empty', () => {
    // Tries to submit the form without filling in the email
    cy.get('input[placeholder="Password"]').type('password123')
    cy.get('button').contains(/login/i).click()
    cy.get('.ant-form-item-explain-error').should(
      'contain',
      'Please input your E-mail!',
    )
  })

  it('should display alert when password is empty', () => {
    // Tries to submit the form without filling in the password
    cy.get('input[placeholder="Email"]').type('user@example.com')
    cy.get('button').contains(/login/i).click()
    cy.get('.ant-form-item-explain-error').should(
      'contain',
      'Please input your password!',
    )
  })

  it('should display alert when email and password are wrong', () => {
    // Tries to submit the form with incorrect email and password
    cy.get('input[placeholder="Email"]').type('wrong@example.com')
    cy.get('input[placeholder="Password"]').type('wrongpassword')
    cy.get('button').contains(/login/i).click()
    cy.get('.ant-message-error').should(
      'contain',
      /email or password is wrong/i,
    )
    
  })

  it('should display homepage when email and password are correct', () => {
    // Tries to submit the form with correct email and password
    cy.get('input[placeholder="Email"]').type('kevin123@gmail.com')
    cy.get('input[placeholder="Password"]').type('kevin123')
    cy.get('button').contains(/login/i).click()
    cy.get('button')
      .contains(/logout/i)
      .should('be.visible')
  })
})
