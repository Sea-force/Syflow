(function () {
    const CONSENT_KEY = 'cookieConsent'; 

    function getConsent() {
        try {
            return localStorage.getItem(CONSENT_KEY);
        } catch (e) {
            return null;
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(CONSENT_KEY, value);
        } catch (e) {

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

            showBanner();
        } else if (consent === 'accepted') {

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
