// Classe pour gérer les animations au défilement
class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll]');
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        // Vérifier si l'utilisateur préfère les mouvements réduits
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            this.elements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'none';
            });
            return;
        }

        // Initialiser les éléments
        this.elements.forEach(element => {
            element.style.opacity = '0';
            this.checkPosition(element);
        });

        // Ajouter les écouteurs d'événements
        window.addEventListener('scroll', () => {
            this.elements.forEach(element => this.checkPosition(element));
        });

        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
        });
    }

    checkPosition(element) {
        const positionFromTop = element.getBoundingClientRect().top;
        
        // Ajouter une marge pour déclencher l'animation plus tôt
        const offset = 50;

        if (positionFromTop - this.windowHeight + offset <= 0) {
            const scrollType = element.getAttribute('data-scroll');
            const delay = element.getAttribute('data-scroll-delay') || 0;

            setTimeout(() => {
                element.style.opacity = '1';
                element.setAttribute('data-scroll', 'in');

                switch (scrollType) {
                    case 'fade-in':
                        element.style.animation = 'fadeIn 1s ease forwards';
                        break;
                    case 'slide-left':
                        element.style.animation = 'slideInLeft 1s ease forwards';
                        break;
                    case 'slide-right':
                        element.style.animation = 'slideInRight 1s ease forwards';
                        break;
                    case 'scale':
                        element.style.animation = 'scaleIn 1s ease forwards';
                        break;
                    default:
                        element.style.transform = 'translateY(0)';
                }
            }, delay * 100);
        }
    }
}

// Initialiser les animations au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimator();

    // Ajouter les classes d'animation aux éléments
    const addAnimationClasses = () => {
        // Hero sections
        document.querySelectorAll('.hero').forEach((el, index) => {
            el.setAttribute('data-scroll', 'fade-in');
            el.setAttribute('data-scroll-delay', '1');
        });

        // Titres de section
        document.querySelectorAll('.section-title').forEach((el, index) => {
            el.setAttribute('data-scroll', 'fade-in');
            el.setAttribute('data-scroll-delay', '2');
        });

        // Cartes de projet
        document.querySelectorAll('.project-card').forEach((el, index) => {
            el.setAttribute('data-scroll', 'fade-in');
            el.setAttribute('data-scroll-delay', (index % 3 + 2).toString());
            el.classList.add('card-hover');
        });

        // Images
        document.querySelectorAll('.project-image img').forEach(el => {
            el.classList.add('img-hover');
        });

        // Boutons
        document.querySelectorAll('.filter-btn, .project-link').forEach(el => {
            el.classList.add('btn-hover');
        });

        // Timeline items
        document.querySelectorAll('.timeline-item').forEach((el, index) => {
            el.setAttribute('data-scroll', index % 2 === 0 ? 'slide-left' : 'slide-right');
            el.setAttribute('data-scroll-delay', '2');
        });

        // Membres de l'équipe
        document.querySelectorAll('.team-member').forEach((el, index) => {
            el.setAttribute('data-scroll', 'scale');
            el.setAttribute('data-scroll-delay', (index % 3 + 1).toString());
        });
    };

    addAnimationClasses();
}); 