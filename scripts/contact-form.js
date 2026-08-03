// --Подставьте адрес, по которому будет доступен ваш FastAPI-бэкенд--
const CONTACT_API_URL = '/api/contact';

// --- Кастомный alert (вместо браузерного alert()) ---
const alertOverlay = document.getElementById('alertOverlay');
const alertIcon = document.getElementById('alertIcon');
const alertMessage = document.getElementById('alertMessage');
const alertOkBtn = document.getElementById('alertOkBtn');

function showCustomAlert(message, type = 'success') {
    alertMessage.textContent = message;
    alertIcon.textContent = type === 'success' ? '✓' : '✕';
    alertIcon.className = 'alert-icon ' + type;
    alertOverlay.classList.add('active');
    document.body.classList.add('modal-open');
}

function hideCustomAlert() {
    alertOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
}

alertOkBtn.addEventListener('click', hideCustomAlert);
alertOverlay.addEventListener('click', function (e) {
    if (e.target === alertOverlay) hideCustomAlert();
});

// Отправка формы...
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);

    const payload = {
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone') || null,
        message: formData.get('message') || null,
        privacy_policy: formData.get('privacy_policy') === 'on',
        personal_data_consent: formData.get('personal_data_consent') === 'on',
    };

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'ОТПРАВКА...';

    try {
        const response = await fetch(CONTACT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || 'Ошибка отправки формы');
        }

        form.reset();
        document.getElementById('modalOverlay').classList.remove('active');
        showCustomAlert('Спасибо! Ваше сообщение отправлено, мы свяжемся с вами в ближайшее время.', 'success');

    } catch (err) {
        showCustomAlert('Не удалось отправить форму: ' + err.message, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

