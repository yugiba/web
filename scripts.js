document.addEventListener('DOMContentLoaded', function() {
    // Tab bar animation
    const tabBar = document.querySelector('.tab-bar');
    tabBar.classList.add('animate__animated', 'animate__fadeInDown');
    
    // Tab switching logic
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.style.opacity = 0;
                content.classList.remove('animate__animated', 'animate__fadeIn', 'animate__slideInUp', 'animate__zoomIn', 'animate__bounceIn'); // Reset animations
            });
            
            const activeContent = document.getElementById(tab.id.replace('-tab', '-content'));
            activeContent.style.display = 'flex';
            setTimeout(() => {
                activeContent.style.opacity = 1;

                // If the "Staff" tab is clicked, apply observer to the staff groups
                if (tab.id === 'staff-tab') {
                    const staffGroups = activeContent.querySelectorAll('.staff-group');

                    // Set initial opacity to 0
                    staffGroups.forEach(group => {
                        group.style.opacity = 0;
                    });

                    const observer = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const group = entry.target;
                                group.style.opacity = 1; // Make visible before animation
                                group.classList.add('animate__animated');
                                switch (Array.from(staffGroups).indexOf(group)) {
                                    case 0:
                                        group.classList.add('animate__bounceIn');
                                        break;
                                    case 1:
                                        group.classList.add('animate__slideInUp');
                                        break;
                                    case 2:
                                        group.classList.add('animate__zoomIn');
                                        break;
                                    case 3:
                                        group.classList.add('animate__fadeIn');
                                        break;
                                    case 4:
                                        group.classList.add('animate__fadeIn');
                                        break;
                                    default:
                                        group.classList.add('animate__fadeIn');
                                        break;
                                }
                                observer.unobserve(group); // Stop observing once the animation has triggered
                            }
                        });
                    }, {
                        threshold: 0.5 // Trigger when 50% of the element is visible
                    });

                    staffGroups.forEach(group => observer.observe(group));
                }
            }, 10);
        });
    });
    
    // Initially display the home tab
    document.getElementById('home-content').style.display = 'flex';
    document.getElementById('home-content').style.opacity = 1;
    
    // Animation logic for homepage elements
    const fusionHubDescription = document.getElementById('fusion-hub-description');
    fusionHubDescription.style.opacity = 0; // Start hidden
    setTimeout(() => {
        fusionHubDescription.style.opacity = 1;
        fusionHubDescription.classList.add('animate__animated', 'animate__fadeInLeft');
    }, 2000);
    
    const discordBtn = document.getElementById('discord-btn');
    discordBtn.style.opacity = 0; // Start hidden
    setTimeout(() => {
        discordBtn.style.opacity = 1;
        discordBtn.classList.add('animate__animated', 'animate__zoomIn');
    }, 3000);
    
    // Reveal key logic
    const revealKeyBtn = document.getElementById('reveal-key-btn');
    const keyDisplay = document.getElementById('key-display');
    
    revealKeyBtn.addEventListener('click', () => {
        keyDisplay.classList.remove('hidden'); // Show the key display
        keyDisplay.style.display = 'block'; // Make sure it's displayed
        keyDisplay.classList.add('animate__animated', 'animate__fadeIn', 'animate__slideInUp'); // Add animations
    });

    // Login modal logic
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');
    
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('show');
    });
    
    closeBtn.addEventListener('click', () => {
        loginModal.classList.remove('show');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target == loginModal) {
            loginModal.classList.remove('show');
        }
    });

    // Handle the login form submission
    const loginForm = document.getElementById('login-form');
    const dashboard = document.getElementById('dashboard');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginModal.classList.remove('show');
        dashboard.classList.remove('hidden');
    });
});
