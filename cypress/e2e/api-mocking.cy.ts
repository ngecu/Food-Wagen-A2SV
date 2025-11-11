// cypress/e2e/api-mocking.cy.ts
describe('API Mocking - Data Fetch and Error Handling', () => {
  describe('Successful Data Fetch and Display', () => {
    const mockFoods = [
      {
        id: '1',
        name: 'Spicy Chicken Burger',
        price: 14.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
        restaurant: {
          name: 'Burger Kingdom',
          logo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100',
          status: 'Open Now'
        }
      },
      {
        id: '2',
        name: 'Margherita Pizza',
        price: 16.99,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        restaurant: {
          name: 'Pizza Palace',
          logo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100',
          status: 'Closed'
        }
      },
      {
        id: '3',
        name: 'Caesar Salad',
        price: 10.99,
        rating: 4.1,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        restaurant: {
          name: 'Healthy Bites',
          logo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100',
          status: 'Open Now'
        }
      }
    ];

    it('should display loading state and successfully render food items', () => {
      // Mock API with delay to observe loading state
      cy.intercept('GET', '**/Food**', {
        statusCode: 200,
        body: mockFoods,
        delay: 2000 // 2 second delay to see loading clearly
      }).as('getFoodsWithDelay');

      cy.visit('/');

      // Verify loading state is displayed
      cy.get('[data-test-id="food-loading-spinner"]')
        .should('be.visible')
        .and('have.class', 'animate-spin');

      cy.get('[data-test-id="food-loading-text"]')
        .should('be.visible')
        .and('contain', 'Preparing your delicious meals');

      // Wait for API call to complete
      cy.wait('@getFoodsWithDelay');

      // Verify loading state disappears
      cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');
      cy.get('[data-test-id="food-loading-text"]').should('not.exist');

      // Verify correct number of food cards are rendered
      cy.get('[data-test-id="food-card"]').should('have.length', 3);

      // Verify all food items are displayed with correct information
      cy.get('[data-test-id="food-card"]').each(($card, index) => {
        cy.wrap($card).within(() => {
          cy.get('[data-test-id="food-name"]')
            .should('be.visible')
            .and('contain', mockFoods[index].name);

          cy.get('[data-test-id="food-price"]')
            .should('be.visible')
            .and('contain', `$${mockFoods[index].price.toFixed(2)}`);

          cy.get('[data-test-id="food-rating"]')
            .should('be.visible')
            .and('contain', mockFoods[index].rating);

          cy.get('[data-test-id="food-image"]')
            .should('be.visible')
            .and('have.attr', 'src', mockFoods[index].image);

          cy.get('[data-test-id="restaurant-logo"]')
            .should('be.visible')
            .and('have.attr', 'src');
        });
      });

      // Verify specific food items exist
      cy.contains('Spicy Chicken Burger').should('be.visible');
      cy.contains('Margherita Pizza').should('be.visible');
      cy.contains('Caesar Salad').should('be.visible');

      // Verify prices are correct
      cy.contains('$').should('be.visible');
    });

    it('should handle empty food list gracefully', () => {
      // Mock empty response
      cy.intercept('GET', '**/Food**', {
        statusCode: 200,
        body: []
      }).as('getEmptyFoods');

      cy.visit('/');
      cy.wait('@getEmptyFoods');

      // Verify empty state is displayed
      cy.get('[data-test-id="food-empty-icon"]')
        .should('be.visible');

      cy.get('[data-test-id="food-empty-title"]')
        .should('be.visible')
        .and('contain', 'Menu is Empty');

      cy.get('[data-test-id="food-empty-description"]')
        .should('be.visible')
        .and('contain', 'Your food menu is waiting for some amazing dishes');

      cy.get('[data-test-id="food-add-first-btn"]')
        .should('be.visible')
        .and('contain', 'Add First Meal');

      // Verify no food cards are displayed
      cy.get('[data-test-id="food-card"]').should('not.exist');

      // Verify loading state is not present
      cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');
    });

    it('should display food items immediately when API responds quickly', () => {
      // Mock instant API response
      cy.intercept('GET', '**/Food**', {
        statusCode: 200,
        body: [mockFoods[0]] // Only one food item
      }).as('getFoodsInstant');

      cy.visit('/');
      cy.wait('@getFoodsInstant');

      // Verify loading state never appears or disappears quickly
      cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');

      // Verify food item is displayed
      cy.get('[data-test-id="food-card"]').should('have.length', 1);
      cy.get('[data-test-id="food-name"]')
        .should('contain', 'Spicy Chicken Burger');
    });
  });

  describe('API Error Handling', () => {
    it('should handle 500 Internal Server Error', () => {
      // Mock server error
      cy.intercept('GET', '**/Food**', {
        statusCode: 500,
        body: {
          error: 'Internal Server Error',
          message: 'Something went wrong on our server'
        }
      }).as('getFoodsServerError');

      cy.visit('/');
      cy.wait('@getFoodsServerError');

      // Verify loading state is gone
      cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');

      // Application should show either empty state or error message
      cy.get('body').then(($body) => {
        if ($body.find('[data-test-id="food-empty-title"]').length > 0) {
          // If app shows empty state on error
          cy.get('[data-test-id="food-empty-title"]')
            .should('be.visible')
            .and('contain', 'Menu is Empty');
        } else if ($body.find('[data-test-id="error-message"]').length > 0) {
          // If app has specific error component
          cy.get('[data-test-id="error-message"]')
            .should('be.visible')
            .and('contain', 'error', { matchCase: false });
        } else {
          // Fallback - check for any error text
          cy.contains(/error|failed|unavailable/i).should('be.visible');
        }
      });

      // Verify no food cards are displayed on error
      cy.get('[data-test-id="food-card"]').should('not.exist');
    });

    it('should handle 404 Not Found Error', () => {
      // Mock not found error
      cy.intercept('GET', '**/Food**', {
        statusCode: 404,
        body: {
          error: 'Not Found',
          message: 'The requested resource was not found'
        }
      }).as('getFoodsNotFound');

      cy.visit('/');
      cy.wait('@getFoodsNotFound');

      // Verify loading state is gone
      cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');

      // Application should handle 404 gracefully
      cy.get('body').then(($body) => {
        const hasEmptyState = $body.find('[data-test-id="food-empty-title"]').length > 0;
        const hasError = $body.text().match(/error|not found|404/i);
        
        expect(hasEmptyState || hasError).to.be.true;
      });
    });

    it('should handle network connection timeout', () => {
      // Mock request timeout
      cy.intercept('GET', '**/Food**', {
        statusCode: 408,
        body: { error: 'Request Timeout' },
        delay: 10000 // Longer than Cypress default timeout
      }).as('getFoodsTimeout');

      cy.visit('/');

      // Cypress will timeout waiting for the response
      // Verify app handles timeout (shows error or empty state after timeout)
      cy.get('body', { timeout: 10000 }).then(($body) => {
        const isLoading = $body.find('[data-test-id="food-loading-spinner"]').length > 0;
        const hasContent = $body.find('[data-test-id="food-card"]').length > 0 || 
                          $body.find('[data-test-id="food-empty-title"]').length > 0;
        
        // After timeout, app should either still be loading or show content/error
        expect(isLoading || hasContent).to.be.true;
      });
    });

    it('should handle malformed API response', () => {
      // Mock malformed response (invalid JSON structure)
      cy.intercept('GET', '**/Food**', {
        statusCode: 200,
        body: {
          invalid: 'structure',
          data: null
        } // Not the expected array of foods
      }).as('getFoodsMalformed');

      cy.visit('/');
      cy.wait('@getFoodsMalformed');

      // Verify loading state is gone
      cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');

      // App should handle malformed data gracefully
      cy.get('body').then(($body) => {
        const hasEmptyState = $body.find('[data-test-id="food-empty-title"]').length > 0;
        const hasCards = $body.find('[data-test-id="food-card"]').length > 0;
        
        // App should show either empty state or no cards
        expect(hasEmptyState || !hasCards).to.be.true;
      });
    });
  });

  describe('API Response Timing Scenarios', () => {
    it('should handle very slow API response', () => {
      // Mock very slow response (5 seconds)
      cy.intercept('GET', '**/Food**', {
        statusCode: 200,
        body: [
          {
            id: '1',
            name: 'Slow Cooked Meal',
            price: 19.99,
            rating: 4.8,
            image: 'https://example.com/slow-food.jpg',
            restaurant: {
              name: 'Slow Kitchen',
              logo: 'https://example.com/slow-logo.jpg',
              status: 'Open Now'
            }
          }
        ],
        delay: 5000 // 5 second delay
      }).as('getFoodsSlow');

      cy.visit('/');

      // Verify loading state persists during the delay
      cy.get('[data-test-id="food-loading-spinner"]', { timeout: 10000 })
        .should('be.visible');

      cy.get('[data-test-id="food-loading-text"]')
        .should('be.visible');

      // Wait for the slow response
      cy.wait('@getFoodsSlow');

      // Verify loading disappears and content appears
      cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');
      cy.get('[data-test-id="food-card"]').should('have.length', 1);
      cy.get('[data-test-id="food-name"]').should('contain', 'Slow Cooked Meal');
    });

    it('should handle multiple rapid API calls', () => {
      const rapidFoods = [
        {
          id: '1',
          name: 'Quick Snack',
          price: 5.99,
          rating: 4.0,
          image: 'https://example.com/snack.jpg',
          restaurant: {
            name: 'Fast Foods',
            logo: 'https://example.com/fast-logo.jpg',
            status: 'Open Now'
          }
        }
      ];

      // Mock multiple rapid calls
      cy.intercept('GET', '**/Food**', {
        statusCode: 200,
        body: rapidFoods
      }).as('getFoodsRapid');

      cy.visit('/');

      // Trigger multiple rapid calls (simulate user refreshing or navigating)
      cy.reload();
      cy.wait('@getFoodsRapid');

      cy.reload();
      cy.wait('@getFoodsRapid');

      // Verify app handles rapid calls without crashing
      cy.get('[data-test-id="food-card"]').should('have.length', 1);
      cy.get('[data-test-id="food-name"]').should('contain', 'Quick Snack');

      // Verify no duplicate loading states
      cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');
    });
  });
});