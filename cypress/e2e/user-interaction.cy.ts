describe('User Interaction - Delete Food Item', () => {
  const mockFood = {
    id: '1',
    name: 'Test Pizza',
    price: 15.99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    restaurant: {
      name: 'Pizza Place',
      logo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100',
      status: 'Open Now'
    }
  }

  beforeEach(() => {
    // Mock initial foods
    cy.intercept('GET', 'https://6852821e0594059b23cdd834.mockapi.io/Food', {
      statusCode: 200,
      body: [mockFood]
    }).as('getFoods')

    // Mock delete endpoint
    cy.intercept('DELETE', 'https://6852821e0594059b23cdd834.mockapi.io/Food/1', {
      statusCode: 200,
      body: { message: 'Food deleted successfully' }
    }).as('deleteFood')

    cy.visit('/')
    cy.wait('@getFoods')
  })

  it('should open delete confirmation modal when delete is clicked', () => {
    // Click the more options button
    cy.get('[data-test-id="food-more-btn"]').click()

    // Click delete option
    cy.get('[data-test-id="food-dropdown-delete"]').click()

    // Verify modal opens with correct content
    cy.get('[data-test-id="food-modal-content"]').should('be.visible')
    cy.get('[data-test-id="food-modal-title"]')
      .should('contain', 'Delete Food Item')
    
    cy.contains('Are you sure you want to delete "Test Pizza"?')
      .should('be.visible')

    // Verify action buttons are present
    cy.get('[data-test-id="food-cancel-delete-btn"]')
      .should('be.visible')
      .and('contain', 'Cancel')
    
    cy.get('[data-test-id="food-confirm-delete-btn"]')
      .should('be.visible')
      .and('contain', 'Delete')
  })

  it('should cancel delete when cancel button is clicked', () => {
    // Open delete modal
    cy.get('[data-test-id="food-more-btn"]').click()
    cy.get('[data-test-id="food-dropdown-delete"]').click()

    // Click cancel
    cy.get('[data-test-id="food-cancel-delete-btn"]').click()

    // Verify modal closes
    cy.get('[data-test-id="food-modal-content"]').should('not.exist')

    // Verify food item is still there
    cy.get('[data-test-id="food-card"]').should('have.length', 1)
    cy.get('[data-test-id="food-name"]').should('contain', 'Test Pizza')
  })

  it('should delete food item when confirm is clicked', () => {
    // Mock empty response after delete
    cy.intercept('GET', 'https://6852821e0594059b23cdd834.mockapi.io/Food', {
      statusCode: 200,
      body: []
    }).as('getFoodsEmpty')

    // Open delete modal
    cy.get('[data-test-id="food-more-btn"]').click()
    cy.get('[data-test-id="food-dropdown-delete"]').click()

    // Click confirm delete
    cy.get('[data-test-id="food-confirm-delete-btn"]').click()

    // Verify DELETE API was called
    cy.wait('@deleteFood').its('request.url').should('include', '/Food/1')

    // Wait for refetch and verify empty state
    cy.wait('@getFoodsEmpty')
    cy.get('[data-test-id="food-empty-title"]')
      .should('be.visible')
      .and('contain', 'Menu is Empty')
  })

  it('should close dropdown when clicking outside', () => {
    // Open dropdown
    cy.get('[data-test-id="food-more-btn"]').click()
    cy.get('[data-test-id="food-dropdown-edit"]').should('be.visible')

    // Click outside (on the food image)
    cy.get('[data-test-id="food-name"]').click()

    // Verify dropdown is closed
    cy.get('[data-test-id="food-dropdown-edit"]').should('not.exist')
  })
})