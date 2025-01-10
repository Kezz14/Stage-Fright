console.log("Script loaded");

    // Initialize map with default coordinates
    const map = L.map('tourMap').setView([51.5074, -0.1278], 2); // Default to London

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Locations data with city names, coordinates, and event details
    const locations = {
        "New York, USA": { coords: [40.7128, -74.0060], date: "January 15, 2024", time: "7:00 PM", address: "123 Broadway St, New York, NY 10001", price: 50 },
        "Los Angeles, USA": { coords: [34.0522, -118.2437], date: "January 22, 2024", time: "8:00 PM", address: "456 Sunset Blvd, Los Angeles, CA 90028", price: 60 },
        "London, UK": { coords: [51.5074, -0.1278], date: "February 15, 2024", time: "6:00 PM", address: "789 Oxford St, London, UK", price: 40 },
        "Sydney, Australia": { coords: [-33.8688, 151.2093], date: "February 20, 2024", time: "7:30 PM", address: "321 George St, Sydney, NSW 2000", price: 50 },
        "Toronto, Canada": { coords: [43.6532, -79.3832], date: "March 1, 2024", time: "7:00 PM", address: "456 Queen St, Toronto, ON M5V 2B6", price: 55 },
        "Berlin, Germany": { coords: [52.5200, 13.4050], date: "March 5, 2024", time: "8:00 PM", address: "789 Alexanderplatz, Berlin, Germany", price: 60 },
        "Paris, France": { coords: [48.8566, 2.3522], date: "March 10, 2024", time: "6:00 PM", address: "123 Champs-Elysées, Paris, France", price: 45 }
    };

    // Function to update map markers and show event details based on selected country
    function updateMapAndList() {
        const selectedCountry = document.getElementById('countryDropdown').value;

        if (!selectedCountry) return;

        // Remove all existing markers from the map
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Clear previous show list
        document.getElementById('showList').innerHTML = '';

        // Filter and display locations based on selected country
        Object.keys(locations).forEach(city => {
            if (city.includes(selectedCountry)) {
                const location = locations[city];

                // Add marker for the selected location
                L.marker(location.coords).addTo(map)
                    .bindPopup(`${city}<br>${location.date}<br>${location.time}`);

                // Add event info to the show list
                const showItemHTML = `
                    <div class="show-item">
                        <h3>${city}</h3>
                        <p>Date: ${location.date}</p>
                        <p>Time: ${location.time}</p>
                        <p>Address: ${location.address}</p>
                         <p>Price: $${location.price}</p>
                        <button onclick="addToCart('${city}', '${location.price}')">Buy Tickets</button>
                    </div>
                `;
                document.getElementById('showList').innerHTML += showItemHTML;
            }
        });
    }

    // Event listener for dropdown change
    document.getElementById('countryDropdown').addEventListener('change', updateMapAndList);

// Initialize cart from localStorage if available
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

// Update cart display when the page loads
updateCartDisplay();

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar.style.transform === 'translateX(0%)') {
        cartSidebar.style.transform = 'translateX(100%)';
    } else {
        cartSidebar.style.transform = 'translateX(0%)';
    }
}

// Add item to cart
function addToCart(itemName, price) {
    const numericPrice = parseFloat(price); // Convert the price string to a number
    cart.push({ itemName, price: numericPrice });
    cartCount = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    updateCartDisplay();
    alert(`Added ${itemName} for $${numericPrice.toFixed(2)} to your cart!`);
}


// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the given index
    cartCount = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartDisplay(); // Update display after removing item
}

// Update cart display (cart count and cart items)
function updateCartDisplay() {
    const cartCountElement = document.getElementById('cartCount');
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    // Update cart count
    cartCountElement.innerText = cartCount;

    // Clear current cart items display
    cartItemsElement.innerHTML = '';

    let total = 0;

    // Add items to cart display
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `${item.itemName} - $${item.price} 
                             <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsElement.appendChild(itemDiv);
        total += item.price; // Sum the prices of all items in the cart
    });

    // Update total
    cartTotalElement.innerText = total.toFixed(2); // Ensure total is formatted as a decimal
}

const checkoutCart = JSON.parse(localStorage.getItem('cart')) || [];

// Populate cart details on the checkout page
function populateCheckoutCart() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.getElementById('cartCount');
    
    cartItemsElement.innerHTML = ''; // Clear current items
    let total = 0;

    checkoutCart.forEach((item, index) => {
        const itemDiv = document.createElement('p');
        itemDiv.innerHTML = `${item.itemName} <span class="price">$${item.price.toFixed(2)}</span>`;
        cartItemsElement.appendChild(itemDiv);
        total += item.price;
    });

    // Update total and count
    cartTotalElement.innerText = `$${total.toFixed(2)}`;
    cartCountElement.innerText = checkoutCart.length;
}

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully! Thank you for shopping.');
    localStorage.removeItem('cart'); // Clear the cart
    window.location.href = 'index.html'; // Redirect to home or confirmation page
});

// Initialize
populateCheckoutCart();


// FAQ
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".faq .accordion button");
  
    buttons.forEach(button => {
      button.addEventListener("click", function () {
        // Toggle the expanded state of the button
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", !isExpanded);
  
        // Get the associated content and toggle its visibility
        const content = button.nextElementSibling;
        if (content) {
          content.style.maxHeight = isExpanded ? "0" : content.scrollHeight + "px";
          content.style.opacity = isExpanded ? "0" : "1";
        }
      });
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const sideContactCard = document.getElementById("side-contact-card");

    // Show side contact card after a delay
    setTimeout(() => {
        sideContactCard.style.display = "block";
    }, 3000); // 3 seconds delay
});
const sideCard = document.getElementById('side-contact-card');
        const toggleButton = document.createElement('button');

        toggleButton.textContent = 'Contact Us';
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '20px';
        toggleButton.style.right = '20px';
        toggleButton.style.background = '#ff6a3d';
        toggleButton.style.color = '#fff';
        toggleButton.style.padding = '10px 20px';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '4px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';

        document.body.appendChild(toggleButton);

        toggleButton.addEventListener('click', () => {
            sideCard.classList.toggle('hidden');
        });

        document.getElementById('close-card').addEventListener('click', () => {
            sideCard.classList.add('hidden');
        });