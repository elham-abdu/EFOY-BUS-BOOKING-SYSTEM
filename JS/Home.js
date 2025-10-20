// Sample bus data with images
const buses = {
    "Addis Ababa-Bahir Dar": [
        { 
            id: 1, 
            name: "Selam Bus", 
            departure: "08:00 AM", 
            arrival: "02:30 PM", 
            price: 450, 
            amenities: ["AC", "WiFi", "TV", "Toilet"], 
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],
            occupiedSeats: [2,5,9,12,15,18,22,25,28,31]
        },
        { 
            id: 2, 
            name: "Sky Bus", 
            departure: "10:00 AM", 
            arrival: "04:30 PM", 
            price: 500, 
            amenities: ["AC", "WiFi", "TV", "Toilet", "Snacks"], 
            image: "https://images.unsplash.com/photo-1509741102003-ca643e8d906e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],
            occupiedSeats: [1,3,6,10,13,16,19,23,26,29,32]
        }
    ],
    "Addis Ababa-Hawassa": [
        { 
            id: 3, 
            name: "Habesha Bus", 
            departure: "07:00 AM", 
            arrival: "12:30 PM", 
            price: 350, 
            amenities: ["AC"], 
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],
            occupiedSeats: [4,7,8,12,14,17,20,24,27,30,33]
        },
        { 
            id: 4, 
            name: "Golden Bus", 
            departure: "02:00 PM", 
            arrival: "07:30 PM", 
            price: 400, 
            amenities: ["AC", "WiFi"], 
            image: "https://images.unsplash.com/photo-1509741102003-ca643e8d906e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],
            occupiedSeats: [3,6,11,14,16,19,22,25,28,31]
        }
    ],
    "Addis Ababa-Gondar": [
        { 
            id: 5, 
            name: "Waliya Bus", 
            departure: "06:00 AM", 
            arrival: "03:00 PM", 
            price: 550, 
            amenities: ["AC", "WiFi", "TV", "Toilet", "Meal"], 
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],
            occupiedSeats: [2,5,9,13,15,18,21,24,27,30,33]
        }
    ],
    "Bahir Dar-Addis Ababa": [
        { 
            id: 6, 
            name: "Selam Bus", 
            departure: "09:00 AM", 
            arrival: "03:30 PM", 
            price: 450, 
            amenities: ["AC", "WiFi", "TV"], 
            image: "https://images.unsplash.com/photo-1509741102003-ca643e8d906e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],
            occupiedSeats: [1,4,7,10,13,16,19,22,25,28,31]
        }
    ]
};

// DOM elements
const steps = document.querySelectorAll('.form-step');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const dateInput = document.getElementById('date');
const routeInfo = document.getElementById('route-info');
const busList = document.getElementById('bus-list');
const seatSelection = document.getElementById('seat-selection');
const busLayout = document.getElementById('bus-layout');
const pricePerSeat = document.getElementById('price-per-seat');
const selectedSeatsCount = document.getElementById('selected-seats-count');
const totalPrice = document.getElementById('total-price');
const selectedSeatsList = document.getElementById('selected-seats-list');
const confirmationDetails = document.getElementById('confirmation-details');
const paymentBusName = document.getElementById('payment-bus-name');
const paymentSeats = document.getElementById('payment-seats');
const paymentTotal = document.getElementById('payment-total');
const progressSteps = document.querySelectorAll('.progress-step .step-number');

// Set minimum date to today
dateInput.min = new Date().toISOString().split('T')[0];

// Navigation buttons
document.getElementById('next1').addEventListener('click', showStep2);
document.getElementById('prev2').addEventListener('click', () => showStep(1));
document.getElementById('next2').addEventListener('click', showStep3);
document.getElementById('prev3').addEventListener('click', () => showStep(2));
document.getElementById('next3').addEventListener('click', showStep4);
document.getElementById('prev4').addEventListener('click', () => showStep(3));
document.getElementById('next4').addEventListener('click', confirmBooking);
document.getElementById('new-booking').addEventListener('click', newBooking);

// Selected bus and seats
let selectedBus = null;
let selectedSeats = [];

