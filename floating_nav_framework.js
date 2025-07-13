/**
 * FloatingNavFramework - Framework de barres de navigation flottantes élégantes
 * Version 1.0.0
 * 
 * Fonctionnalités:
 * - Effet glassmorphism (verre liquide)
 * - Positionnement flexible
 * - Animations fluides
 * - Responsive design
 * - Thèmes adaptatifs
 * - API simple et intuitive
 */

class FloatingNavFramework {
    constructor() {
        this.navBars = new Map();
        this.defaultConfig = {
            position: 'bottom-center',
            theme: 'auto',
            blur: 20,
            opacity: 0.8,
            borderRadius: 20,
            padding: 15,
            gap: 12,
            animationDuration: 300,
            hoverScale: 1.1,
            iconSize: 24,
            showLabels: false,
            labelPosition: 'bottom',
            autoHide: false,
            hideDelay: 3000,
            zIndex: 1000,
            shadow: true,
            border: true,
            vibration: true
        };
        this.themes = {
            light: {
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'rgba(255, 255, 255, 0.3)',
                text: '#333333',
                iconColor: '#555555',
                shadow: 'rgba(0, 0, 0, 0.1)'
            },
            dark: {
                background: 'rgba(0, 0, 0, 0.8)',
                border: 'rgba(255, 255, 255, 0.1)',
                text: '#ffffff',
                iconColor: '#ffffff',
                shadow: 'rgba(0, 0, 0, 0.3)'
            },
            auto: null // Sera défini dynamiquement
        };
        this.init();
    }

    init() {
        this.injectStyles();
        this.detectSystemTheme();
        this.setupEventListeners();
    }

    injectStyles() {
        const styleId = 'floating-nav-framework-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .floating-nav-container {
                position: fixed;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: var(--nav-z-index, 1000);
            }

            .floating-nav-bar {
                display: flex;
                align-items: center;
                backdrop-filter: blur(var(--nav-blur, 20px));
                -webkit-backdrop-filter: blur(var(--nav-blur, 20px));
                background: var(--nav-background);
                border: 1px solid var(--nav-border);
                border-radius: var(--nav-border-radius, 20px);
                padding: var(--nav-padding, 15px);
                gap: var(--nav-gap, 12px);
                box-shadow: var(--nav-shadow);
                pointer-events: auto;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                user-select: none;
            }

