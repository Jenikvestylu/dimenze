document.addEventListener('DOMContentLoaded', () => {
    // Reference na DOM elementy
    const parallaxLayers = document.querySelectorAll('.layer');
    const cursorFollower = document.querySelector('.cursor-follower');
    const portals = document.querySelectorAll('.portal');
    const title = document.querySelector('.title');
    
    // Paralaxní efekt při pohybu myši
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Aktualizace vlastního kurzoru
        cursorFollower.style.left = `${x}px`;
        cursorFollower.style.top = `${y}px`;
        
        // Paralaxní efekt pro vrstvy
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            
            // Výpočet pozice vrstvy podle pohybu myši
            const xPos = (window.innerWidth / 2 - x) * speed;
            const yPos = (window.innerHeight / 2 - y) * speed;
            
            layer.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
        
        // Efekt perspektivy pro nadpis
        if (title) {
            const titleXPos = (window.innerWidth / 2 - x) * 0.02;
            const titleYPos = (window.innerHeight / 2 - y) * 0.02;
            title.style.transform = `translate(${titleXPos}px, ${titleYPos}px)`;
        }
    });
    
    // Animovaný přechod mezi stránkami pomocí portálů
    portals.forEach(portal => {
        portal.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            
            // Animace přechodu
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '0';
            
            // Přesměrování po dokončení animace
            setTimeout(() => {
                window.location.href = destination;
            }, 1000);
        });
    });
    
    // Animace při načtení stránky
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.5s ease';
        document.body.style.opacity = '1';
    }, 200);
    
    // Interaktivní prvky na Dimenzi 2
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(elem => {
        // Náhodná počáteční pozice
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        const randomRotate = Math.random() * 5 - 2.5;
        
        elem.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        
        // Animace při načtení
        setTimeout(() => {
            elem.style.transition = 'transform 2s ease, background 0.5s ease';
        }, 100);
    });
    
    // Vizuální experimenty na Dimenzi 3
    const experiments = document.querySelectorAll('.experiment');
    experiments.forEach((exp, index) => {
        // Postupné zobrazení s časovým odstupem
        exp.style.opacity = '0';
        setTimeout(() => {
            exp.style.transition = 'all 1s ease';
            exp.style.opacity = '1';
        }, 500 + index * 300);
    });
    
    // Alternativní navigace pomocí klávesnice
    document.addEventListener('keydown', (e) => {
        // Šipka doleva - předchozí stránka
        if (e.key === 'ArrowLeft') {
            navigateToPage('previous');
        }
        // Šipka doprava - další stránka
        else if (e.key === 'ArrowRight') {
            navigateToPage('next');
        }
        // Escape - domů
        else if (e.key === 'Escape') {
            navigateToPage('home');
        }
    });
    
    // Funkce pro navigaci mezi stránkami
    function navigateToPage(direction) {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop();
        
        let destination = '';
        
        if (direction === 'home' || currentPage === 'dimension2.html' && direction === 'previous' || 
            currentPage === 'dimension3.html' && direction === 'previous' && currentPage !== 'index.html') {
            destination = 'index.html';
        } else if (direction === 'next' && currentPage === 'index.html' || 
                  direction === 'previous' && currentPage === 'dimension3.html') {
            destination = 'dimension2.html';
        } else if (direction === 'next' && currentPage === 'dimension2.html' || 
                  direction === 'next' && currentPage === 'index.html' && nextPageAvailable('dimension3.html')) {
            destination = 'dimension3.html';
        }
        
        if (destination !== '') {
            // Animace přechodu
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '0';
            
            // Přesměrování po dokončení animace
            setTimeout(() => {
                window.location.href = destination;
            }, 1000);
        }
    }
    
    // Kontrola dostupnosti stránky
    function nextPageAvailable(page) {
        // Tato funkce by mohla provést AJAX kontrolu, zda stránka existuje
        // Pro jednoduchost vrátí true
        return true;
    }
    
    // Zabránění zobrazení výchozího kurzoru
    document.body.style.cursor = 'none';
});