function showStep(stepNumber) {
    // Update progress bar
    progressSteps.forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Show the correct step
    steps.forEach((step, index) => {
        if (index === stepNumber - 1) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function showStep2() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const date = dateInput.value;
    
    if (!from || !to || !date) {
        alert('Please fill in all fields');
        return;
    }
    
    if (from === to) {
        alert('Departure and destination cannot be the same');
        return;
    }
    
    routeInfo.textContent = `${from} to ${to} • ${formatDate(date)} • ${formatDay(date)}`;
    showStep(2);
    loadBuses(from, to);
}

function loadBuses(from, to) {
    const routeKey = `${from}-${to}`;
    busList.innerHTML = '';
    
    if (buses[routeKey]) {
        buses[routeKey].forEach(bus => {
            const busCard = document.createElement('div');
            busCard.className = 'bus-card';
            busCard.innerHTML = `
                <div class="bus-header">
                    ${bus.logo ? `<img src="${bus.logo}" alt="${bus.name} Logo" class="bus-logo">` : ''}
                    <h3>${bus.name}</h3>
                </div>
                <div class="bus-image" style="background-image: url('${bus.image || 'https://via.placeholder.com/350x180?text=Bus+Image'}')"></div>
                <p><i class="far fa-clock"></i> ${bus.departure} - ${bus.arrival}</p>
                <div class="amenities">
                    ${bus.amenities.map(amenity => {
                        const icon = getAmenityIcon(amenity);
                        return `<span class="amenity"><i class="${icon}"></i> ${amenity}</span>`;
                    }).join('')}
                </div>
                <p class="bus-price">${bus.price} ETB</p>
                <button class="select-bus-btn" data-bus-id="${bus.id}">Select Bus</button>
            `;
            busList.appendChild(busCard);
        });
        
        // Add event listeners to select buttons
        document.querySelectorAll('.select-bus-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const busId = parseInt(this.getAttribute('data-bus-id'));
                selectBus(busId, from, to);
            });
        });
    } else {
        busList.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No buses available for this route</p>';
    }
}

function selectBus(busId, from, to) {
    const routeKey = `${from}-${to}`;
    selectedBus = buses[routeKey].find(bus => bus.id === busId);
    
    // Update UI to show selected bus
    document.querySelectorAll('.bus-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Show seat selection
    seatSelection.classList.add('active');
    loadBusLayout();
    
    // Enable continue button only if seats are selected
    document.getElementById('next2').disabled = selectedSeats.length === 0;
}

function loadBusLayout() {
    busLayout.innerHTML = '';
    pricePerSeat.textContent = selectedBus.price;
    
    // Create bus front
    const busFront = document.createElement('div');
    busFront.className = 'bus-front';
    busFront.innerHTML = '<i class="fas fa-bus"></i> Front of Bus';
    busLayout.appendChild(busFront);
    
    let seatCounter = 0;
    
    // Create 7 regular rows with 4 seats each (2 left, aisle, 2 right)
    for (let row = 0; row < 7; row++) {
        // Left side seats
        for (let col = 0; col < 2; col++) {
            const seatNumber = selectedBus.seats[seatCounter];
            const seat = createSeatElement(seatNumber);
            seat.style.gridColumn = col + 1;
            seat.style.gridRow = row + 2;
            busLayout.appendChild(seat);
            seatCounter++;
        }
        
        // Aisle
        const aisle = document.createElement('div');
        aisle.className = 'aisle';
        aisle.style.gridColumn = 3;
        aisle.style.gridRow = row + 2;
        busLayout.appendChild(aisle);
        
        // Right side seats
        for (let col = 0; col < 2; col++) {
            const seatNumber = selectedBus.seats[seatCounter];
            const seat = createSeatElement(seatNumber);
            seat.style.gridColumn = col + 4;
            seat.style.gridRow = row + 2;
            busLayout.appendChild(seat);
            seatCounter++;
        }
    }
    
    // Last row (row 9) - BACK BENCH with NO AISLE, continuous seats
    const lastRow = 9;
    
    // Create back row container
    const backRow = document.createElement('div');
    backRow.className = 'back-row';
    
    // All 5 seats in a continuous row (29, 30, 31, 32, 33)
    for (let i = 0; i < 5; i++) {
        const seatNumber = selectedBus.seats[seatCounter];
        const seat = document.createElement('div');
        seat.className = 'back-seat';
        seat.textContent = seatNumber;
        
        // Position all 5 seats continuously across columns 1-5
        // Seat 29: column 1, Seat 30: column 2, Seat 31: column 3, Seat 32: column 4, Seat 33: column 5
        seat.style.gridColumn = i + 1;
        
        // Check if seat is occupied
        if (selectedBus.occupiedSeats.includes(seatNumber)) {
            seat.classList.add('occupied');
        }
        
        // Check if seat is selected
        if (selectedSeats.includes(seatNumber)) {
            seat.classList.add('selected');
        }
        
        seat.addEventListener('click', () => {
            if (seat.classList.contains('occupied')) return;
            
            if (seat.classList.contains('selected')) {
                // Deselect seat
                seat.classList.remove('selected');
                selectedSeats = selectedSeats.filter(s => s !== seatNumber);
            } else {
                // Select seat
                seat.classList.add('selected');
                selectedSeats.push(seatNumber);
            }
            
            updateSeatSelectionSummary();
            
            // Enable/disable continue button based on seat selection
            document.getElementById('next2').disabled = selectedSeats.length === 0;
        });
        
        backRow.appendChild(seat);
        seatCounter++;
    }
    busLayout.appendChild(backRow);
    
    updateSeatSelectionSummary();
}

function createSeatElement(seatNumber) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.textContent = seatNumber;
    
    // Check if seat is occupied
    if (selectedBus.occupiedSeats.includes(seatNumber)) {
        seat.classList.add('occupied');
    }
    
    // Check if seat is selected
    if (selectedSeats.includes(seatNumber)) {
        seat.classList.add('selected');
    }
    
    seat.addEventListener('click', () => {
        if (seat.classList.contains('occupied')) return;
        
        if (seat.classList.contains('selected')) {
            // Deselect seat
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seatNumber);
        } else {
            // Select seat
            seat.classList.add('selected');
            selectedSeats.push(seatNumber);
        }
        
        updateSeatSelectionSummary();
        
        // Enable/disable continue button based on seat selection
        document.getElementById('next2').disabled = selectedSeats.length === 0;
    });
    
    return seat;
}

