// ВОСПРОИЗВЕДЕНИЕ ВИДЕО С ДАШБОРДОМ ПРИ ВИДИМОСТИ ЭКРАНА НА 70%

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    if (!video) return;

    // Настройка наблюдателя: порог 0.7 соответствует 70% видимости
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const targetVideo = entry.target;
            if (entry.isIntersecting) {
                targetVideo.play().catch(e => console.log("Автовоспроизведение заблокировано:", e));
            } else {
                targetVideo.pause();
            }
        });
    }, { threshold: 0.7 });

    observer.observe(video);
});

// КРУЖОК ВОЗЛЕ КУРСОРА
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-circle');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;   // реальная позиция курсора
    let circleX = 0, circleY = 0; // текущая позиция кружка

    let currentScale = 1;       // текущий масштаб кружка
    let targetScale = 1;        // желаемый масштаб (1 = норма, 0 = невидим)

    const smoothFactor = 0.06;    // плавность: чем меньше, тем сильнее отставание (0.05–0.2)
    const scaleSmooth = 0.2;     // плавность изменения масштаба

    // Функция анимации (вызывается на каждый кадр)
    function animate() {
        // Плавное движение позиции
        circleX += (mouseX - circleX) * smoothFactor;
        circleY += (mouseY - circleY) * smoothFactor;

        // Плавное изменение масштаба
        currentScale += (targetScale - currentScale) * scaleSmooth;

        // Применяем трансформацию: позиция + масштаб
        cursor.style.transform = `translate3d(${circleX - 10}px, ${circleY - 10}px, 0) scale(${currentScale})`;

        requestAnimationFrame(animate);
    }

    // Отслеживаем движение мыши
    document.addEventListener('mousemove', function(e) {
        if (cursor.style.opacity !== '1') {
            cursor.style.opacity = '1';
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Скрываем кружок при уходе с окна
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });

    // === НАВЕДЕНИЕ НА КНОПКИ ===
    // Находим все элементы button на странице
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            targetScale = 0;   // при наведении уменьшаем до нуля
        });
        button.addEventListener('mouseleave', () => {
            targetScale = 1;   // уходим — возвращаем к 1
        });
    });

    // Запускаем анимацию
    animate();
});


// КНОПКА СВЯЗАТЬСЯ
document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const connectButton = document.querySelector('.connect-btn'); // ваша кнопка
    const form = document.getElementById('contactForm');

    // Функция открытия модалки
    function openModal() {
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    // Функция закрытия модалки
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        // опционально: сброс формы
        // form.reset();
    }

    // Открытие по клику на .connect-btn
    if (connectButton) {
        connectButton.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    // Закрытие по крестику
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клику на оверлей (затемнённую область)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Закрытие по клавише ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Обработка отправки формы (заглушка)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Здесь можно собрать данные и отправить на сервер
        const formData = new FormData(form);
        console.log('Отправка данных:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        alert('Форма отправлена! (демо)');
        // closeModal(); // раскомментируйте, если хотите закрывать после отправки
    });
});