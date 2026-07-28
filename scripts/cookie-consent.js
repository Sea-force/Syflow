(function () {
    const CONSENT_KEY = 'cookieConsent'; // хранит 'accepted' или 'declined'

    function getConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY);
        } catch (e) {
            return null; // на случай, если localStorage недоступен (приватный режим и т.п.)
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(CONSENT_KEY, value);
        } catch (e) {
            // тихо игнорируем — в худшем случае баннер будет появляться каждый раз
        }
    }

    function showBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) banner.classList.add('active');
    }

    function hideBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) banner.classList.remove('active');
    }

    document.addEventListener('DOMContentLoaded', function () {
        const consent = getConsent();

        if (!consent) {
            // решение ещё не принято — показываем баннер
            showBanner();
        } else if (consent === 'accepted') {
            // согласие уже было дано ранее — сразу сигналим об этом
            document.dispatchEvent(new CustomEvent('cookieConsentAccepted'));
        }

        const acceptBtn = document.getElementById('cookieAcceptBtn');
        const declineBtn = document.getElementById('cookieDeclineBtn');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', function () {
                setConsent('accepted');
                hideBanner();
                document.dispatchEvent(new CustomEvent('cookieConsentAccepted'));
            });
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', function () {
                setConsent('declined');
                hideBanner();
            });
        }
    });
})();
