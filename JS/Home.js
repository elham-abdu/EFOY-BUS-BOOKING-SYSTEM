
        // Toggle sidebar functionality
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
        
        // Close sidebar when clicking on main content area
        mainContent.addEventListener('click', function() {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
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
            });
        });

        // Chat Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const userInput = document.getElementById('userInput');
            const sendButton = document.getElementById('sendButton');
            const actionBoxes = document.querySelectorAll('.action-box');
            const faqButtons = document.querySelectorAll('.faq-button');
            const chatMessages = document.getElementById('chatMessages');
            
            // Show chat messages when first interaction happens
            let chatStarted = false;
            
            function startChat() {
                if (!chatStarted) {
                    chatMessages.classList.add('active');
                    chatStarted = true;
                }
            }
            
            // Function to add message to chat
            function addMessage(text, isUser) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
                
                const timeElement = document.createElement('div');
                timeElement.classList.add('message-time');
                timeElement.textContent = getCurrentTime();
                
                messageElement.textContent = text;
                messageElement.appendChild(timeElement);
                chatMessages.appendChild(messageElement);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Function to get current time
            function getCurrentTime() {
                const now = new Date();
                return now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0');
            }
            
            // Function to handle user input
            function handleUserInput() {
                const message = userInput.value.trim();
                if (message) {
                    startChat();
                    addMessage(message, true);
                    userInput.value = '';
                    
                    // Simulate bot response after a delay
                    setTimeout(() => {
                        const response = generateBotResponse(message);
                        addMessage(response, false);
                    }, 1000);
                }
            }
            
            // Function to generate bot responses
            function generateBotResponse(message) {
                const lowerMsg = message.toLowerCase();
                
                if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
                    return "Hello! Welcome to EfoyBus. How can I assist you with your bus travel today?";
                } 
                else if (lowerMsg.includes('book') || lowerMsg.includes('ticket') || lowerMsg.includes('reserve')) {
                    return "To book a bus ticket, please visit our booking page. You can select your route, date, and preferred bus. Would you like me to guide you through the process?";
                } 
                else if (lowerMsg.includes('route') || lowerMsg.includes('destination') || lowerMsg.includes('where')) {
                    return "We serve routes across Ethiopia including Addis Ababa, Hawassa, Bahir Dar, Dire Dawa, Jimma, and many more. Which route are you interested in?";
                } 
                else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
                    return "Ticket prices vary by route and bus type. For example:\n- Addis Ababa to Hawassa: ETB 250\n- Addis Ababa to Bahir Dar: ETB 350\n- Addis Ababa to Dire Dawa: ETB 400\nWhich route would you like to know more about?";
                } 
                else if (lowerMsg.includes('schedule') || lowerMsg.includes('time') || lowerMsg.includes('when')) {
                    return "Bus schedules vary by route. Most routes have multiple departures daily. You can check specific schedules on our booking page. Which route are you interested in?";
                } 
                else if (lowerMsg.includes('cancel') || lowerMsg.includes('refund')) {
                    return "You can cancel your booking through our refund request page. Refund amounts depend on how close to departure you cancel. Would you like more details about our cancellation policy?";
                } 
                else if (lowerMsg.includes('thank')) {
                    return "You're welcome! Is there anything else I can help you with?";
                } 
                else {
                    return "I'm here to help with your bus travel needs. You can ask me about routes, prices, schedules, booking, or cancellations. How can I assist you?";
                }
            }
            
            // Function to handle FAQ button clicks
            function handleFaqClick(question) {
                startChat();
                userInput.value = question;
                handleUserInput();
            }
            
            // Function to handle action box clicks
            function handleActionClick(action) {
                let message = '';
                
                switch(action) {
                    case 'book':
                        message = "I want to book a bus ticket";
                        break;
                    case 'routes':
                        message = "What routes do you serve?";
                        break;
                    case 'prices':
                        message = "How much are bus tickets?";
                        break;
                    case 'support':
                        message = "I need help with my booking";
                        break;
                }
                
                startChat();
                userInput.value = message;
                handleUserInput();
            }
            
            // Event listeners
            sendButton.addEventListener('click', handleUserInput);
            
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleUserInput();
                }
            });
            
            // Add event listeners to FAQ buttons
            faqButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const question = this.getAttribute('data-question');
                    handleFaqClick(question);
                });
            });
            
            // Add event listeners to action boxes
            actionBoxes.forEach(box => {
                box.addEventListener('click', function() {
                    const action = this.getAttribute('data-action');
                    handleActionClick(action);
                });
            });
        });
