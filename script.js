window.onload = function () {
    applySavedSettings();
};
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
        "Chicago, USA": { coords: [41.8781, -87.6298], date: "February 5, 2024", time: "7:30 PM", address: "789 Michigan Ave, Chicago, IL 60611", price: 55 },
        "London, UK": { coords: [51.5074, -0.1278], date: "February 15, 2024", time: "6:00 PM", address: "789 Oxford St, London, UK", price: 40 },
        "Manchester, UK": { coords: [53.4808, -2.2426], date: "February 20, 2024", time: "7:00 PM", address: "123 Deansgate, Manchester, UK", price: 50 },
        "Sydney, Australia": { coords: [-33.8688, 151.2093], date: "February 25, 2024", time: "7:30 PM", address: "321 George St, Sydney, NSW 2000", price: 50 },
        "Melbourne, Australia": { coords: [-37.8136, 144.9631], date: "March 1, 2024", time: "8:00 PM", address: "456 Collins St, Melbourne, VIC 3000", price: 55 },
        "Toronto, Canada": { coords: [43.6532, -79.3832], date: "March 5, 2024", time: "7:00 PM", address: "456 Queen St, Toronto, ON M5V 2B6", price: 55 },
        "Vancouver, Canada": { coords: [49.2827, -123.1207], date: "March 10, 2024", time: "7:30 PM", address: "789 Robson St, Vancouver, BC V6E 1B2", price: 60 },
        "Berlin, Germany": { coords: [52.5200, 13.4050], date: "March 15, 2024", time: "8:00 PM", address: "789 Alexanderplatz, Berlin, Germany", price: 60 },
        "Munich, Germany": { coords: [48.1351, 11.5820], date: "March 20, 2024", time: "7:00 PM", address: "123 Marienplatz, Munich, Germany", price: 55 },
        "Paris, France": { coords: [48.8566, 2.3522], date: "March 25, 2024", time: "6:00 PM", address: "123 Champs-Elysées, Paris, France", price: 45 },
        "Lyon, France": { coords: [45.7640, 4.8357], date: "March 30, 2024", time: "7:00 PM", address: "456 Bellecour Square, Lyon, France", price: 50 },
        "Rome, Italy": { coords: [41.9028, 12.4964], date: "April 5, 2024", time: "8:00 PM", address: "567 Via Nazionale, Rome, Italy", price: 55 },
        "Milan, Italy": { coords: [45.4642, 9.1900], date: "April 10, 2024", time: "7:30 PM", address: "789 Duomo Square, Milan, Italy", price: 60 },
        "Tokyo, Japan": { coords: [35.6895, 139.6917], date: "April 15, 2024", time: "7:00 PM", address: "234 Shibuya St, Tokyo, Japan", price: 65 },
        "Osaka, Japan": { coords: [34.6937, 135.5023], date: "April 20, 2024", time: "8:00 PM", address: "567 Umeda St, Osaka, Japan", price: 60 },
        "Rio de Janeiro, Brazil": { coords: [-22.9068, -43.1729], date: "April 10, 2024", time: "8:00 PM", address: "678 Copacabana Blvd, Rio, Brazil", price: 50 },
        "Cape Town, South Africa": { coords: [-33.9249, 18.4241], date: "April 20, 2024", time: "6:30 PM", address: "345 Table Mountain Rd, Cape Town, SA", price: 60 },
        "Madrid, Spain": { coords: [40.4168, -3.7038], date: "May 5, 2024", time: "7:00 PM", address: "890 Gran Via, Madrid, Spain", price: 55 },
        "Mumbai, India": { coords: [19.0760, 72.8777], date: "May 15, 2024", time: "8:00 PM", address: "123 Marine Drive, Mumbai, India", price: 40 },
        "Mexico City, Mexico": { coords: [19.4326, -99.1332], date: "May 25, 2024", time: "8:30 PM", address: "456 Reforma Blvd, Mexico City, Mexico", price: 50 },
        "Moscow, Russia": { coords: [55.7558, 37.6173], date: "June 1, 2024", time: "7:00 PM", address: "789 Red Square, Moscow, Russia", price: 65 },
        "Beijing, China": { coords: [39.9042, 116.4074], date: "June 10, 2024", time: "7:30 PM", address: "123 Wangfujing St, Beijing, China", price: 70 }
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
        function toggleAccessibilityToolbar() {
            const toolbar = document.getElementById("accessibilityToolbar");
            toolbar.style.display = toolbar.style.display === "none" ? "block" : "none";
        }

        function adjustTextSize(level) {
            document.body.classList.remove(
                "text-size-1",
                "text-size-2",
                "text-size-3",
                "text-size-4",
                "text-size-5"
            );
            document.body.classList.add(`text-size-${level}`);
            const labels = ["Small", "Medium", "Normal", "Large", "Extra-Large"];
            document.getElementById("textResizeLabel").innerText = labels[level - 1];
        }

        function toggleHighContrast() {
            document.body.classList.toggle("high-contrast");
        }

        function toggleGrayscale() {
            document.body.classList.toggle("grayscale");
        }

        function toggleKeyboardFocus() {
            document.body.classList.toggle("focus-mode");
        }

        function resetAccessibility() {
            document.body.classList.remove(
                "text-size-1",
                "text-size-2",
                "text-size-3",
                "text-size-4",
                "text-size-5",
                
                "high-contrast",
              
            );
            document.getElementById("textResizeLabel").innerText = "Normal";
        }
 

