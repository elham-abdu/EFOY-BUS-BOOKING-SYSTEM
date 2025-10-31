
        // Toggle sidebar functionality - ADDED
        const toggleMenu = document.querySelector('.toggle-menu');
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        toggleMenu.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            
            // Only shift content on larger screens
            if (window.innerWidth > 768) {
                mainContent.classList.toggle('shifted');
            }
        });
        
        // Close sidebar when clicking on main content area - ADDED
        mainContent.addEventListener('click', function() {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                if (window.innerWidth > 768) {
                    mainContent.classList.remove('shifted');
                }
            }
        });
        
        // Close sidebar when clicking outside on mobile - ADDED
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                const isClickInsideSidebar = sidebar.contains(event.target);
                const isClickInsideToggle = toggleMenu.contains(event.target);
                
                if (!isClickInsideSidebar && !isClickInsideToggle && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            }
        });
        
        // Handle window resize - ADDED
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
            });
        });

        // Action buttons functionality
        document.querySelectorAll('.action-view').forEach(button => {
            button.addEventListener('click', function() {
                alert('View booking details - This would open a detailed view in a real application');
            });
        });

        document.querySelectorAll('.action-cancel').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to cancel this booking?')) {
                    alert('Booking cancelled - This would process cancellation in a real application');
                }
            });
        });
    