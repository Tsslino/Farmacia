// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideInterval = 4000; // Troca a imagem a cada 4 segundos
    let autoSlideTimer;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (indicators[i]) indicators[i].classList.remove('active');
        });

        slides[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, slideInterval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoSlide();
        });
    });

    if (slides.length > 0) {
        startAutoSlide();
    }
});
    // 1. Configuração do Menu Mobile
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fecha o menu ao clicar em um link
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

// 2. Verificação de Horário de Funcionamento
    verificarStatusFuncionamento();
    // Atualiza a cada 1 minuto
    setInterval(verificarStatusFuncionamento, 60000);
});

function verificarStatusFuncionamento() {
    const dataAtual = new Date();
    // Ajusta para o fuso horário do Brasil (Brasília / Pará)
    const horaAtual = dataAtual.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"});
    const dataBrasil = new Date(horaAtual);
    
    const diaDaSemana = dataBrasil.getDay(); // 0 = Domingo, 1 = Segunda... 6 = Sábado
    const horas = dataBrasil.getHours();
    const minutos = dataBrasil.getMinutes();
    const horaDecimal = horas + (minutos / 60);
    
    const statusBar = document.getElementById('status-funcionamento');
    const statusText = statusBar.querySelector('.status-text');
    
    let estaAberto = false;

    // Segunda a Sábado (1 a 6): 07:00–13:00 e 14:30–20:00
    if (diaDaSemana >= 1 && diaDaSemana <= 6) {
        if ((horaDecimal >= 7 && horaDecimal < 13) || (horaDecimal >= 14.5 && horaDecimal < 20)) {
            estaAberto = true;
        }
    } 
    // Domingo (0): 07:30–12:00
    else if (diaDaSemana === 0) {
        if (horaDecimal >= 7.5 && horaDecimal < 12) {
            estaAberto = true;
        }
    }

    if (estaAberto) {
        statusBar.className = 'status-bar aberto';
        statusText.innerHTML = '<i class="fas fa-door-open"></i> ABERTO AGORA - Venha nos visitar ou peça pelo WhatsApp!';
    } else {
        statusBar.className = 'status-bar fechado';
        statusText.innerHTML = '<i class="fas fa-door-closed"></i> FECHADO NO MOMENTO - Confira nossos horários na seção de localização';
    }
}