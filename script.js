    // Initialize map with default coordinates
    const map = L.map('tourMap').setView([51.5074, -0.1278], 2); // Default to London

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Locations data with city names, coordinates, and event details
    const locations = {
        "New York, USA": { coords: [40.7128, -74.0060], date: "January 15, 2024", time: "7:00 PM", address: "123 Broadway St, New York, NY 10001", price: "$50" },
        "Los Angeles, USA": { coords: [34.0522, -118.2437], date: "January 22, 2024", time: "8:00 PM", address: "456 Sunset Blvd, Los Angeles, CA 90028", price: "$60" },
        "London, UK": { coords: [51.5074, -0.1278], date: "February 15, 2024", time: "6:00 PM", address: "789 Oxford St, London, UK", price: "$40" },
        "Sydney, Australia": { coords: [-33.8688, 151.2093], date: "February 20, 2024", time: "7:30 PM", address: "321 George St, Sydney, NSW 2000", price: "$50" },
        "Toronto, Canada": { coords: [43.6532, -79.3832], date: "March 1, 2024", time: "7:00 PM", address: "456 Queen St, Toronto, ON M5V 2B6", price: "$55" },
        "Berlin, Germany": { coords: [52.5200, 13.4050], date: "March 5, 2024", time: "8:00 PM", address: "789 Alexanderplatz, Berlin, Germany", price: "$60" },
        "Paris, France": { coords: [48.8566, 2.3522], date: "March 10, 2024", time: "6:00 PM", address: "123 Champs-Elysées, Paris, France", price: "$45" }
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
                        <p>Price: ${location.price}</p>
                        <button onclick="addToCart('${city}', '${location.price}')">Buy Tickets</button>
                    </div>
                `;
                document.getElementById('showList').innerHTML += showItemHTML;
            }
        });
    }

    // Event listener for dropdown change
    document.getElementById('countryDropdown').addEventListener('change', updateMapAndList);

    // Cart functionality
    const cart = [];
    let cartCount = 0;

    function toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.style.transform === 'translateX(0%)') {
            cartSidebar.style.transform = 'translateX(100%)';
        } else {
            cartSidebar.style.transform = 'translateX(0%)';
        }
    }

    function addToCart(city, price) {
        cart.push({ city, price });
        cartCount++;
        document.getElementById('cartCount').innerText = cartCount;
        updateCart();
        alert(`Added ${city} tickets for ${price} to your cart!`);
    }

    function updateCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(cartItem => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `${cartItem.city} - ${cartItem.price}`;
            cartItemsContainer.appendChild(itemDiv);
            total += parseFloat(cartItem.price.replace('$', ''));
        });

        cartTotal.innerText = `$${total.toFixed(2)}`;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.carousel');
        let currentIndex = 0;
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;
    
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
        }, 100000); // Adjust time for transition
    });