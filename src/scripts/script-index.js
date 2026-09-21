document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // Desktop : Ajout du trait très proche du texte
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.remove("text-gray-600");
        // 'pb-0.5' réduit l'espace au minimum sous le texte
        link.classList.add("text-[#34A7DE]", "font-semibold", "border-b-3", "border-[#34A7DE]", "pb-0.5");
      }
    });

    // Mobile
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.remove("text-gray-600");
        link.classList.add("text-[#34A7DE]", "font-semibold", "border-l-4", "border-[#34A7DE]", "bg-blue-50");
      }
    });
  });



  


    
    AOS.init({
      once: true, // L'animation ne se joue qu'une seule fois
      mirror: false
    });
  


    const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Calcul dynamique du défilement (largeur d'un élément + gap)
const getScrollStep = () => {
    const card = slider.querySelector('div');
    return card.clientWidth + 32; // 32 correspond au gap-8 de Tailwind
};

nextBtn.addEventListener('click', () => {
    slider.scrollLeft += getScrollStep();
});

prevBtn.addEventListener('click', () => {
    slider.scrollLeft -= getScrollStep();
});

// Auto-hide des flèches au début et à la fin
slider.addEventListener('scroll', () => {
    const isAtStart = slider.scrollLeft <= 10;
    const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10;
    
    prevBtn.style.visibility = isAtStart ? 'hidden' : 'visible';
    nextBtn.style.visibility = isAtEnd ? 'hidden' : 'visible';
});





    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        const content = modal.querySelector('.bg-white');
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        
        setTimeout(() => {
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }, 50);
        
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        const content = modal.querySelector('.bg-white');
        
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.remove('opacity-100', 'pointer-events-auto');
            modal.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Fermer en cliquant à l'extérieur
    document.querySelectorAll('[id^="modal"]').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('[id^="modal"]').forEach(modal => {
                if (!modal.classList.contains('opacity-0')) {
                    closeModal(modal.id);
                }
            });
        }
    });



      document.addEventListener("DOMContentLoaded", function() {
        // ============================================
        // 1. NAVIGATION ACTIVE
        // ============================================
        const currentPath = window.location.pathname.split("/").pop() || "index.html";

        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.remove("text-gray-600");
                link.classList.add("text-[#34A7DE]", "font-semibold", "border-b-3", "border-[#34A7DE]", "pb-0.5");
            }
        });

        const mobileLinks = document.querySelectorAll(".mobile-nav-link");
        mobileLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.remove("text-gray-600");
                link.classList.add("text-[#34A7DE]", "font-semibold", "border-l-4", "border-[#34A7DE]", "bg-blue-50");
            }
        });

        // ============================================
        // 2. AOS INIT
        // ============================================
        if (typeof AOS !== 'undefined') {
            AOS.init({
                once: true,
                mirror: false
            });
        }

        // ============================================
        // 3. GALERIE SLIDER
        // ============================================
        const slider = document.getElementById('slider');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        const dots = document.querySelectorAll('[id^="dot-"]');

        if (slider && prevBtn && nextBtn) {
            const getScrollStep = () => {
                const card = slider.querySelector('div');
                if (!card) return 320;
                return card.clientWidth + 24; // 24 = gap-6
            };

            // Navigation
            nextBtn.addEventListener('click', () => {
                slider.scrollLeft += getScrollStep();
                updateDots();
            });

            prevBtn.addEventListener('click', () => {
                slider.scrollLeft -= getScrollStep();
                updateDots();
            });

            // Mise à jour des indicateurs
            const updateDots = () => {
                if (!dots.length) return;
                const scrollPos = slider.scrollLeft;
                const step = getScrollStep();
                const currentIndex = Math.round(scrollPos / step);
                
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.remove('bg-gray-300');
                        dot.classList.add('bg-[#34A7DE]', 'w-6');
                    } else {
                        dot.classList.remove('bg-[#34A7DE]', 'w-6');
                        dot.classList.add('bg-gray-300');
                    }
                });
            };

            // Auto-hide des flèches
            const updateButtons = () => {
                const isAtStart = slider.scrollLeft <= 10;
                const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10;
                
                prevBtn.style.visibility = isAtStart ? 'hidden' : 'visible';
                nextBtn.style.visibility = isAtEnd ? 'hidden' : 'visible';
            };

            // Événements
            slider.addEventListener('scroll', () => {
                updateButtons();
                updateDots();
            });

            // Initialisation
            setTimeout(() => {
                updateButtons();
                updateDots();
            }, 100);

            // Mise à jour au redimensionnement
            window.addEventListener('resize', () => {
                updateButtons();
                updateDots();
            });

            // Défilement automatique (optionnel)
            let autoScroll = setInterval(() => {
                if (slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 10) {
                    slider.scrollLeft += getScrollStep();
                } else {
                    slider.scrollLeft = 0;
                }
                updateDots();
            }, 5000);

            // Arrêt auto-scroll au survol
            slider.addEventListener('mouseenter', () => {
                clearInterval(autoScroll);
            });

            slider.addEventListener('mouseleave', () => {
                autoScroll = setInterval(() => {
                    if (slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 10) {
                        slider.scrollLeft += getScrollStep();
                    } else {
                        slider.scrollLeft = 0;
                    }
                    updateDots();
                }, 5000);
            });
        }

        // ============================================
        // 4. MODALES
        // ============================================
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;
            const content = modal.querySelector('.bg-white');
            
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.classList.add('opacity-100', 'pointer-events-auto');
            
            setTimeout(() => {
                if (content) {
                    content.classList.remove('scale-95');
                    content.classList.add('scale-100');
                }
            }, 50);
            
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;
            const content = modal.querySelector('.bg-white');
            
            if (content) {
                content.classList.remove('scale-100');
                content.classList.add('scale-95');
            }
            
            setTimeout(() => {
                modal.classList.remove('opacity-100', 'pointer-events-auto');
                modal.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Fermeture des modales
        document.querySelectorAll('[id^="modal"]').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this.id);
                }
            });
        });

        // Touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('[id^="modal"]').forEach(modal => {
                    if (!modal.classList.contains('opacity-0')) {
                        closeModal(modal.id);
                    }
                });
            }
        });

        // ============================================
        // 5. EXPOSE LES FONCTIONS GLOBALEMENT
        // ============================================
        window.openModal = openModal;
        window.closeModal = closeModal;
    });