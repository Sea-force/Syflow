

function openModal() {
    const modal = document.getElementById('modalOverlay2');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal() {
    const modal = document.getElementById('modalOverlay2');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }
}


    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }


document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay2 = document.getElementById('modalOverlay2');
    if (modalOverlay2) {
        modalOverlay2.addEventListener('click', function(e) {
            if (e.target === modalOverlay2) {
                closeModal();
            }
        });
    }


    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay2 && modalOverlay2.classList.contains('active')) {
            closeModal();
        }
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    if (!video) return;


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



(function() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollTop = 0;
    let headerHeight = header.offsetHeight;


    function fixHeader() {
        if (!header.classList.contains('header-fixed')) {
            header.classList.add('header-fixed');
            document.body.classList.add('header-fixed-padding');
        }
    }


    function unfixHeader() {
        if (header.classList.contains('header-fixed')) {
            header.classList.remove('header-fixed');
            document.body.classList.remove('header-fixed-padding');
        }
    }

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;


        if (scrollTop < lastScrollTop && scrollTop > 0) {

            fixHeader();
        } 
        else if (scrollTop > lastScrollTop && header.classList.contains('header-fixed')) {

            unfixHeader();
        }


        if (scrollTop === 0) {
            unfixHeader();
        }

        lastScrollTop = scrollTop;
    });



})();



document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-circle');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;
    let currentScale = 1;
    let targetScale = 1;
    const smoothFactor = 0.06;
    const scaleSmooth = 0.2;


    function getBackgroundColor(element) {

        if (!element || element === document.body) {
            return getComputedStyle(document.body).backgroundColor;
        }
        const bgColor = getComputedStyle(element).backgroundColor;

        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            return getBackgroundColor(element.parentElement);
        }
        return bgColor;
    }

    function getLuminance(rgbColor) {

        const match = rgbColor.match(/\d+/g);
        if (!match) return 128;
        let [r, g, b] = match.map(Number);

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function updateCursorColor(x, y) {

        const elem = document.elementsFromPoint(x, y)[0];
        if (!elem) return;
        const bgColor = getBackgroundColor(elem);
        const luminance = getLuminance(bgColor);

        if (luminance < 128) {
            cursor.style.backgroundColor = 'var(--light)';
        } else {
            cursor.style.backgroundColor = 'var(--dark)';
        }
    }


    function animate() {
        circleX += (mouseX - circleX) * smoothFactor;
        circleY += (mouseY - circleY) * smoothFactor;
        currentScale += (targetScale - currentScale) * scaleSmooth;
        cursor.style.transform = `translate3d(${circleX - 10}px, ${circleY - 10}px, 0) scale(${currentScale})`;
        requestAnimationFrame(animate);
    }


    document.addEventListener('mousemove', function(e) {
        if (cursor.style.opacity !== '1') cursor.style.opacity = '1';
        mouseX = e.clientX;
        mouseY = e.clientY;

        updateCursorColor(e.clientX, e.clientY);
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');


    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => targetScale = 0);
        button.addEventListener('mouseleave', () => targetScale = 1);
    });


    const links = document.querySelectorAll('a');
    links.forEach(link => {
    link.addEventListener('mouseenter', () => targetScale = 0);
    link.addEventListener('mouseleave', () => targetScale = 1);
});


    animate();
});



document.addEventListener('DOMContentLoaded', function() {

    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const form = document.getElementById('contactForm');
    const formTextElement = document.querySelector('.form-text');

    const texts = {
        connect: 'При возникновении вопросов, пожалуйста, оставьте свои контактные данные и сообщение. Вернемся к вам с обратной связью в ближайшее время.',
        presentation: 'Для демонстрации продуктов, пожалуйста, оставьте свои контактные данные, и при необходимости напишите свои пожелания. Мы свяжемся с вами в ближайшее время для согласования удобного времени и формата.'
    };


    function openModal(text) {
        if (formTextElement) {
            formTextElement.textContent = text;
        }
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }


    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');


    }


    const connectBtns = document.querySelectorAll('.connect-btn');
    connectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(texts.connect);
        });
    });


    const presentationBtns = document.querySelectorAll('.presentation-btn');
    presentationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(texts.presentation);
        });
    });


    const demoBtns = document.querySelectorAll('.demo-btn');
    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(texts.presentation);
        });
    });


    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }


    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });


});




