// Products Data
const products = [
  {
      id: 1,
      name: "Modern Leather Sofa",
      description: "Premium top-grain leather with comfortable cushioning",
      price: 2499.99,
      category: "living",
      featured: true,
      material: "Top-grain leather, hardwood frame",
      dimensions: "84'' W x 36'' D x 30'' H",
      images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
  },
  {
      id: 2,
      name: "Minimalist Coffee Table",
      description: "Sleek design with tempered glass top and wooden legs",
      price: 599.99,
      category: "living",
      featured: true,
      material: "Tempered glass, oak wood",
      dimensions: "48'' W x 24'' D x 18'' H",
      images: [
          "https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
  },
  {
      id: 3,
      name: "King Size Bed Frame",
      description: "Elegant upholstered bed with comfortable headboard",
      price: 1899.99,
      category: "bedroom",
      featured: true,
      material: "Fabric upholstery, solid wood frame",
      dimensions: "84'' W x 78'' D x 48'' H",
      images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
  },
  {
      id: 4,
      name: "Executive Office Chair",
      description: "Ergonomic design with lumbar support and adjustable height",
      price: 499.99,
      category: "office",
      featured: true,
      material: "Mesh back, leather seat, aluminum base",
      dimensions: "26'' W x 27'' D x 45'' H",
      images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598301257982-0cf01499abb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1593371250007-2c8d8a5a6c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
  },
  {
      id: 5,
      name: "Outdoor Dining Set",
      description: "Weather-resistant dining set for 6 people",
      price: 1599.99,
      category: "outdoor",
      featured: true,
      material: "Powder-coated aluminum, tempered glass",
      dimensions: "Table: 72'' L x 36'' W x 30'' H",
      images: [
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
  },
  {
      id: 6,
      name: "Bookshelf with Cabinet",
      description: "Modern storage solution with open shelves and closed cabinet",
      price: 899.99,
      category: "living",
      featured: false,
      material: "Engineered wood, metal frame",
      dimensions: "60'' W x 14'' D x 72'' H",
      images: [
          "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
  },
  // Add more products to reach 20-30 items
];

// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1000);
  }
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger) {
      hamburger.addEventListener('click', function() {
          hamburger.classList.toggle('active');
          navMenu.classList.toggle('active');
      });
  }
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
  }));
  
  // Mobile dropdown toggle
  document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
              e.preventDefault();
              const dropdown = this.parentElement;
              dropdown.classList.toggle('active');
          }
      });
  });
  
  // Load featured products on homepage
  if (document.getElementById('featured-products')) {
      loadFeaturedProducts();
  }
  
  // Load all products on products page
  if (document.getElementById('all-products')) {
      handleProductsPageLoad();
      setupFiltering();
      setupSearch();
  }
  
  // Setup search on all pages
  setupSearch();
  
  // Load product details if on product details page
  if (document.getElementById('product-details-container')) {
      loadProductDetails();
  }
  
  // Initialize audio controls
  initializeAudioControls();
  
  // Initialize page-specific functionality
  initializePage();
});

// Audio Controls
function initializeAudioControls() {
  const audioControl = document.getElementById('audio-control');
  const bgMusic = document.getElementById('bg-music');
  
  if (audioControl && bgMusic) {
      let isPlaying = false;
      
      audioControl.addEventListener('click', function() {
          if (isPlaying) {
              bgMusic.pause();
              this.innerHTML = '<i class="fas fa-music"></i>';
              this.title = 'Play Music';
          } else {
              bgMusic.play().catch(e => console.log('Audio play failed:', e));
              this.innerHTML = '<i class="fas fa-pause"></i>';
              this.title = 'Pause Music';
          }
          isPlaying = !isPlaying;
      });
  }
}

// Load Featured Products
function loadFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
  const featuredProducts = products.filter(product => product.featured);
  
  featuredProducts.forEach(product => {
      const productCard = createProductCard(product);
      featuredContainer.appendChild(productCard);
  });
}

// Handle Products Page Load
function handleProductsPageLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('search');
  const category = urlParams.get('category');
  
  let productsToShow = products;
  
  // Apply search filter if search term exists
  if (searchTerm) {
      const desktopInput = document.getElementById('search-input');
      const mobileInput = document.getElementById('mobile-search-input');
      if (desktopInput) desktopInput.value = searchTerm;
      if (mobileInput) mobileInput.value = searchTerm;
      
      productsToShow = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
  
  // Apply category filter if category exists
  if (category && !searchTerm) {
      productsToShow = products.filter(product => product.category === category);
      // Activate the corresponding filter button
      const filterBtn = document.querySelector(`[data-filter="${category}"]`);
      if (filterBtn) {
          document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          filterBtn.classList.add('active');
      }
  }
  
  loadAllProducts(productsToShow);
}

