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

  it('should render all food cards with correct information', () => {
    // Verify correct number of food cards are rendered
    cy.get('[data-test-id="food-card"]').should('have.length', 3);

    // Test first food card (Spicy Chicken Burger)
    cy.get('[data-test-id="food-card"]').first().within(() => {
      // Verify food name
      cy.get('[data-test-id="food-name"]')
        .should('be.visible')
        .and('contain', 'Spicy Chicken Burger')
        .and('have.css', 'font-weight', '600') // font-semibold
        .and('have.css', 'color', 'rgb(17, 24, 39)'); // text-gray-900

      // Verify price
      cy.get('[data-test-id="food-price"]')
        .should('be.visible')
        .and('contain', '$14.99')
        .and('have.css', 'font-weight', '700'); // font-bold

      // Verify rating
      cy.get('[data-test-id="food-rating"]')
        .should('be.visible')
        .and('contain', '4.7')
        .and('have.css', 'color', 'rgb(245, 158, 11)'); // text-[#FFB30E]

      // Verify restaurant status
      cy.get('[data-test-id="restaurant-status"]')
        .should('be.visible')
        .and('contain', 'Open Now')
        .and('have.css', 'background-color', 'rgb(220, 252, 231)') // bg-green-100
        .and('have.css', 'color', 'rgb(22, 101, 52)'); // text-green-800

      // Verify food image
      cy.get('[data-test-id="food-image"]')
        .should('be.visible')
        .and('have.attr', 'src', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400')
        .and('have.attr', 'alt', 'Spicy Chicken Burger')
        .and('have.class', 'object-cover')
        .and('have.class', 'rounded-2xl');

      // Verify restaurant logo
      cy.get('[data-test-id="restaurant-logo"]')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('have.class', 'rounded-lg');

      // Verify interactive elements
      cy.get('[data-test-id="food-more-btn"]')
        .should('be.visible')
        .and('have.css', 'background-color', 'rgba(255, 255, 255, 0.9)'); // bg-white bg-opacity-90
    });

    // Test second food card (Margherita Pizza)
    cy.get('[data-test-id="food-card"]').eq(1).within(() => {
      cy.get('[data-test-id="food-name"]')
        .should('contain', 'Margherita Pizza with Extra Cheese and Fresh Basil Toppings')
        .and('have.class', 'truncate'); // Verify long names are truncated

      cy.get('[data-test-id="food-price"]')
        .should('contain', '$16.99');

      cy.get('[data-test-id="food-rating"]')
        .should('contain', '4.3');

      cy.get('[data-test-id="restaurant-status"]')
        .should('contain', 'Closed')
        .and('have.css', 'background-color', 'rgb(254, 226, 226)') // bg-red-100
        .and('have.css', 'color', 'rgb(153, 27, 27)'); // text-red-800
    });

    // Test third food card (Caesar Salad)
    cy.get('[data-test-id="food-card"]').last().within(() => {
      cy.get('[data-test-id="food-name"]')
        .should('contain', 'Caesar Salad');

      cy.get('[data-test-id="food-price"]')
        .should('contain', '$10.99');

      cy.get('[data-test-id="food-rating"]')
        .should('contain', '4.1');

      cy.get('[data-test-id="restaurant-status"]')
        .should('contain', 'Open Now');
    });
  });

  it('should display price tags with correct styling and icon', () => {
    cy.get('[data-test-id="food-card"]').first().within(() => {
      // Verify price tag container styling
      cy.get('[data-test-id="food-price"]')
        .parent()
        .should('have.class', 'food-price-tag')
        .and('have.css', 'background-color', 'rgb(249, 115, 22)') // bg-orange-500
        .and('have.css', 'color', 'rgb(255, 255, 255)') // text-white
        .and('have.css', 'border-radius', '6px') // rounded-md
        .and('have.css', 'box-shadow'); // shadow-lg

      // Verify price tag has icon and price
      cy.get('[data-test-id="food-price"]')
        .parent()
        .within(() => {
          // Check if SVG icon is present
          cy.get('svg')
            .should('exist')
            .and('be.visible');
          
          cy.get('[data-test-id="food-price"]')
            .should('contain', '$14.99');
        });
    });
  });

  it('should display restaurant information correctly', () => {
    cy.get('[data-test-id="food-card"]').first().within(() => {
      // Verify restaurant logo
      cy.get('[data-test-id="restaurant-logo"]')
        .should('be.visible')
        .and('have.css', 'width', '40px')
        .and('have.css', 'height', '40px')
        .and('have.css', 'border-width', '2px')
        .and('have.css', 'border-color', 'rgb(229, 231, 235)'); // border-gray-200

      // Verify restaurant name is used as alt text for logo
      cy.get('[data-test-id="restaurant-logo"]')
        .should('have.attr', 'alt', 'Burger Kingdom');
    });
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

  it('should display status badges with correct colors', () => {
    // Count open and closed restaurants
    cy.get('[data-test-id="restaurant-status"]').then(($statuses) => {
      const openCount = $statuses.filter((_, el) => el.textContent === 'Open Now').length;
      const closedCount = $statuses.filter((_, el) => el.textContent === 'Closed').length;

      expect(openCount).to.equal(2); // First and third cards
      expect(closedCount).to.equal(1); // Second card
    });

    // Verify open status styling
    cy.contains('[data-test-id="restaurant-status"]', 'Open Now')
      .should('have.css', 'background-color', 'rgb(220, 252, 231)') // bg-green-100
      .and('have.css', 'color', 'rgb(22, 101, 52)'); // text-green-800

    // Verify closed status styling
    cy.contains('[data-test-id="restaurant-status"]', 'Closed')
      .should('have.css', 'background-color', 'rgb(254, 226, 226)') // bg-red-100
      .and('have.css', 'color', 'rgb(153, 27, 27)'); // text-red-800

    // Verify status badge styling
    cy.get('[data-test-id="restaurant-status"]').first()
      .should('have.class', 'px-4')
      .and('have.class', 'py-2')
      .and('have.class', 'rounded-full')
      .and('have.class', 'text-xs')
      .and('have.class', 'font-semibold');
  });

  it('should render all interactive elements correctly', () => {
    cy.get('[data-test-id="food-card"]').first().within(() => {
      // Verify more button is present and styled
      cy.get('[data-test-id="food-more-btn"]')
        .should('be.visible')
        .and('have.css', 'width', '32px')
        .and('have.css', 'height', '32px')
        .and('have.css', 'border-radius', '9999px') // rounded-full
        .and('have.css', 'backdrop-filter') // backdrop-blur-sm
        .and('have.css', 'box-shadow'); // shadow-lg

      // Verify more button icon
      cy.get('[data-test-id="food-more-btn"]')
        .within(() => {
          cy.get('svg')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'stroke', 'currentColor');
        });
    });

    // Verify all cards have more buttons
    cy.get('[data-test-id="food-more-btn"]').should('have.length', 3);
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