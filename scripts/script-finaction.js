// КНОПКА МЕНЮ СВЕРХУ

function openModal() {
    const modal = document.getElementById('modalOverlay2');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // запрещаем скролл страницы
    }
}

function closeModal() {
    const modal = document.getElementById('modalOverlay2');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // возвращаем скролл
    }
}

// Закрытие по крестику
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

// Закрытие по клику на фон (overlay)
document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay2 = document.getElementById('modalOverlay2');
    if (modalOverlay2) {
        modalOverlay2.addEventListener('click', function(e) {
            if (e.target === modalOverlay2) {
                closeModal();
            }
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay2 && modalOverlay2.classList.contains('active')) {
            closeModal();
        }
    });
});


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


//ВОЗВРАЩАЕМ HEADER ПРИ СКРОЛЛЕ ВВЕРХ
(function() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollTop = 0;
    let headerHeight = header.offsetHeight; // высота header

    // Функция для применения фиксации
    function fixHeader() {
        if (!header.classList.contains('header-fixed')) {
            header.classList.add('header-fixed');
            document.body.classList.add('header-fixed-padding');
        }
    }

    // Функция для снятия фиксации
    function unfixHeader() {
        if (header.classList.contains('header-fixed')) {
            header.classList.remove('header-fixed');
            document.body.classList.remove('header-fixed-padding');
        }
    }

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Определяем направление: вверх (scrollTop < lastScrollTop) и не в самом верху
        if (scrollTop < lastScrollTop && scrollTop > 0) {
            // Скроллим ВВЕРХ и мы не в самом верху – фиксируем header
            fixHeader();
        } 
        else if (scrollTop > lastScrollTop && header.classList.contains('header-fixed')) {
            // Скроллим ВНИЗ – снимаем фиксацию (header снова становится статическим)
            unfixHeader();
        }

        // Если дошли до самого верха – снимаем фиксацию, чтобы header встал на своё место
        if (scrollTop === 0) {
            unfixHeader();
        }

        lastScrollTop = scrollTop;
    });

    // Если страница уже прокручена вниз (например, перезагрузка), не фиксируем сразу
    // Но можно по желанию: если при загрузке страница прокручена, а пользователь скроллит вверх – сработает.
})();


//КВАДРАТ ВОЗЛЕ КУРСОРА
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-circle');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;
    let currentScale = 1;
    let targetScale = 1;
    const smoothFactor = 0.06;
    const scaleSmooth = 0.2;

    // -------- Функция определения цвета фона под курсором ----------
    function getBackgroundColor(element) {
        // Если дошли до body, а фона нет — возвращаем белый
        if (!element || element === document.body) {
            return getComputedStyle(document.body).backgroundColor;
        }
        const bgColor = getComputedStyle(element).backgroundColor;
        // Если цвет прозрачный (rgba(0,0,0,0) или transparent), идём к родителю
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            return getBackgroundColor(element.parentElement);
        }
        return bgColor;
    }

    function getLuminance(rgbColor) {
        // rgb(255, 99, 71) или rgba(255,99,71,1)
        const match = rgbColor.match(/\d+/g);
        if (!match) return 128;
        let [r, g, b] = match.map(Number);
        // Формула яркости для восприятия
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function updateCursorColor(x, y) {
        // Получаем элемент под курсором (игнорируя сам кружок, т.к. у него pointer-events: none)
        const elem = document.elementsFromPoint(x, y)[0];
        if (!elem) return;
        const bgColor = getBackgroundColor(elem);
        const luminance = getLuminance(bgColor);
        // Если фон тёмный — кружок светлый, и наоборот
        if (luminance < 128) {
            cursor.style.backgroundColor = 'var(--light)';
        } else {
            cursor.style.backgroundColor = 'var(--dark)';
        }
    }

    // -------- Анимация движения ----------
    function animate() {
        circleX += (mouseX - circleX) * smoothFactor;
        circleY += (mouseY - circleY) * smoothFactor;
        currentScale += (targetScale - currentScale) * scaleSmooth;
        cursor.style.transform = `translate3d(${circleX - 10}px, ${circleY - 10}px, 0) scale(${currentScale})`;
        requestAnimationFrame(animate);
    }

    // -------- События мыши ----------
    document.addEventListener('mousemove', function(e) {
        if (cursor.style.opacity !== '1') cursor.style.opacity = '1';
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Обновляем цвет кружка в зависимости от того, над чем курсор
        updateCursorColor(e.clientX, e.clientY);
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

    // Наведение на кнопки (скрытие кружка)
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => targetScale = 0);
        button.addEventListener('mouseleave', () => targetScale = 1);
    });

    // Наведение на ссылки (скрытие кружка)
    const links = document.querySelectorAll('a');
    links.forEach(link => {
    link.addEventListener('mouseenter', () => targetScale = 0);
    link.addEventListener('mouseleave', () => targetScale = 1);
});

    // Запускаем анимацию
    animate();
});


