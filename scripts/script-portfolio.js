// Анимация печати текста "кредитный портфель" в стиле терминала
(function () {

    const titleElement = document.getElementById("terminal-title2");
    const subtitleElement = document.getElementById("terminal-subtitle2");

    if (!titleElement || !subtitleElement) return;

    const fullTitle = "кредитный портфель";
    const fullSubtitle = "автоматизируй финансовый анализ";

    // На всякий случай очищаем элементы
    titleElement.textContent = "";
    subtitleElement.textContent = "";

    // ============================================
    // Измерение ширины текста
    // ============================================

    function measureTextWidth(element, text) {

        const span = document.createElement("span");

        const style = getComputedStyle(element);

        span.style.position = "absolute";
        span.style.visibility = "hidden";
        span.style.whiteSpace = "nowrap";

        span.style.fontFamily = style.fontFamily;
        span.style.fontSize = style.fontSize;
        span.style.fontWeight = style.fontWeight;
        span.style.letterSpacing = style.letterSpacing;
        span.style.textTransform = style.textTransform;

        span.textContent = text;

        document.body.appendChild(span);

        const width = span.getBoundingClientRect().width;

        document.body.removeChild(span);

        return width;
    }

    // ============================================
    // Создание контейнера
    // ============================================

    function createWrapper(cursorColor, width) {

        const wrapper = document.createElement("span");

        wrapper.className = "terminal-wrapper";

        wrapper.style.display = "inline-block";
        wrapper.style.width = width + "px";

        const text = document.createElement("span");
        text.className = "terminal-text";

        const cursor = document.createElement("span");
        cursor.className = "terminal-cursor";
        cursor.style.background = cursorColor;

        wrapper.appendChild(text);
        wrapper.appendChild(cursor);

        return {
            wrapper,
            text,
            cursor
        };

    }

    // ============================================
    // Заголовок
    // ============================================

    const firstWord = fullTitle.split(" ")[0];

    // Ширина только слова "кредитный"
    const titleWidth = measureTextWidth(titleElement, firstWord);

    const title = createWrapper("#ECECEC", titleWidth);

    title.wrapper.style.whiteSpace = "normal";

    titleElement.appendChild(title.wrapper);

    let titleIndex = 0;

    function typeTitle() {

        if (titleIndex < fullTitle.length) {

            title.text.textContent += fullTitle[titleIndex];

            titleIndex++;

            setTimeout(typeTitle, 80);

        } else {

            title.cursor.remove();

            startSubtitle();

        }

    }

    // ============================================
    // Подзаголовок
    // ============================================

    let subtitleWrapperRef = null;

    // Выравниваем левый край подзаголовка по фактической левой границе
    // заголовка (а не по CSS text-align, который на разных экранах
    // даёт разный результат из-за разной ширины родительских блоков)
    function alignSubtitleToTitle() {
        if (!subtitleWrapperRef) return;

        const titleRect = title.wrapper.getBoundingClientRect();
        const subtitleParentRect = subtitleElement.getBoundingClientRect();

        const offset = titleRect.left - subtitleParentRect.left;

        subtitleWrapperRef.style.marginLeft = offset + "px";
    }

    function startSubtitle() {

        // Ширина считается по стилям H3 (подзаголовка), а не H1
        const subtitleWidth = measureTextWidth(subtitleElement, fullSubtitle);

        const subtitle = createWrapper("#F0FF97", subtitleWidth);

        subtitleElement.appendChild(subtitle.wrapper);

        subtitleWrapperRef = subtitle.wrapper;
        alignSubtitleToTitle();

        let subIndex = 0;

        function typeSubtitle() {

            if (subIndex < fullSubtitle.length) {

                subtitle.text.textContent += fullSubtitle[subIndex];

                subIndex++;

                setTimeout(typeSubtitle, 30);

            } else {

                subtitle.cursor.style.animation = "blink 1s step-end infinite";

                animateBullits();

            }

        }

        typeSubtitle();

    }

    // На случай ресайза окна во время тестирования на разных разрешениях —
    // пересчитываем отступ, чтобы края не "разъезжались"
    let resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(alignSubtitleToTitle, 100);
    });

    setTimeout(typeTitle, 300);

})();

// Функция анимации буллитов
function animateBullits() {
    const bullit1 = document.querySelector('.hero-bullit3');
    const bullit2 = document.querySelector('.hero-bullit4');
    if (!bullit1 || !bullit2) return;

    // Анимация первого блока
    bullit1.classList.add('animate');

    // После завершения анимации уголков (0.4с) и текста (1с) запускаем второй блок
    // Для плавности стартуем второй блок через 0.6с после начала первого
    setTimeout(() => {
        bullit2.classList.add('animate');
    }, 600);
}