// Load products and settings when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadShopSettings();
    loadProducts();
    
    // Show welcome popup
    document.getElementById('welcomePopup').style.display = 'flex';
});

function closePopup() {
    document.getElementById('welcomePopup').style.display = 'none';
}

function redirectToTelegram() {
    window.open('https://t.me/your_telegram_username', '_blank');
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function loadShopSettings() {
    fetch('data/settings.json')
        .then(response => response.json())
        .then(settings => {
            document.getElementById('shopTitle').textContent = settings.shopName;
            document.getElementById('shopSubtitle').textContent = settings.shopSubtitle;
            document.getElementById('footerShopName').textContent = settings.shopName;
            document.getElementById('shopDescription').textContent = settings.shopDescription;
            document.getElementById('popupTitle').textContent = settings.popupTitle;
            document.getElementById('popupMessage').textContent = settings.popupMessage;
        })
        .catch(error => console.error('Error loading settings:', error));
}

function loadProducts() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('productsContainer');
            container.innerHTML = '';
            
            products.forEach(product => {
                if (product.status === 'in-stock') { // Only show in-stock products
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    
                    let priceHTML = `<div class="product-price">${product.price} Robux</div>`;
                    if (product.onSale === 'yes') {
                        priceHTML = `<div class="product-price"><span style="text-decoration: line-through; opacity: 0.6;">${product.price} Robux</span> ${product.salePrice || product.price} Robux (SALE!)</div>`;
                    }
                    
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x200?text=Product+Image'">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        ${priceHTML}
                        <button class="buy-now" onclick="redirectToTelegram()">Buy Now</button>
                    `;
                    
                    container.appendChild(productCard);
                }
            });
        })
        .catch(error => console.error('Error loading products:', error));
}
