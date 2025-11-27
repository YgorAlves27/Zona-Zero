// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let autoSlideInterval;

    // Função para mostrar o slide atual
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    // Função para o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Função para o slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Iniciar slideshow automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }

    // Eventos para os botões
    document.getElementById('next').addEventListener('click', nextSlide);
    document.getElementById('prev').addEventListener('click', prevSlide);

    // Iniciar automaticamente
    startAutoSlide();
});