// Load All Products
function loadAllProducts(filteredProducts = null) {
  const productsContainer = document.getElementById('all-products');
  if (!productsContainer) return;
  
  productsContainer.innerHTML = '';
  
  const productsToShow = filteredProducts || products;
  
  if (productsToShow.length === 0) {
      productsContainer.innerHTML = '<div class="no-products"><h3>No products found</h3><p>Try adjusting your search or filter criteria.</p></div>';
      return;
  }
  
  productsToShow.forEach(product => {
      const productCard = createProductCard(product);
      productsContainer.appendChild(productCard);
  });
}

// Create Product Card HTML
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
      <div class="product-img">
          <a href="product-details.html?id=${product.id}">
              <img src="${product.images[0]}" alt="${product.name}">
          </a>
      </div>
      <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <a href="product-details.html?id=${product.id}" class="view-details">View Details</a>
      </div>
  `;
  return card;
}

// Setup Filtering
function setupFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          
          // Filter products
          let filteredProducts;
          if (filterValue === 'all') {
              filteredProducts = products;
          } else {
              filteredProducts = products.filter(product => product.category === filterValue);
          }
          
          // Apply sorting if any
          const sortSelect = document.getElementById('sort-select');
          if (sortSelect) {
              const sortValue = sortSelect.value;
              filteredProducts = sortProducts(filteredProducts, sortValue);
          }
          
          // Load filtered products
          loadAllProducts(filteredProducts);
      });
  });
}

// Setup Search
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-btn');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileSearchButton = document.getElementById('mobile-search-btn');
  
  // Desktop search
  if (searchInput && searchButton) {
      searchButton.addEventListener('click', () => performSearch('search-input'));
      searchInput.addEventListener('keyup', function(event) {
          if (event.key === 'Enter') {
              performSearch('search-input');
          }
      });
  }
  
  // Mobile search
  if (mobileSearchInput && mobileSearchButton) {
      mobileSearchButton.addEventListener('click', () => performSearch('mobile-search-input'));
      mobileSearchInput.addEventListener('keyup', function(event) {
          if (event.key === 'Enter') {
              performSearch('mobile-search-input');
          }
      });
  }
}

// Perform Search
function performSearch(inputId = 'search-input') {
  const searchInput = document.getElementById(inputId);
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (searchTerm === '') {
      if (document.getElementById('all-products')) {
          loadAllProducts(products);
      }
      return;
  }
  
  // Close mobile menu if search was performed from mobile
  if (inputId === 'mobile-search-input') {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      if (hamburger && navMenu) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
      }
  }
  
  // If on products page, filter and display results
  if (document.getElementById('all-products')) {
      const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
      loadAllProducts(filteredProducts);
  } else {
      // If on other pages, redirect to products page with search term
      window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
  }
}

// Sort Products
function sortProducts(productsArray, sortValue) {
  switch(sortValue) {
      case 'price-low':
          return [...productsArray].sort((a, b) => a.price - b.price);
      case 'price-high':
          return [...productsArray].sort((a, b) => b.price - a.price);
      case 'name-asc':
          return [...productsArray].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
          return [...productsArray].sort((a, b) => b.name.localeCompare(a.name));
      default:
          return productsArray;
  }
}

// Load Product Details
function loadProductDetails() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  // Find product
  const product = products.find(p => p.id === productId);
  
  if (!product) {
      document.getElementById('product-details-container').innerHTML = `
          <div class="error-message">
              <h2>Product not found</h2>
              <p>The product you're looking for doesn't exist.</p>
              <a href="products.html" class="back-button">Back to Products</a>
          </div>
      `;
      return;
  }
  
  // Populate product details
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('product-description').textContent = product.description;
  
  // Populate specifications
  document.getElementById('product-material').textContent = product.material;
  document.getElementById('product-dimensions').textContent = product.dimensions;
  
  // Create main image
  const mainImageContainer = document.getElementById('main-image');
  mainImageContainer.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
  `;
  
  // Create thumbnails
  const thumbnailsContainer = document.getElementById('thumbnails');
  thumbnailsContainer.innerHTML = '';
  
  product.images.forEach((image, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      thumbnail.innerHTML = `<img src="${image}" alt="${product.name} - View ${index + 1}">`;
      thumbnail.addEventListener('click', () => {
          mainImageContainer.innerHTML = `<img src="${image}" alt="${product.name}">`;
      });
      thumbnailsContainer.appendChild(thumbnail);
  });
}

// Newsletter subscription
function subscribeNewsletter(email) {
  // Simulate newsletter subscription
  console.log('Newsletter subscription for:', email);
  alert('Thank you for subscribing to our newsletter!');
}

// Contact form submission
function submitContactForm(formData) {
  // Simulate form submission
  console.log('Contact form submitted:', formData);
  alert('Thank you for your message! We will get back to you soon.');
}

// Initialize page-specific functionality
function initializePage() {
  // Newsletter forms
  document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = this.querySelector('input[type="email"]').value;
          if (email) {
              subscribeNewsletter(email);
              this.reset();
          }
      });
  });
  
  // Contact forms
  document.querySelectorAll('.contact-form').forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          const formData = new FormData(this);
          submitContactForm(Object.fromEntries(formData));
          this.reset();
      });
  });
}

// Call initialize function when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);