/**
 * Header & Navigation Management
 * Handles theme switching, mobile menu overlay, desktop dropdowns,
 * and keyboard/click interactions.
 */

// Theme management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme state
        this.setTheme(this.theme);
        
        // Add click listener to theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button aria-label
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            );
            
            // Explicitly update icon visibility
            const sun = themeToggle.querySelector('.sun-icon');
            const moon = themeToggle.querySelector('.moon-icon');
            if (sun && moon) {
                if (theme === 'dark') {
                    sun.style.display = 'block';
                    moon.style.display = 'none';
                } else {
                    sun.style.display = 'none';
                    moon.style.display = 'block';
                }
            }
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Unified Header & Navigation Controller
class HeaderNavigation {
    constructor() {
        this.menuOpen = false;
        this.header = document.getElementById('main-header');
        this.mobileButton = document.getElementById('toggle-navigation-menu');
        this.init();
    }

    init() {
        if (!this.header || !this.mobileButton) return;

        // Toggle menu on button click
        this.mobileButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking on any navigation link
        const navLinks = this.header.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.menuOpen) {
                    this.closeMenu();
                }
            });
        });

        // Close menu when clicking outside header
        document.addEventListener('click', (e) => {
            if (this.menuOpen && !this.header.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Handle touch events for click-outside on mobile devices
        document.addEventListener('touchstart', (e) => {
            if (this.menuOpen && !this.header.contains(e.target)) {
                this.closeMenu();
            }
        }, { passive: true });

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menuOpen) {
                this.closeMenu();
            }

            // Keyboard shortcut: Ctrl/Cmd + T to toggle theme
            if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle) themeToggle.click();
            }
        });
    }

    toggleMenu() {
        this.menuOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.menuOpen = true;
        this.header.classList.add('menu-open');
        document.body.classList.add('menu-open');
        this.mobileButton.setAttribute('aria-expanded', 'true');
    }

    closeMenu() {
        this.menuOpen = false;
        this.header.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
        this.mobileButton.setAttribute('aria-expanded', 'false');
    }
}

// Active navigation link highlighting based on URL hash
class NavigationHighlight {
    constructor() {
        this.navLinks = [];
        this.init();
    }

    init() {
        this.navLinks = document.querySelectorAll('#navigation-menu a');
        
        if (this.navLinks.length > 0) {
            this.setInitialActiveState();
            window.addEventListener('hashchange', () => this.handleHashChange());
        }
    }

    setInitialActiveState() {
        const hash = window.location.hash;
        if (hash && hash !== '#') {
            this.highlightNavLink(hash.substring(1));
        }
    }

    handleHashChange() {
        const hash = window.location.hash;
        if (hash && hash !== '#') {
            this.highlightNavLink(hash.substring(1));
        } else {
            this.clearAllActiveStates();
        }
    }

    highlightNavLink(activeId) {
        this.clearAllActiveStates();
        const activeLink = document.querySelector(`#navigation-menu a[href*="#${activeId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    clearAllActiveStates() {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
    }
}

// Initialize header component on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new HeaderNavigation();
    window.navigationHighlightInstance = new NavigationHighlight();
});