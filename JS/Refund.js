
        // Function to set active navigation based on current page
        function setActiveNavigation() {
            // Get the current page filename
            const currentPage = window.location.pathname.split('/').pop() || 'Refund.html';
            
            // Remove active class from all nav items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Set active class based on current page
            switch(currentPage) {
                case 'Home.html':
                    document.getElementById('home-nav').classList.add('active');
                    break;
                case 'BusBooking.html':
                    document.getElementById('booking-nav').classList.add('active');
                    break;
                case 'History.html':
                    document.getElementById('history-nav').classList.add('active');
                    break;
                case 'Refund.html':
                    document.getElementById('refund-nav').classList.add('active');
                    break;
                default:
                    // If no match, default to Refund
                    document.getElementById('refund-nav').classList.add('active');
            }
        }

        // Toggle sidebar functionality
        const toggleMenu = document.querySelector('.toggle-menu');
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        toggleMenu.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            toggleMenu.classList.toggle('hidden');
            
            // Only shift content on larger screens
            if (window.innerWidth > 768) {
                mainContent.classList.toggle('shifted');
            }
        });
        
        // Close sidebar when clicking on main content area
        mainContent.addEventListener('click', function() {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                toggleMenu.classList.remove('hidden');
                if (window.innerWidth > 768) {
                    mainContent.classList.remove('shifted');
                }
            }
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                const isClickInsideSidebar = sidebar.contains(event.target);
                const isClickInsideToggle = toggleMenu.contains(event.target);
                
                if (!isClickInsideSidebar && !isClickInsideToggle && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    toggleMenu.classList.remove('hidden');
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                mainContent.classList.remove('shifted');
            } else if (sidebar.classList.contains('active')) {
                mainContent.classList.add('shifted');
            }
        });
        
        // Dark/Light mode toggle functionality
        const toggleContainer = document.querySelector('.toggle-container');
        const body = document.body;
        
        toggleContainer.addEventListener('click', function() {
            this.classList.toggle('active');
            body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Check for saved theme preference
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        if (savedDarkMode) {
            body.classList.add('dark-mode');
            toggleContainer.classList.add('active');
        }
        
        // Navigation item selection
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    toggleMenu.classList.remove('hidden');
                }
            });
        });

        // Booking card selection
        document.querySelectorAll('.booking-card').forEach(card => {
            card.addEventListener('click', function() {
                document.querySelectorAll('.booking-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                
                // Update refund amount based on selected booking
                const bookingId = this.querySelector('.booking-id').textContent;
                if (bookingId === '#EF2025102') {
                    document.querySelector('.amount-value').textContent = 'ETB 180';
                } else if (bookingId === '#EF2025104') {
                    document.querySelector('.amount-value').textContent = 'ETB 255';
                }
            });
        });

        // Form submission
        document.getElementById('refundForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedBooking = document.querySelector('.booking-card.selected .booking-id').textContent;
            const reason = document.getElementById('refundReason').value;
            const method = document.getElementById('refundMethod').value;
            
            if (!reason || !method) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Simulate form submission
            alert(`Refund request submitted successfully!\n\nBooking: ${selectedBooking}\nReason: ${document.getElementById('refundReason').options[document.getElementById('refundReason').selectedIndex].text}\nMethod: ${document.getElementById('refundMethod').options[document.getElementById('refundMethod').selectedIndex].text}\n\nYou will receive confirmation email shortly.`);
            
            // Reset form
            this.reset();
        });

        // Update refund amount based on reason
        document.getElementById('refundReason').addEventListener('change', function() {
            const reason = this.value;
            const amountElement = document.querySelector('.amount-value');
            
            if (reason === 'bus_delay') {
                amountElement.textContent = 'ETB 180'; // Full refund
                amountElement.nextElementSibling.textContent = '* 100% refund for operator issues';
            } else {
                amountElement.textContent = 'ETB 180'; // Standard refund
                amountElement.nextElementSibling.textContent = '* 85% refund as per cancellation policy';
            }
        });

        // Set active navigation on page load
        document.addEventListener('DOMContentLoaded', function() {
            setActiveNavigation();
        });
