// Select elements
const scrollContainer = document.querySelector('.category-scroll');
const scrollLeftBtn = document.querySelector('.scroll-btn.left');
const scrollRightBtn = document.querySelector('.scroll-btn.right');
const viewAllBtn = document.getElementById('viewAllBtn');

// Scroll behavior for left/right buttons
scrollRightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: 300, // distance to scroll
    behavior: 'smooth'
  });
});

scrollLeftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

// VIEW ALL button toggle
let viewAllActive = false;

viewAllBtn.addEventListener('click', () => {
  const categoryCards = document.querySelectorAll('.category-card');

  if (!viewAllActive) {
    // Show all categories
    scrollContainer.style.flexWrap = 'wrap';
    scrollContainer.style.overflowX = 'visible';
    categoryCards.forEach(card => {
      card.style.flex = '1 1 150px';
    });
    viewAllBtn.textContent = 'VIEW LESS';
  } else {
    // Go back to horizontal scroll
    scrollContainer.style.flexWrap = 'nowrap';
    scrollContainer.style.overflowX = 'auto';
    categoryCards.forEach(card => {
      card.style.flex = '0 0 auto';
    });
    viewAllBtn.textContent = 'VIEW ALL';
  }

  viewAllActive = !viewAllActive;
});
// Make all category sections work independently
document.querySelectorAll('.category-wrapper').forEach((wrapper, index) => {
  const scrollContainer = wrapper.querySelector('.category-scroll');
  const leftBtn = wrapper.querySelector('.scroll-btn.left');
  const rightBtn = wrapper.querySelector('.scroll-btn.right');
  const viewAllBtn = wrapper.nextElementSibling; // the VIEW ALL button after each wrapper
  let viewAllActive = false;

  // Scroll right
  rightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  });

  // Scroll left
  leftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  });

  // VIEW ALL toggle
  if (viewAllBtn && viewAllBtn.classList.contains('view-all')) {
    viewAllBtn.addEventListener('click', () => {
      const cards = scrollContainer.querySelectorAll('.category-card');

      if (!viewAllActive) {
        scrollContainer.style.flexWrap = 'wrap';
        scrollContainer.style.overflowX = 'visible';
        cards.forEach(card => (card.style.flex = '1 1 150px'));
        viewAllBtn.textContent = 'VIEW LESS';
      } else {
        scrollContainer.style.flexWrap = 'nowrap';
        scrollContainer.style.overflowX = 'auto';
        cards.forEach(card => (card.style.flex = '0 0 auto'));
        viewAllBtn.textContent = 'VIEW ALL';
      }

      viewAllActive = !viewAllActive;
    });
  }
});
// ------------------------------
// PRODUCT GRID FUNCTIONALITY
// ------------------------------

// Select elements
const products = document.querySelectorAll('.product');
const seeMoreBtn = document.querySelector('.see-more');

// Simple in-memory cart array
let cart = [];

// Add to Cart button functionality
products.forEach(product => {
  const addBtn = product.querySelector('.add-cart');
  const name = product.querySelector('h4').textContent;
  const priceText = product.querySelector('p').textContent.replace(/[₦,]/g, '');
  const price = parseFloat(priceText);

  addBtn.addEventListener('click', () => {
    const quantity = parseInt(product.querySelector('.quantity').value);

    // Check if product already in cart
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    alert(`${quantity} × ${name} added to cart ✅`);
    console.log(cart); // You can later replace this with a cart popup or checkout feature
  });
});

// SEE MORE button toggle
if (seeMoreBtn) {
  let expanded = false;

  seeMoreBtn.addEventListener('click', () => {
    const allProducts = document.querySelectorAll('.product');
    const hiddenProducts = Array.from(allProducts).slice(6); // show first 6, hide rest

    if (!expanded) {
      hiddenProducts.forEach(p => (p.style.display = 'block'));
      seeMoreBtn.textContent = 'See Less';
    } else {
      hiddenProducts.forEach(p => (p.style.display = 'none'));
      seeMoreBtn.textContent = 'See More';
    }

    expanded = !expanded;
  });

  // Hide extra products by default
  const initialProducts = Array.from(products).slice(6);
  initialProducts.forEach(p => (p.style.display = 'none'));
}


// ------------------------------
// SEARCH BAR FUNCTIONALITY
// ------------------------------
const searchInput = document.querySelector('.search-bar input[type="search"]');
const searchButton = document.querySelector('.search-bar .search-btn');
const allProducts = document.querySelectorAll('.product');

// Function to filter products
function searchProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let found = false;

  allProducts.forEach(product => {
    const name = product.querySelector('h4').textContent.toLowerCase();
    if (name.includes(query)) {
      product.style.display = 'block';
      found = true;
    } else {
      product.style.display = 'none';
    }
  });

  // Show all products again if search box is empty
  if (query === '') {
    allProducts.forEach(product => (product.style.display = 'block'));
  }
}

// Live search (while typing)
searchInput.addEventListener('input', searchProducts);

// Button click (mobile tap)
searchButton.addEventListener('click', searchProducts);

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });

  // Optional: close menu when clicking any link
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
  