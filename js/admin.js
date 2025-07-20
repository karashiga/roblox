// Show selected section and hide others
function showSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Load all data when admin panel opens
document.addEventListener('DOMContentLoaded', function() {
    loadShopSettings();
    loadAllProducts();
});

// Shop Settings Functions
function loadShopSettings() {
    fetch('../data/settings.json')
        .then(response => response.json())
        .then(settings => {
            document.getElementById('shop-name').value = settings.shopName;
            document.getElementById('shop-subtitle').value = settings.shopSubtitle;
            document.getElementById('shop-description').value = settings.shopDescription;
            document.getElementById('popup-title').value = settings.popupTitle;
            document.getElementById('popup-message').value = settings.popupMessage;
        })
        .catch(error => console.error('Error loading settings:', error));
}

function saveShopSettings() {
    const settings = {
        shopName: document.getElementById('shop-name').value,
        shopSubtitle: document.getElementById('shop-subtitle').value,
        shopDescription: document.getElementById('shop-description').value,
        popupTitle: document.getElementById('popup-title').value,
        popupMessage: document.getElementById('popup-message').value
    };

    // In a real app, you would send this to a server
    // For this demo, we'll just log it
    console.log('Saving settings:', settings);
    alert('Settings saved successfully! (In a real app, this would save to your database)');
    
    // For demo purposes, we'll update the local JSON
    localStorage.setItem('shopSettings', JSON.stringify(settings));
}

// Product Management Functions
function loadAllProducts() {
    fetch('../data/products.json')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('productsList');
            container.innerHTML = '';
            
            products.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                let statusClass = '';
                if (product.status === 'in-stock') statusClass = 'in-stock';
                if (product.status === 'out-of-stock') statusClass = 'out-of-stock';
                if (product.onSale === 'yes') statusClass += ' on-sale';
                
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <span class="status ${statusClass}">
                        ${product.status === 'in-stock' ? 'In Stock' : 'Out of Stock'} 
                        ${product.onSale === 'yes' ? '| On Sale' : ''}
                    </span>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> ${product.price} Robux</p>
                    <div class="product-actions">
                        <button class="btn" onclick="editProduct(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
                    </div>
                `;
                
                container.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

function addProduct() {
    const newProduct = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: document.getElementById('product-price').value,
        image: document.getElementById('product-image').value,
        status: document.getElementById('product-status').value,
        onSale: document.getElementById('product-sale').value
    };

    // In a real app, you would send this to a server
    console.log('Adding product:', newProduct);
    alert('Product added successfully! (In a real app, this would save to your database)');
    
    // For demo purposes, we'll update the local JSON
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Clear form
    document.getElementById('product-name').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-image').value = '';
    
    // Reload products
    loadAllProducts();
}

function editProduct(index) {
    // In a real app, you would implement this
    alert('Edit product with index: ' + index);
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        // In a real app, you would send this to a server
        console.log('Deleting product with index:', index);
        alert('Product deleted successfully! (In a real app, this would update your database)');
        
        // For demo purposes, we'll update the local JSON
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        
        // Reload products
        loadAllProducts();
    }
}
