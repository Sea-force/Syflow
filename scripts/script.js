// АНИМАЦИЯ СКОБОК
document.addEventListener("DOMContentLoaded", function() {
    const bracketUp = document.querySelector('.bracket-up');
    const bracketDown = document.querySelector('.bracket-down');
    // Ждем небольшую паузу перед добавлением класса
    setTimeout(() => {
        bracketUp.classList.add('animate');
        bracketDown.classList.add('animate');
    }, 100);  // 100 мс, чтобы анимация была заметной
});

// МЫ СОЗДАЕМ
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const highlight = document.querySelector('.highlight'); // Получаем элемент с классом highlight
    // Задержка перед добавлением класса для заголовка (чтобы анимация сработала)
    const productsbtn = document.querySelector('.products-btn');


    setTimeout(function() {
        heroTitle.classList.add('loaded');

        setTimeout(function() {
         heroDescription.classList.add('loaded');

            setTimeout(function() {
                highlight.classList.add('loaded'); // Добавляем класс для анимации фона

                setTimeout(function() {
                    productsbtn.classList.add('loaded'); // Добавляем класс для анимации фона

                }, 1000); // Задержка 1 секунда 
            
            }, 1000); // Задержка 2 секунды (равна продолжительности анимации заголовка)

        }, 1000); // Задержка после анимации hero-title

  }, 500); // Начальная задержка 500ms
});

// Smooth Scroll to Our Products Section
      
       const links = document.querySelectorAll(".products-btn");

       for (const link of links) {
       link.addEventListener("click", clickHandler);
       }

       function clickHandler(e) {
       e.preventDefault();
       const href = this.getAttribute("href");

       document.querySelector(href).scrollIntoView({
           behavior: "smooth"
       });
       }

// НАШИ ПРОДУКТЫ (перенос секции)

    // Находим элементы один раз для оптимизации
    const header = document.querySelector('.products-header');
    const title = header.querySelector('.products-title');
    const productsBox = document.querySelector('.products-box');
    const productsItem2 = document.querySelector('.products-item2');
    const productsjusttext = document.querySelector('.products-justtext');

    function moveProductItem2() {
        const width = window.innerWidth;

        if (width < 1080) {
            // Перемещаем products-item2 внутрь products-header после products-title, если там его ещё нет
            if (productsItem2.parentNode !== header) {
                header.insertBefore(productsItem2, title.nextSibling);
            }
        } else {
            // Возвращаем products-item2 обратно в products-box, если там его нет
            if (productsItem2.parentNode !== productsBox) {
                productsBox.appendChild(productsItem2);
            }
        }
    }

// Запускаем при загрузке страницы
moveProductItem2();

// Добавляем обработчик изменения размера окна
window.addEventListener('resize', moveProductItem2);


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



// FAQ - РАСКРЫТИЕ ВОПРОСОВ
// FAQ - РАСКРЫТИЕ ВОПРОСОВ
document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion');
            const button = accordionItem.querySelector('.accordion-btn');
            const question = accordionItem.querySelector('.question');
            const answer = accordionItem.querySelector('.answer');

            const isActive = answer.classList.contains('active');

            if (isActive) {
                // Закрываем
                answer.classList.remove('active');
                answer.style.height = '0px';
                answer.style.marginBottom = '0px';
                answer.style.paddingBottom = '0px'; // сбрасываем padding
                button.classList.remove('active');
                question.classList.remove('active');
            } else {
                // Открываем
                answer.classList.add('active');
                answer.style.paddingBottom = '12px'; // добавляем padding при открытии
                // Временно даём блоку занять натуральную высоту
                answer.style.height = 'auto';
                // Получаем полную высоту контента
                const fullHeight = answer.scrollHeight;
                // Сбрасываем высоту для анимации
                answer.style.height = '0px';
                // Принудительный перерасчёт
                void answer.offsetHeight;
                // Устанавливаем целевую высоту
                answer.style.height = fullHeight + 'px';

                button.classList.add('active');
                question.classList.add('active');

                // Отладка: проверяем, применился ли padding-bottom
                console.log('margin-bottom после установки:', window.getComputedStyle(answer).paddingBottom);
                console.log('fullHeight:', fullHeight);
            }
        });
    });
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
    const presentationBtns = document.querySelectorAll('.presentation-btn777'); //СПЕЦИАЛЬНО ДОБАВИЛ 777, ЧТОБЫ НЕ РАБОТАЛО
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

//АНИМАЦИЯ ПЛАВНОГО ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
document.addEventListener('DOMContentLoaded', () => {
    // Для линии (если ещё не добавили)
    const line = document.querySelector('.line');
    if (line) {
        const observerLine = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    line.classList.add('line--visible');
                    observerLine.unobserve(line);
                }
            });
        }, { threshold: 1.0 });
        observerLine.observe(line);
    }

    // Для текста .transition-text
    const transitionText = document.querySelector('.transition-text');
    if (transitionText) {
        const observerText = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    transitionText.classList.add('transition-text--visible');
                    observerText.unobserve(transitionText);
                }
            });
        }, { threshold: 0.9 });
        observerText.observe(transitionText);
    }
});

//ПЛАВНОЕ ПОЯВЛЕНИЕ - ПОЧЕМУ НАМ ДОВЕРЯЮТ
document.addEventListener('DOMContentLoaded', () => {
    // Выбираем все четыре блока
    const trustBlocks = document.querySelectorAll(
        '.trust-textblock, .trust-textblock2, .trust-textblock3, .trust-textblock4'
    );
    
    if (trustBlocks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('trust-visible');
                    observer.unobserve(entry.target); // анимация один раз
                }
            });
        }, { threshold: 0.9 }); // 90% видимости
        
        trustBlocks.forEach(block => observer.observe(block));
    }
});

//ПЛАВНОЕ ПОЯВЛЕНИЕ - PRODUCTS ITEM
document.addEventListener('DOMContentLoaded', () => {
    const productsItems = document.querySelectorAll('.products-item');
    if (!productsItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('products-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.9 });

    productsItems.forEach(item => observer.observe(item));
});