let cart = [];
        let allProducts = {
            'Snacks': [
                { name: 'kurkure', price: 20, image: 'assets/kurkure.jpg' },
                { name: 'Cookies', price: 50, image: 'assets/cookies.jpg' }
            ],
            'Electronics': [
                { name: 'Smartphone', price: 15000, image: 'assets/smartphone.jpg' },
                { name: 'Headphones', price: 2000, image: 'assets/headphones.jpg' }
            ],
            'Soft Drinks': [
                { name: 'Cola', price: 30, image: 'assets/cola.jpg' },
                { name: 'Juice', price: 25, image: 'assets/juice.jpg' }
            ],
            'Accessories': [
                { name: 'Watch', price: 500, image: 'assets/watch.jpg' },
                { name: 'Bag', price: 700, image: 'assets/bag.jpg' }
            ]
        };

        function showProducts(category) {
            const products = allProducts[category];
            displayProducts(products);
        }

        function displayProducts(products) {
            const productDisplay = document.getElementById('productDisplay');
            productDisplay.innerHTML = '';

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: ₹${product.price}</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                `;
                productDisplay.appendChild(productCard);
            });
        }

        function searchProducts() {
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            const filteredProducts = [];

            for (const category in allProducts) {
                allProducts[category].forEach(product => {
                    if (product.name.toLowerCase().includes(searchQuery)) {
                        filteredProducts.push(product);
                    }
                });
            }

            displayProducts(filteredProducts);
        }

        function addToCart(name, price) {
            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const totalPriceEl = document.getElementById('totalPrice');
            const cartCount = document.getElementById('cartCount');

            cartItems.innerHTML = '';
            let totalPrice = 0;

            cart.forEach(item => {
                totalPrice += item.price * item.quantity;
                cartItems.innerHTML += `
                    <li>
                        <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
                        <button onclick="buyItem('${item.name}')">Buy</button>
                    </li>`;
            });

            totalPriceEl.textContent = totalPrice.toFixed(2);
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }

        function buyItem(name) {
            alert(`You have purchased ${name}!`);
            cart = cart.filter(item => item.name !== name);
            updateCart();
        }

        function buyWholeCart() {
            alert('You have purchased the entire cart!');
            cart = [];
            updateCart();
        }

        function toggleCart() {
            const cartContainer = document.getElementById('cartContainer');
            cartContainer.style.display = cartContainer.style.display === 'none' || cartContainer.style.display === '' ? 'block' : 'none';
        }

        function openSellForm() {
            const sellFormContainer = document.getElementById('sellFormContainer');
            sellFormContainer.style.display = 'block';
        }

        function closeSellForm() {
            const sellFormContainer = document.getElementById('sellFormContainer');
            sellFormContainer.style.display = 'none';
        }

        function addProduct() {
            const productName = document.getElementById('productName').value;
            const productPrice = parseFloat(document.getElementById('productPrice').value);
            const productCategory = document.getElementById('productCategory').value;
            const productImage = document.getElementById('productImage').value;

            if (productName && productPrice && productCategory && productImage) {
                const newProduct = { name: productName, price: productPrice, image: productImage };
                allProducts[productCategory].push(newProduct);
                displayProducts(allProducts[productCategory]);
                closeSellForm();
                alert('Product added successfully!');
            } else {
                alert('Please fill out all fields.');
            }
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const totalPriceEl = document.getElementById('totalPrice');
            const cartCount = document.getElementById('cartCount');
        
            cartItems.innerHTML = '';
            let totalPrice = 0;
        
            cart.forEach((item, index) => {
                totalPrice += item.price * item.quantity;
                cartItems.innerHTML += `
                    <li>
                        <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
                        <button onclick="buyItem('${item.name}')">Buy</button>
                        <button onclick="decreaseQuantity(${index})">➖</button>
                        <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
                    </li>`;
            });
        
            totalPriceEl.textContent = totalPrice.toFixed(2);
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
        
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }
        
        function decreaseQuantity(index) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        }
        
        
        
        

        
        displayProducts([].concat(...Object.values(allProducts)));