function updateSeatSelectionSummary() {
    selectedSeatsCount.textContent = selectedSeats.length;
    const total = selectedSeats.length * selectedBus.price;
    totalPrice.textContent = total;
    
    // Update selected seats list
    selectedSeatsList.innerHTML = '';
    selectedSeats.forEach(seat => {
        const seatBadge = document.createElement('span');
        seatBadge.className = 'selected-seat';
        seatBadge.textContent = `Seat ${seat}`;
        selectedSeatsList.appendChild(seatBadge);
    });
}

function showStep3() {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
    }
    showStep(3);
}

function showStep4() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (!name || !email || !phone) {
        alert('Please fill in all passenger details');
        return;
    }
    
    // Update payment summary
    paymentBusName.textContent = selectedBus.name;
    paymentSeats.textContent = selectedSeats.join(', ');
    paymentTotal.textContent = selectedSeats.length * selectedBus.price;
    
    showStep(4);
}

function confirmBooking() {
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!cardNumber || !expiry || !cvv) {
        alert('Please fill in all payment details');
        return;
    }
    
    // Simple validation for demo purposes
    if (cardNumber.replace(/\s/g, '').length !== 16 || !/^\d+$/.test(cardNumber.replace(/\s/g, ''))) {
        alert('Please enter a valid 16-digit card number');
        return;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Please enter expiry date in MM/YY format');
        return;
    }
    
    if (!/^\d{3,4}$/.test(cvv)) {
        alert('Please enter a valid CVV (3 or 4 digits)');
        return;
    }
    
    // Generate booking reference
    const bookingRef = 'EFB' + Math.floor(100000 + Math.random() * 900000);
    
    // Show confirmation
    confirmationDetails.innerHTML = `
        <h3>Thank you for your booking!</h3>
        <p><strong>Booking Reference:</strong> ${bookingRef}</p>
        <p><strong>Route:</strong> ${fromSelect.value} to ${toSelect.value}</p>
        <p><strong>Date:</strong> ${formatDate(dateInput.value)} (${formatDay(dateInput.value)})</p>
        <p><strong>Bus:</strong> ${selectedBus.name} (Departs at ${selectedBus.departure})</p>
        <p><strong>Seats:</strong> ${selectedSeats.join(', ')}</p>
        <p><strong>Passenger:</strong> ${document.getElementById('name').value}</p>
        <p><strong>Contact:</strong> ${document.getElementById('email').value}, ${document.getElementById('phone').value}</p>
        <p><strong>Total Paid:</strong> ${selectedSeats.length * selectedBus.price} ETB</p>
        <p style="margin-top: 20px; font-style: italic;">Your ticket will be sent to your email. Please arrive at least 30 minutes before departure.</p>
    `;
    
    showStep(5);
}

function newBooking() {
    // Reset form
    fromSelect.value = '';
    toSelect.value = '';
    dateInput.value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('card-number').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('cvv').value = '';
    
    // Reset selections
    selectedBus = null;
    selectedSeats = [];
    seatSelection.classList.remove('active');
    
    showStep(1);
}

// Helper functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatDay(dateString) {
    const options = { weekday: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getAmenityIcon(amenity) {
    const icons = {
        'AC': 'fas fa-snowflake',
        'WiFi': 'fas fa-wifi',
        'TV': 'fas fa-tv',
        'Toilet': 'fas fa-toilet',
        'Snacks': 'fas fa-utensils',
        'Meal': 'fas fa-utensils'
    };
    return icons[amenity] || 'fas fa-check';
}