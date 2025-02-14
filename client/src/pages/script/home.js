let cart = [];
        let allProducts = [];

        function showProducts(category) {
            const products = {
                "Snacks": [
                    { name: "kurkure", price: 50, image: "assets/kurkure.jpg", seller: "Raj Snacks", contact: "9876543210" },
                    { name: "Cookies", price: 80, image: "cookies.jpg", seller: "Amit Bakery", contact: "9123456789" }
                ],
                "Electronics": [
                    { name: "Smartphone", price: 50000, image: "smartphone.jpg", seller: "TechStore", contact: "9988776655" }
                ],
                "Soft Drinks": [
                    { name: "Coke", price: 40, image: "coke.jpg", seller: "ColdBev", contact: "9876543210" }
                ],
                "Accessories": [
                    { name: "Headphones", price: 2000, image: "headphones.jpg", seller: "GadgetWorld", contact: "8866445577" }
                ]
            };
            allProducts = products[category];
            renderProducts(allProducts);
        }

        function renderProducts(products) {
            document.getElementById("productDisplay").innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: ₹${product.price}</p>
                    <p>Seller: ${product.seller}</p>
                    <p>Contact: ${product.contact}</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </div>
            `).join("");
        }

        function addToCart(name, price) {
            cart.push({ name, price });
            updateCart();
            toggleCart();
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        function updateCart() {
            document.getElementById("cartCount").innerText = cart.length;
            document.getElementById("cartItems").innerHTML = cart.map((item, i) => `
                <li>${item.name} - ₹${item.price} <button onclick="removeFromCart(${i})">❌</button></li>
            `).join("");
            document.getElementById("totalPrice").innerText = cart.reduce((sum, item) => sum + item.price, 0);
        }

        function toggleCart() {
            let cartBox = document.getElementById("cartContainer");
            cartBox.style.display = (cartBox.style.display === "block") ? "none" : "block";
            updateCart();
        }