document.addEventListener("DOMContentLoaded", function() {
    const bracketUp = document.querySelector('.bracket-up');
    const bracketDown = document.querySelector('.bracket-down');

    setTimeout(() => {
        bracketUp.classList.add('animate');
        bracketDown.classList.add('animate');
    }, 100);
});


document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const highlight = document.querySelector('.highlight');

    const productsbtn = document.querySelector('.products-btn');


    setTimeout(function() {
        heroTitle.classList.add('loaded');

        setTimeout(function() {
         heroDescription.classList.add('loaded');

            setTimeout(function() {
                highlight.classList.add('loaded');

                setTimeout(function() {
                    productsbtn.classList.add('loaded');

                }, 1000);
            
            }, 1000);

        }, 1000);

  }, 500);
});


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


    const header = document.querySelector('.products-header');
    const title = header.querySelector('.products-title');
    const productsBox = document.querySelector('.products-box');
    const productsItem2 = document.querySelector('.products-item2');
    const productsjusttext = document.querySelector('.products-justtext');

    function moveProductItem2() {
        const width = window.innerWidth;

        if (width < 1080) {

            if (productsItem2.parentNode !== header) {
                header.insertBefore(productsItem2, title.nextSibling);
            }
        } else {

            if (productsItem2.parentNode !== productsBox) {
                productsBox.appendChild(productsItem2);
            }
        }
    }


moveProductItem2();

window.addEventListener('resize', moveProductItem2);


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

                answer.classList.remove('active');
                answer.style.height = '0px';
                answer.style.marginBottom = '0px';
                answer.style.paddingBottom = '0px'; 
                button.classList.remove('active');
                question.classList.remove('active');
            } else {

                answer.classList.add('active');
                answer.style.paddingBottom = '12px'; 

                answer.style.height = 'auto';

                const fullHeight = answer.scrollHeight;

                answer.style.height = '0px';

                void answer.offsetHeight;

                answer.style.height = fullHeight + 'px';

                button.classList.add('active');
                question.classList.add('active');


                console.log('margin-bottom после установки:', window.getComputedStyle(answer).paddingBottom);
                console.log('fullHeight:', fullHeight);
            }
        });
    });
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


    const presentationBtns = document.querySelectorAll('.presentation-btn777');
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


document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth < 730;

    const line = document.querySelector('.line');
    const transitionText = document.querySelector('.transition-text');

    if (isMobile) {

        if (line) line.classList.add('line--visible');
        if (transitionText) transitionText.classList.add('transition-text--visible');
        return;
    }


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

    if (transitionText) {
        const observerText = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    transitionText.classList.add('transition-text--visible');
                    observerText.unobserve(transitionText);
                }
            });
        }, { threshold: 0.8 });
        observerText.observe(transitionText);
    }
});



document.addEventListener('DOMContentLoaded', () => {

    const trustBlocks = document.querySelectorAll(
        '.trust-textblock, .trust-textblock2, .trust-textblock3, .trust-textblock4'
    );
    
    if (trustBlocks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('trust-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.9 });
        
        trustBlocks.forEach(block => observer.observe(block));
    }
});


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