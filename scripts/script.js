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
    document.getElementById("modal").style.top = "0px";
}

function closeModal() {
    document.getElementById("modal").style.top = "-400px";
}