(function() {
    const titleElement = document.getElementById('terminal-title');
    const subtitleElement = document.getElementById('terminal-subtitle');
    if (!titleElement || !subtitleElement) return;

    const fullTitle = 'finaction';
    const fullSubtitle = 'автоматизируй финансовый анализ';


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


    const fixedWidth = measureTextWidth(titleElement, fullTitle);


    const titleWrap = createWrapperAndCursor('#ECECEC', fixedWidth);
    titleElement.appendChild(titleWrap.wrapper);
    let titleCurrent = 0;

    function typeTitle() {
        if (titleCurrent < fullTitle.length) {
            titleWrap.textSpan.textContent += fullTitle[titleCurrent];
            titleCurrent++;
            setTimeout(typeTitle, 80);
        } else {

            if (titleWrap.cursorSpan && titleWrap.cursorSpan.parentNode) {
                titleWrap.cursorSpan.remove();
            }
            startSubtitleTyping();
        }
    }

    function startSubtitleTyping() {

        const subWrap = createWrapperAndCursor('#F0FF97', fixedWidth);
        subtitleElement.appendChild(subWrap.wrapper);
        let subCurrent = 0;

        function typeSubtitle() {
            if (subCurrent < fullSubtitle.length) {
                subWrap.textSpan.textContent += fullSubtitle[subCurrent];
                subCurrent++;
                setTimeout(typeSubtitle, 30);
            } else {

                if (subWrap.cursorSpan) {
                    subWrap.cursorSpan.style.animation = 'blink 1s step-end infinite';
                }


            animateBullits();
            }
        }
        typeSubtitle();
    }

    setTimeout(typeTitle, 300);
})();


function animateBullits() {
    const bullit1 = document.querySelector('.hero-bullit1');
    const bullit2 = document.querySelector('.hero-bullit2');
    if (!bullit1 || !bullit2) return;
    

    bullit1.classList.add('animate');
    


    setTimeout(() => {
        bullit2.classList.add('animate');
    }, 600);
}




document.addEventListener('DOMContentLoaded', () => {
  const sectionTitle = document.querySelector('.section-title');
  const decisionItems = document.querySelectorAll('.decision-item');
  const details = document.querySelectorAll('.details');
  const dashboard = document.querySelectorAll('.dashboard');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  if (sectionTitle) observer.observe(sectionTitle);


  details.forEach(item => observer.observe(item));

  decisionItems.forEach(item => observer.observe(item));

  dashboard.forEach(item => observer.observe(item));
});



document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero-finaction'); 
  const arrow = document.querySelector('.arrow');
  
  if (!heroSection || !arrow) return;

  let triggered = false; 

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (!triggered && entry.intersectionRatio <= 0.8) {
        arrow.classList.add('visible');
        triggered = true;

        observer.unobserve(heroSection);
      }
    });
  }, {
    threshold: 0.8 
  });

  observer.observe(heroSection);
});


document.addEventListener('DOMContentLoaded', () => {
    const strikeWord = document.querySelector('.strike-word');
    const decisionItem = document.querySelector('.decision-item');
    
    if (!strikeWord || !decisionItem) return;


    strikeWord.style.setProperty('--strike-percent', 0);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio; 
            let percent = Math.floor(ratio * 100);

            percent = Math.min(100, Math.max(0, percent));
            strikeWord.style.setProperty('--strike-percent', percent);
        });
    }, {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100) 
    });

    observer.observe(decisionItem);
});


function goToOtherServices(event) {
    if (event) event.preventDefault();


    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        scrollToOtherServices();
    } else {

        window.location.href = 'index.html#other-services';
    }
}

function scrollToOtherServices() {

    closeModal()
    
    const target = document.getElementById('other-services');
    if (!target) return;


    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}


window.addEventListener('load', () => {
    if (window.location.hash === '#other-services') {
        setTimeout(scrollToOtherServices, 100);
    }
});