// МОДАЛЬНОЕ ОКНО ДЛЯ КНОПОК "СВЯЗАТЬСЯ" И ЗАПРОСИТЬ ДЕМО
document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const form = document.getElementById('contactForm');
    const formTextElement = document.querySelector('.form-text'); // элемент с текстом

    // Тексты для разных кнопок
    const texts = {
        connect: 'При возникновении вопросов, пожалуйста, оставьте свои контактные данные и сообщение. Вернемся к вам с обратной связью в ближайшее время.',
        presentation: 'Для демонстрации продуктов, пожалуйста, оставьте свои контактные данные, и при необходимости напишите свои пожелания. Мы свяжемся с вами в ближайшее время для согласования удобного времени и формата.'
    };

    // Функция открытия модального окна с нужным текстом
    function openModal(text) {
        if (formTextElement) {
            formTextElement.textContent = text;
        }
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    // Функция закрытия модалки
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        // При желании можно сбросить форму:
        // form.reset();
    }

    // Обработчики для кнопок .connect-btn
    const connectBtns = document.querySelectorAll('.connect-btn');
    connectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(texts.connect);
        });
    });

    // Обработчики для кнопок .presentation-btn
    const presentationBtns = document.querySelectorAll('.presentation-btn');
    presentationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(texts.presentation);
        });
    });

    // Обработчики для кнопок .demo-btn
    const demoBtns = document.querySelectorAll('.demo-btn');
    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(texts.presentation);
        });
    });

    // Закрытие по крестику
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клику на оверлей
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Обработка отправки формы (остаётся без изменений)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            console.log('Отправка данных:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            alert('Форма отправлена! (демо)');
            // closeModal(); // при необходимости закрыть после отправки
        });
    }
});














// Анимация печати текста "finaction" в стиле терминала
(function() {
    const titleElement = document.getElementById('terminal-title');
    const subtitleElement = document.getElementById('terminal-subtitle');
    if (!titleElement || !subtitleElement) return;

    const fullTitle = 'finaction';
    const fullSubtitle = 'автоматизируй финансовый анализ';

    // Функция для точного измерения ширины текста с учётом стилей элемента
    function measureTextWidth(element, text) {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'nowrap';
        const computed = window.getComputedStyle(element);
        span.style.fontSize = computed.fontSize;
        span.style.fontWeight = computed.fontWeight;
        span.style.letterSpacing = computed.letterSpacing;
        span.style.fontFamily = computed.fontFamily;
        span.textContent = text;
        document.body.appendChild(span);
        const width = span.offsetWidth;
        document.body.removeChild(span);
        return width;
    }

    function createWrapperAndCursor(cursorColor, fixedWidth) {
        const wrapper = document.createElement('span');
        wrapper.className = 'terminal-wrapper';
        wrapper.style.width = fixedWidth + 'px';
        wrapper.style.display = 'inline-block';
        const textSpan = document.createElement('span');
        textSpan.className = 'terminal-text';
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'terminal-cursor';
        cursorSpan.style.backgroundColor = cursorColor;
        wrapper.appendChild(textSpan);
        wrapper.appendChild(cursorSpan);
        return { wrapper, textSpan, cursorSpan };
    }

    // Измеряем итоговую ширину "finaction" – она будет фиксированной для обоих заголовков
    const fixedWidth = measureTextWidth(titleElement, fullTitle);

    // Анимация для заголовка
    const titleWrap = createWrapperAndCursor('#ECECEC', fixedWidth);
    titleElement.appendChild(titleWrap.wrapper);
    let titleCurrent = 0;

    function typeTitle() {
        if (titleCurrent < fullTitle.length) {
            titleWrap.textSpan.textContent += fullTitle[titleCurrent];
            titleCurrent++;
            setTimeout(typeTitle, 80);
        } else {
            // Убираем курсор у заголовка
            if (titleWrap.cursorSpan && titleWrap.cursorSpan.parentNode) {
                titleWrap.cursorSpan.remove();
            }
            startSubtitleTyping();
        }
    }

    function startSubtitleTyping() {
        // Для подзаголовка используем ТУ ЖЕ ширину (fixedWidth)
        const subWrap = createWrapperAndCursor('#F0FF97', fixedWidth);
        subtitleElement.appendChild(subWrap.wrapper);
        let subCurrent = 0;

        function typeSubtitle() {
            if (subCurrent < fullSubtitle.length) {
                subWrap.textSpan.textContent += fullSubtitle[subCurrent];
                subCurrent++;
                setTimeout(typeSubtitle, 30);
            } else {
                // После завершения печати меняем скорость мигания курсора
                if (subWrap.cursorSpan) {
                    subWrap.cursorSpan.style.animation = 'blink 1s step-end infinite';
                }

                // ★ ЗАПУСКАЕМ АНИМАЦИЮ БУЛЛИТОВ ★
            animateBullits();
            }
        }
        typeSubtitle();
    }

    setTimeout(typeTitle, 300);
})();

// Функция анимации буллитов
function animateBullits() {
    const bullit1 = document.querySelector('.hero-bullit1');
    const bullit2 = document.querySelector('.hero-bullit2');
    if (!bullit1 || !bullit2) return;
    
    // Анимация первого блока
    bullit1.classList.add('animate');
    
    // После завершения анимации уголков (0.4с) и текста (1с) запускаем второй блок
    // Для плавности стартуем второй блок через 0.6с после начала первого
    setTimeout(() => {
        bullit2.classList.add('animate');
    }, 600);
}

// АНИМАЦЯИ ПЛАВНОГО ПОЯВЛЕНИЯ ТЕКСТА "УБИРАЕМ РУТИНУ.."
document.addEventListener('DOMContentLoaded', () => {
  const sectionTitle = document.querySelector('.section-title');
  
  // Настройки наблюдателя: элемент считается видимым, когда 20% его площади попало в экран
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sectionTitle.classList.add('revealed');
        observer.unobserve(sectionTitle); // анимация только один раз
      }
    });
  }, { threshold: 0.5 }); // можно менять 0.2 → 0.3 для более раннего/позднего срабатывания
  
  observer.observe(sectionTitle);
});

