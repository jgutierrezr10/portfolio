// Seleccionamos todos los enlaces de la barra de navegación
const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        // Prevenimos el salto brusco por defecto de HTML
        e.preventDefault();
        
        // Obtenemos el ID de la sección a la que queremos ir (ej: #proyectos)
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Hacemos el scroll suave
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});