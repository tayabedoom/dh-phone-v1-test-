// Hamburger Menu JavaScript
class HamburgerMenu {
    constructor() {
        this.isOpen = false;
        this.currentLanguage = 'en';
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.createMenuElements();
        this.bindEvents();
        this.setActivePage();
        this.loadSavedLanguage();
        this.loadSavedTheme();
    }

    createMenuElements() {
        // Create hamburger button (mobile only)
        const hamburgerButton = document.createElement('button');
        hamburgerButton.className = 'hamburger-button';
        hamburgerButton.innerHTML = '<div class="hamburger-icon"></div>';
        hamburgerButton.setAttribute('aria-label', 'Open menu');
        document.body.appendChild(hamburgerButton);

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'hamburger-menu-overlay';
        document.body.appendChild(overlay);

        // Create mobile menu
        const menu = document.createElement('div');
        menu.className = 'hamburger-menu';
        menu.innerHTML = `
            <div class="hamburger-menu-header">
                <button class="hamburger-menu-close" aria-label="Close menu">×</button>
                <h3>DH Phone</h3>
            </div>
            <nav class="hamburger-menu-nav">
                <a href="index.html" data-page="home">🏠 Home</a>
                <a href="porduct.html" data-page="products">📱 Products</a>
                <a href="Contact.html" data-page="contact">📞 Contact</a>
            </nav>
            <div class="hamburger-menu-footer">
                <div class="flex items-center justify-between">
                    <!-- Dark Mode Toggle -->
                    <button class="mobile-dark-toggle flex items-center text-white p-3 rounded-lg hover:bg-white/10 transition-colors">
                        <i class="fas fa-moon dark:hidden"></i>
                        <i class="fas fa-sun hidden dark:block"></i>
                        <span class="ml-2 text-sm">Dark Mode</span>
                    </button>
                    <!-- Language Toggle -->
                    <div class="relative">
                        <button class="language-toggle flex items-center text-white p-3 rounded-lg hover:bg-white/10 transition-colors">
                            <span class="language-text">EN</span>
                            <span class="ml-2">🌐</span>
                        </button>
                        <div class="language-dropdown">
                            <button class="language-option" data-lang="en">🇺🇸 English</button>
                            <button class="language-option" data-lang="fr">🇫🇷 Français</button>
                            <button class="language-option" data-lang="ar">🇸🇦 العربية</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(menu);

        // Create desktop navigation
        this.createDesktopNavigation();

        // Store references
        this.hamburgerButton = hamburgerButton;
        this.overlay = overlay;
        this.menu = menu;
        this.languageToggle = menu.querySelector('.language-toggle');
        this.languageDropdown = menu.querySelector('.language-dropdown');
        this.languageText = menu.querySelector('.language-text');
        this.mobileDarkToggle = menu.querySelector('.mobile-dark-toggle');
    }

    createDesktopNavigation() {
        // Find the header
        const header = document.querySelector('header');
        if (!header) return;

        // Find the header container div
        const headerContainer = header.querySelector('div');
        if (!headerContainer) return;

        // Find the inner div that contains the logo
        const innerDiv = headerContainer.querySelector('div');
        if (!innerDiv) return;

        // Create desktop nav container
        const desktopNav = document.createElement('div');
        desktopNav.className = 'hidden md:flex items-center space-x-8 ml-auto';
        desktopNav.innerHTML = `
            <nav class="flex items-center space-x-6">
                <a href="index.html" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors nav-link" data-page="home">Home</a>
                <a href="porduct.html" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors nav-link" data-page="products">Products</a>
                <a href="Contact.html" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors nav-link" data-page="contact">Contact</a>
            </nav>
            <!-- Dark Mode Toggle -->
            <button class="desktop-dark-toggle flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <i class="fas fa-moon dark:hidden"></i>
                <i class="fas fa-sun hidden dark:block"></i>
            </button>
            <!-- Language Toggle -->
            <div class="relative">
                <button class="desktop-language-toggle flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
                    <span class="desktop-language-text">EN</span>
                    <i class="fas fa-chevron-down ml-1 text-xs"></i>
                </button>
                <div class="desktop-language-dropdown hidden absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-1 z-10 border border-gray-200 dark:border-slate-600">
                    <button class="desktop-language-option block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full text-left transition-colors" data-lang="en">🇺🇸 English</button>
                    <button class="desktop-language-option block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full text-left transition-colors" data-lang="fr">🇫🇷 Français</button>
                    <button class="desktop-language-option block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full text-left transition-colors" data-lang="ar">🇸🇦 العربية</button>
                </div>
            </div>
        `;

        // Insert desktop nav into the inner div (same level as logo)
        innerDiv.appendChild(desktopNav);

        // Store desktop references
        this.desktopLanguageToggle = desktopNav.querySelector('.desktop-language-toggle');
        this.desktopLanguageDropdown = desktopNav.querySelector('.desktop-language-dropdown');
        this.desktopLanguageText = desktopNav.querySelector('.desktop-language-text');
        this.desktopDarkToggle = desktopNav.querySelector('.desktop-dark-toggle');
    }

    bindEvents() {
        // Hamburger button click
        this.hamburgerButton.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close button click
        const closeButton = this.menu.querySelector('.hamburger-menu-close');
        closeButton.addEventListener('click', () => {
            this.closeMenu();
        });

        // Overlay click
        this.overlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // Mobile language toggle
        if (this.languageToggle) {
            this.languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLanguageDropdown();
            });
        }

        // Mobile language options
        if (this.languageDropdown) {
            this.languageDropdown.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const lang = e.target.dataset.lang;
                    this.changeLanguage(lang);
                    this.closeLanguageDropdown();
                });
            });
        }

        // Desktop language toggle
        if (this.desktopLanguageToggle) {
            this.desktopLanguageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDesktopLanguageDropdown();
            });
        }

        // Desktop language options
        if (this.desktopLanguageDropdown) {
            this.desktopLanguageDropdown.querySelectorAll('.desktop-language-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const lang = e.target.dataset.lang;
                    this.changeLanguage(lang);
                    this.closeDesktopLanguageDropdown();
                });
            });
        }

        // Mobile dark mode toggle
        if (this.mobileDarkToggle) {
            this.mobileDarkToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Desktop dark mode toggle
        if (this.desktopDarkToggle) {
            this.desktopDarkToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Close language dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (this.languageToggle && !this.languageToggle.contains(e.target) && !this.languageDropdown.contains(e.target)) {
                this.closeLanguageDropdown();
            }
            if (this.desktopLanguageToggle && !this.desktopLanguageToggle.contains(e.target) && !this.desktopLanguageDropdown.contains(e.target)) {
                this.closeDesktopLanguageDropdown();
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
                this.closeLanguageDropdown();
                this.closeDesktopLanguageDropdown();
            }
        });

        // Close menu when clicking on a link
        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.menu.classList.add('open');
        this.overlay.classList.add('active');
        this.hamburgerButton.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.isOpen = false;
        this.menu.classList.remove('open');
        this.overlay.classList.remove('active');
        this.hamburgerButton.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleLanguageDropdown() {
        console.log('Mobile language toggle clicked');
        if (this.languageDropdown) {
            this.languageDropdown.classList.toggle('active');
            console.log('Language dropdown toggled:', this.languageDropdown.classList.contains('active'));
        } else {
            console.error('Language dropdown not found');
        }
    }

    closeLanguageDropdown() {
        this.languageDropdown.classList.remove('active');
    }

    toggleDesktopLanguageDropdown() {
        this.desktopLanguageDropdown.classList.toggle('hidden');
    }

    closeDesktopLanguageDropdown() {
        this.desktopLanguageDropdown.classList.add('hidden');
    }

    changeLanguage(lang) {
        console.log('Changing language to:', lang);
        this.currentLanguage = lang;
        
        // Update mobile language text
        if (this.languageText) {
            this.languageText.textContent = lang.toUpperCase();
            console.log('Updated mobile language text');
        }
        
        // Update desktop language text
        if (this.desktopLanguageText) {
            this.desktopLanguageText.textContent = lang.toUpperCase();
            console.log('Updated desktop language text');
        }
        
        localStorage.setItem('hamburger-menu-language', lang);
        
        // Update page language
        document.documentElement.setAttribute('lang', lang);
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
        
        // You can add more language-specific functionality here
        console.log(`Language changed to: ${lang}`);
    }

    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Set active state for mobile menu links
        const menuLinks = this.menu.querySelectorAll('.hamburger-menu-nav a');
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
        
        // Set active state for desktop navigation links
        const desktopLinks = document.querySelectorAll('.nav-link');
        desktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('hamburger-menu-language') || 'en';
        this.changeLanguage(savedLang);
    }

    toggleTheme() {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark');
        
        if (isDark) {
            html.classList.remove('dark');
            this.currentTheme = 'light';
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            this.currentTheme = 'dark';
            localStorage.setItem('theme', 'dark');
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const html = document.documentElement;
        
        if (savedTheme === 'dark') {
            html.classList.add('dark');
            this.currentTheme = 'dark';
        } else {
            html.classList.remove('dark');
            this.currentTheme = 'light';
        }
    }
}

// Initialize hamburger menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HamburgerMenu();
});

// Export for potential use in other scripts
window.HamburgerMenu = HamburgerMenu; 