function applySavedSettings() {
    // Text size
    const textSize = localStorage.getItem('textSize');
    if (textSize) {
        adjustTextSize(textSize, false); // Don't save again
    }

  
    // High contrast
    if (localStorage.getItem('highContrast') === 'true') {
        toggleHighContrast(false); // Don't save again
    }

  

// Adjust text size
function adjustTextSize(level, save = true) {
    document.body.classList.remove('text-size-1', 'text-size-2', 'text-size-3');
    document.body.classList.add(`text-size-${level}`);
    if (save) localStorage.setItem('textSize', level);
}


// Toggle high contrast mode
function toggleHighContrast(save = true) {
    const body = document.body;
    const isHighContrast = body.classList.toggle('high-contrast');
    if (save) localStorage.setItem('highContrast', isHighContrast);
}



// Reset all settings
function resetAccessibility() {
    document.body.classList.remove(
        'text-size-1',
        'text-size-2',
        'text-size-3',
        'font-serif',
        'font-sans-serif',
        'high-contrast',
        'grayscale'
    );
}}
function addToCart(itemName, price, imageUrl = 'assets/images/ticket.png') {
    const numericPrice = parseFloat(price);
    cart.push({ itemName, price: numericPrice, imageUrl });
    cartCount = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    alert(`Added ${itemName} for $${numericPrice.toFixed(2)} to your cart!`);
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cartCount');
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    cartCountElement.innerText = cartCount;
    cartItemsElement.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.itemName}" class="cart-item-image">
            <div class="cart-item-details">
                <p>${item.itemName} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsElement.appendChild(itemDiv);
        total += item.price;
    });

    cartTotalElement.innerText = total.toFixed(2);
}
function sendLove() {
    const body = document.body;

    // Create hearts
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        body.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}
function sendLove() {
    // Get the hearts container element
    var hearts = document.getElementById('hearts');
    
    // Show the hearts
    hearts.style.display = 'block';
    
    // Hide the hearts after 2 seconds (2000 milliseconds)
    setTimeout(function() {
        hearts.style.display = 'none';
    }, 8000); // 2000 ms = 2 seconds
}

// Member Details
const memberDetails = {
    alex: {
        title: "Alex",
        bio: "Alex is the bassist of Stage Fright, providing the backbone for the band's sound.",
        role: "Bassist"
    },
    jamie: {
        title: "Jamie",
        bio: "Jamie is the drummer, keeping the beat and bringing energy to the stage.",
        role: "Drummer"
    },
    taylor: {
        title: "Taylor",
        bio: "Taylor is the guitarist, the musical force behind our band's rocking sound.",
        role: "Guitarist"
    },
    morgan: {
        title: "Morgan",
        bio: "Morgan is the lead guitarist, adding fire and passion to every song.",
        role: "Lead Guitarist"
    }
};

// Show Modal with Member Info
function showMemberDetails(memberId) {
    const member = memberDetails[memberId];
    document.getElementById("modal-title").textContent = member.title;
    document.getElementById("modal-bio").textContent = member.bio;
    document.getElementById("member-modal").style.display = "flex";
}

// Close Modal
function closeModal() {
    document.getElementById("member-modal").style.display = "none";
}
function playAudio(audioId) {
    const audio = document.getElementById(audioId);
    
    // Stop any other audio currently playing
    const allAudios = document.querySelectorAll('audio');
    allAudios.forEach(aud => {
        if (aud !== audio) {
            aud.pause();
            aud.currentTime = 0;
        }
    });

    // Play the selected audio
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
function toggleSongList(songListId) {
    const songList = document.getElementById(songListId);
    
    // Toggle visibility
    if (songList.style.display === "block") {
        songList.style.display = "none";
    } else {
        songList.style.display = "block";
    }
}
// Function to open the song modal
function openSongModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
}

// Function to close the song modal
function closeSongModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}


// Function to open the song modal
function openSongModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active'); // Add 'active' class to display modal
}

// Function to close the song modal
function closeSongModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active'); // Remove 'active' class to hide modal
}

// Close modal if the user clicks outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.song-modal');
    modals.forEach(modal => {
        if (event.target == modal) { // Close modal if user clicks outside modal content
            closeSongModal(modal.id);
        }
    });
}
// Function to open the song modal
function openSongModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active'); // Add 'active' class to display modal
}

// Function to close the song modal
function closeSongModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active'); // Remove 'active' class to hide modal
}

// Close modal if the user clicks outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.song-modal');
    modals.forEach(modal => {
        if (event.target == modal) { // Close modal if user clicks outside modal content
            closeSongModal(modal.id);
        }
    });
}
// Function to play audio when "Listen Now" button is clicked
function playAudio(audioId) {
    var audioElement = document.getElementById(audioId);
    // Pause all other audio elements before playing the new one
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach(audio => audio.pause());
    
    // Play the selected audio
    if (audioElement) {
        audioElement.play();
    }
}
