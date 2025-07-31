// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    // Mobile menu toggle functions
    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('hidden', 'menu-slide-out');
            // Force reflow to restart animation
            void mobileMenu.offsetWidth;
            mobileMenu.classList.add('menu-slide-in');
        }
    }
    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('menu-slide-in');
            mobileMenu.classList.add('menu-slide-out');
            mobileMenu.addEventListener('animationend', function handler() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('menu-slide-out');
                mobileMenu.removeEventListener('animationend', handler);
            });
        }
    }
    function toggleMobileMenu() {
        if (mobileMenu.classList.contains('hidden')) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    }

    // Event listeners for mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Close button functionality
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when a nav link is clicked
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}); 