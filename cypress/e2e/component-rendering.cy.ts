describe('Food Card Component Rendering', () => {
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
      name: 'Margherita Pizza with Extra Cheese and Fresh Basil Toppings',
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

  beforeEach(() => {
    // Mock API response with multiple food items
    cy.intercept('GET', '**/Food**', {
      statusCode: 200,
      body: mockFoods
    }).as('getFoods');

    cy.visit('/');
    cy.wait('@getFoods');
  });


  it('should handle different rating values correctly', () => {
    // Test various rating scenarios across different cards
    cy.get('[data-test-id="food-rating"]').then(($ratings) => {
      // First card: 4.7
      expect($ratings.eq(0)).to.contain('4.7');
      
      // Second card: 4.3
      expect($ratings.eq(1)).to.contain('4.3');
      
      // Third card: 4.1
      expect($ratings.eq(2)).to.contain('4.1');
    });

    // Verify all ratings have the star icon
    cy.get('[data-test-id="food-card"]').each(($card) => {
      cy.wrap($card).within(() => {
        cy.get('[data-test-id="food-rating"]')
          .parent()
          .within(() => {
            cy.get('svg')
              .should('exist')
              .and('be.visible');
          });
      });
    });
  });

  it('should handle long food names with truncation', () => {
    // Test the second card with long name
    cy.get('[data-test-id="food-card"]').eq(1).within(() => {
      cy.get('[data-test-id="food-name"]')
        .should('have.class', 'truncate')
        .and('have.css', 'overflow', 'hidden')
        .and('have.css', 'text-overflow', 'ellipsis')
        .and('have.css', 'white-space', 'nowrap');

      // Verify the full name is available in title attribute
      cy.get('[data-test-id="food-name"]')
        .should('have.attr', 'title', 'Margherita Pizza with Extra Cheese and Fresh Basil Toppings');
    });
  });


  it('should maintain consistent card layout and styling', () => {
    cy.get('[data-test-id="food-card"]').each(($card) => {
      cy.wrap($card)
        .should('have.class', 'rounded-2xl')
        .and('have.class', 'overflow-hidden')
        .and('have.class', 'relative')
        .and('have.css', 'box-shadow'); // shadow

      // Verify card has image section
      cy.wrap($card)
        .find('[data-test-id="food-image"]')
        .should('exist')
        .and('be.visible');

      // Verify card has content section
      cy.wrap($card)
        .find('.food-card-content')
        .should('exist')
        .and('be.visible');
    });

    // Verify consistent image dimensions
    cy.get('[data-test-id="food-image"]').each(($img) => {
      cy.wrap($img)
        .should('have.css', 'height', '192px') // h-48
        .and('have.class', 'w-full')
        .and('have.class', 'object-cover');
    });
  });

  it('should handle missing or incomplete data gracefully', () => {
    const incompleteFoods = [
      {
        id: '4',
        name: '',
        price: 0,
        rating: 0,
        image: '',
        restaurant: {
          name: '',
          logo: '',
          status: 'Closed'
        }
      }
    ];

    // Mock API with incomplete data
    cy.intercept('GET', '**/Food**', {
      statusCode: 200,
      body: incompleteFoods
    }).as('getIncompleteFoods');

    cy.reload();
    cy.wait('@getIncompleteFoods');

    cy.get('[data-test-id="food-card"]').within(() => {
      // Should show fallback values for missing data
      cy.get('[data-test-id="food-name"]')
        .should('contain', 'Unknown Food');

      cy.get('[data-test-id="food-price"]')
        .should('contain', '$0.00');

      cy.get('[data-test-id="food-rating"]')
        .should('contain', '0.0');

      cy.get('[data-test-id="restaurant-status"]')
        .should('contain', 'Closed');

      // Should handle missing images with fallback
      cy.get('[data-test-id="food-image"]')
        .should('have.attr', 'src')
        .and('include', '/placeholder-food.jpg');

      cy.get('[data-test-id="restaurant-logo"]')
        .should('have.attr', 'src')
        .and('include', '/placeholder-restaurant.jpg');
    });
  });

  it('should display loading skeleton before data loads', () => {
    // Mock delayed response to see loading state
    cy.intercept('GET', '**/Food**', {
      statusCode: 200,
      body: mockFoods,
      delay: 2000
    }).as('getFoodsDelayed');

    cy.visit('/');

    // Verify loading state is shown
    cy.get('[data-test-id="food-loading-spinner"]')
      .should('be.visible')
      .and('have.class', 'animate-spin');

    cy.get('[data-test-id="food-loading-text"]')
      .should('be.visible')
      .and('contain', 'Preparing your delicious meals');

    // Wait for data to load
    cy.wait('@getFoodsDelayed');

    // Verify loading state is replaced with actual content
    cy.get('[data-test-id="food-loading-spinner"]').should('not.exist');
    cy.get('[data-test-id="food-card"]').should('have.length', 3);
  });
});