            .floating-nav-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 8px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                text-decoration: none;
                color: var(--nav-text-color);
                position: relative;
                min-width: 40px;
                min-height: 40px;
            }

            .floating-nav-item:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: scale(var(--nav-hover-scale, 1.1));
                backdrop-filter: blur(10px);
            }

            .floating-nav-item:active {
                transform: scale(0.95);
            }

            .floating-nav-icon {
                width: var(--nav-icon-size, 24px);
                height: var(--nav-icon-size, 24px);
                fill: var(--nav-icon-color);
                stroke: var(--nav-icon-color);
                transition: all 0.2s ease;
            }

            .floating-nav-label {
                font-size: 10px;
                font-weight: 500;
                margin-top: 4px;
                opacity: 0.8;
                white-space: nowrap;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .floating-nav-tooltip {
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s ease;
                pointer-events: none;
                z-index: 1001;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .floating-nav-item:hover .floating-nav-tooltip {
                opacity: 1;
                visibility: visible;
            }

            .floating-nav-tooltip.top {
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(-8px);
            }

            .floating-nav-tooltip.bottom {
                top: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(8px);
            }

            .floating-nav-indicator {
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--nav-text-color);
                border-radius: 50%;
                top: 6px;
                right: 6px;
                opacity: 0.6;
            }

            /* Positions */
            .floating-nav-bottom-left {
                bottom: 20px;
                left: 20px;
            }

            .floating-nav-bottom-center {
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
            }

            .floating-nav-bottom-right {
                bottom: 20px;
                right: 20px;
            }

            .floating-nav-top-left {
                top: 20px;
                left: 20px;
            }

            .floating-nav-top-center {
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
            }

            .floating-nav-top-right {
                top: 20px;
                right: 20px;
            }

            .floating-nav-left-center {
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
            }

            .floating-nav-right-center {
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }

            .floating-nav-left-center .floating-nav-bar,
            .floating-nav-right-center .floating-nav-bar {
                flex-direction: column;
            }

            /* Animations */
            @keyframes slideInBottom {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes slideInTop {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes slideInLeft {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            .floating-nav-show {
                animation: slideInBottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .floating-nav-hide {
                opacity: 0;
                transform: translateY(20px);
                pointer-events: none;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .floating-nav-container {
                    padding: 0 10px;
                }
                
                .floating-nav-bar {
                    max-width: calc(100vw - 40px);
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                .floating-nav-bar::-webkit-scrollbar {
                    display: none;
                }
            }

            /* Thème sombre système */
            @media (prefers-color-scheme: dark) {
                .floating-nav-auto {
                    --nav-background: rgba(0, 0, 0, 0.8);
                    --nav-border: rgba(255, 255, 255, 0.1);
                    --nav-text-color: #ffffff;
                    --nav-icon-color: #ffffff;
                    --nav-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                }
            }

            /* Thème clair système */
            @media (prefers-color-scheme: light) {
                .floating-nav-auto {
                    --nav-background: rgba(255, 255, 255, 0.8);
                    --nav-border: rgba(255, 255, 255, 0.3);
                    --nav-text-color: #333333;
                    --nav-icon-color: #555555;
                    --nav-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    detectSystemTheme() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.themes.auto = isDark ? this.themes.dark : this.themes.light;
    }

    setupEventListeners() {
        // Écouter les changements de thème système
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            this.detectSystemTheme();
            this.updateAllNavBars();
        });

        // Gestion de l'auto-hide
        let hideTimeout;
        document.addEventListener('mousemove', () => {
            this.navBars.forEach((navBar, id) => {
                if (navBar.config.autoHide) {
                    navBar.container.classList.remove('floating-nav-hide');
                    clearTimeout(hideTimeout);
                    hideTimeout = setTimeout(() => {
                        navBar.container.classList.add('floating-nav-hide');
                    }, navBar.config.hideDelay);
                }
            });
        });
    }

    create(id, items, config = {}) {
        const finalConfig = { ...this.defaultConfig, ...config };
        
        if (this.navBars.has(id)) {
            console.warn(`Navigation bar with id "${id}" already exists`);
            return this;
        }

        const container = this.createContainer(id, finalConfig);
        const navBar = this.createNavBar(items, finalConfig);
        
        container.appendChild(navBar);
        document.body.appendChild(container);

        this.navBars.set(id, {
            container,
            navBar,
            items,
            config: finalConfig
        });

        this.applyTheme(container, finalConfig.theme);
        this.setupNavBarBehavior(container, finalConfig);

        return this;
    }

    createContainer(id, config) {
        const container = document.createElement('div');
        container.id = `floating-nav-${id}`;
        container.className = `floating-nav-container floating-nav-${config.position}`;
        
        container.style.setProperty('--nav-z-index', config.zIndex);
        
        return container;
    }

    createNavBar(items, config) {
        const navBar = document.createElement('div');
        navBar.className = 'floating-nav-bar floating-nav-show';
        
        // Appliquer les variables CSS
        navBar.style.setProperty('--nav-blur', `${config.blur}px`);
        navBar.style.setProperty('--nav-border-radius', `${config.borderRadius}px`);
        navBar.style.setProperty('--nav-padding', `${config.padding}px`);
        navBar.style.setProperty('--nav-gap', `${config.gap}px`);
        navBar.style.setProperty('--nav-hover-scale', config.hoverScale);
        navBar.style.setProperty('--nav-icon-size', `${config.iconSize}px`);

        items.forEach(item => {
            const navItem = this.createNavItem(item, config);
            navBar.appendChild(navItem);
        });

        return navBar;
    }

    createNavItem(item, config) {
        const navItem = document.createElement(item.href ? 'a' : 'div');
        navItem.className = 'floating-nav-item';
        
        if (item.href) {
            navItem.href = item.href;
            if (item.target) navItem.target = item.target;
        }

        // Icône
        if (item.icon) {
            const iconElement = this.createIcon(item.icon);
            navItem.appendChild(iconElement);
        }

        // Texte
        if (item.text && (!item.icon || config.showLabels)) {
            const label = document.createElement('span');
            label.className = 'floating-nav-label';
            label.textContent = item.text;
            navItem.appendChild(label);
        }

        // Tooltip
        if (item.tooltip) {
            const tooltip = document.createElement('div');
            tooltip.className = `floating-nav-tooltip ${config.position.includes('top') ? 'bottom' : 'top'}`;
            tooltip.textContent = item.tooltip;
            navItem.appendChild(tooltip);
        }

        // Indicateur
        if (item.indicator) {
            const indicator = document.createElement('div');
            indicator.className = 'floating-nav-indicator';
            navItem.appendChild(indicator);
        }

        // Événements
        if (item.onClick) {
            navItem.addEventListener('click', (e) => {
                if (config.vibration && navigator.vibrate) {
                    navigator.vibrate(50);
                }
                item.onClick(e);
            });
        }

        return navItem;
    }

    createIcon(iconData) {
        const icon = document.createElement('div');
        icon.className = 'floating-nav-icon';
        
        if (typeof iconData === 'string') {
            // SVG string ou emoji
            if (iconData.startsWith('<svg')) {
                icon.innerHTML = iconData;
            } else {
                icon.textContent = iconData;
                icon.style.fontSize = 'var(--nav-icon-size)';
            }
        } else if (iconData.svg) {
            icon.innerHTML = iconData.svg;
        } else if (iconData.emoji) {
            icon.textContent = iconData.emoji;
            icon.style.fontSize = 'var(--nav-icon-size)';
        } else if (iconData.class) {
            icon.className += ` ${iconData.class}`;
        }

        return icon;
    }

    applyTheme(container, themeName) {
        const theme = this.themes[themeName] || this.themes.auto;
        const navBar = container.querySelector('.floating-nav-bar');
        
        container.className = container.className.replace(/floating-nav-(light|dark|auto)/, '');
        container.classList.add(`floating-nav-${themeName}`);
        
        if (theme) {
            navBar.style.setProperty('--nav-background', theme.background);
            navBar.style.setProperty('--nav-border', theme.border);
            navBar.style.setProperty('--nav-text-color', theme.text);
            navBar.style.setProperty('--nav-icon-color', theme.iconColor);
            navBar.style.setProperty('--nav-shadow', `0 8px 32px ${theme.shadow}`);
        }
    }

    setupNavBarBehavior(container, config) {
        const navBar = container.querySelector('.floating-nav-bar');
        
        // Auto-hide initial
        if (config.autoHide) {
            setTimeout(() => {
                container.classList.add('floating-nav-hide');
            }, config.hideDelay);
        }

        // Effet de survol global
        navBar.addEventListener('mouseenter', () => {
            navBar.style.transform = 'translateY(-2px)';
        });

        navBar.addEventListener('mouseleave', () => {
            navBar.style.transform = 'translateY(0)';
        });
    }

    updateAllNavBars() {
        this.navBars.forEach((navBar, id) => {
            this.applyTheme(navBar.container, navBar.config.theme);
        });
    }

    update(id, items, config = {}) {
        const navBarData = this.navBars.get(id);
        if (!navBarData) {
            console.warn(`Navigation bar with id "${id}" not found`);
            return this;
        }

        const newConfig = { ...navBarData.config, ...config };
        const newNavBar = this.createNavBar(items, newConfig);
        
        navBarData.container.replaceChild(newNavBar, navBarData.navBar);
        
        this.navBars.set(id, {
            ...navBarData,
            navBar: newNavBar,
            items,
            config: newConfig
        });

        this.applyTheme(navBarData.container, newConfig.theme);
        this.setupNavBarBehavior(navBarData.container, newConfig);

        return this;
    }

    show(id) {
        const navBarData = this.navBars.get(id);
        if (navBarData) {
            navBarData.container.classList.remove('floating-nav-hide');
            navBarData.container.style.display = 'flex';
        }
        return this;
    }

    hide(id) {
        const navBarData = this.navBars.get(id);
        if (navBarData) {
            navBarData.container.classList.add('floating-nav-hide');
        }
        return this;
    }

    destroy(id) {
        const navBarData = this.navBars.get(id);
        if (navBarData) {
            navBarData.container.remove();
            this.navBars.delete(id);
        }
        return this;
    }

    setTheme(id, theme) {
        const navBarData = this.navBars.get(id);
        if (navBarData) {
            navBarData.config.theme = theme;
            this.applyTheme(navBarData.container, theme);
        }
        return this;
    }

    // Méthode utilitaire pour créer des icônes SVG communes
    static icons = {
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
        user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
        settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m5.5-5.5L11 11m6 6l4.5-4.5M16.5 6.5L11 11"/></svg>',
        heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
        star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>',
        mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
        menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
        close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    };
}

// Instance globale
const FloatingNav = new FloatingNavFramework();

// Export pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloatingNavFramework;
}

// API simplifiée pour utilisation rapide
window.FloatingNav = FloatingNav;

/* 
EXEMPLE D'UTILISATION :

// Navigation principale
FloatingNav.create('main', [
    {
        icon: FloatingNav.constructor.icons.home,
        text: 'Accueil',
        href: '/',
        tooltip: 'Retour à l\'accueil'
    },
    {
        icon: FloatingNav.constructor.icons.search,
        text: 'Recherche',
        onClick: () => console.log('Recherche clicked'),
        tooltip: 'Rechercher'
    },
    {
        icon: FloatingNav.constructor.icons.user,
        text: 'Profil',
        href: '/profile',
        tooltip: 'Mon profil'
    },
    {
        icon: FloatingNav.constructor.icons.settings,
        text: 'Paramètres',
        href: '/settings',
        tooltip: 'Paramètres'
    }
], {
    position: 'bottom-center',
    theme: 'auto',
    showLabels: false,
    blur: 25,
    borderRadius: 25
});

// Navigation secondaire
FloatingNav.create('social', [
    {
        icon: '❤️',
        tooltip: 'Favoris',
        onClick: () => console.log('Favoris'),
        indicator: true
    },
    {
        icon: '📧',
        tooltip: 'Messages',
        onClick: () => console.log('Messages')
    },
    {
        icon: '🔔',
        tooltip: 'Notifications',
        onClick: () => console.log('Notifications'),
        indicator: true
    }
], {
    position: 'top-right',
    theme: 'dark',
    autoHide: true,
    hideDelay: 5000
});

// Navigation avec emoji
FloatingNav.create('tools', [
    { icon: '🏠', tooltip: 'Accueil', href: '/' },
    { icon: '📱', tooltip: 'Apps', onClick: () => {} },
    { icon: '⚙️', tooltip: 'Réglages', href: '/settings' },
    { icon: '👤', tooltip: 'Profil', href: '/profile' }
], {
    position: 'left-center',
    theme: 'light',
    iconSize: 20,
    gap: 8
});
*/