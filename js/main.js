document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initMobileMenu();
    initHeaderScroll();
});

// Fonction pour initialiser le sélecteur de thème
function initThemeSwitcher() {
    const themeSwitcher = document.createElement('button');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.setAttribute('aria-label', 'Changer le thème');
    
    updateThemeSwitcherIcon(themeSwitcher);
    document.body.appendChild(themeSwitcher);
    
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Appliquer le nouveau thème
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Mettre à jour l'icône
        updateThemeSwitcherIcon(themeSwitcher);
    });
    
    // Écouter les changements de préférence système
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeSwitcherIcon(themeSwitcher);
        }
    });
}

// Fonction pour mettre à jour l'icône du sélecteur de thème
function updateThemeSwitcherIcon(switcher) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    switcher.innerHTML = currentTheme === 'dark' 
        ? `<svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
           </svg>`
        : `<svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
           </svg>`;
}

// Fonction pour gérer le menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuPanel = document.querySelector('#menu-panel');
    
    if (!menuToggle || !menuPanel) return;
    
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuPanel.hidden = isExpanded;
        
        // Animer les lignes du menu
        menuToggle.classList.toggle('active');
        
        // Empêcher le défilement du body quand le menu est ouvert
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (event) => {
        const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        const clickedOutside = !menuToggle.contains(event.target) && !menuPanel.contains(event.target);
        
        if (isMenuOpen && clickedOutside) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuPanel.hidden = true;
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Fonction pour gérer le header au défilement
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Défilement vers le bas
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Défilement vers le haut
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
} 