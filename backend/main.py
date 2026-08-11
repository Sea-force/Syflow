import os
import smtplib
import ssl
from email.message import EmailMessage
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.base import BaseHTTPMiddleware

load_dotenv()

# --- Настройки SMTP берутся из переменных окружения (.env) ---
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
MAIL_TO = os.getenv("MAIL_TO", "syflow@mail.ru")

# Единственная "правильная" версия домена, на которую редиректим всё остальное
CANONICAL_HOST = "syflow.ru"

# Список доменов, с которых разрешено обращаться к API (ваш сайт)
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
]

app = FastAPI(title="Contact form API")

BASE_DIR = Path(__file__).resolve().parent.parent

app.mount("/styles", StaticFiles(directory=BASE_DIR / "styles"), name="styles")
app.mount("/scripts", StaticFiles(directory=BASE_DIR / "scripts"), name="scripts")
app.mount("/images", StaticFiles(directory=BASE_DIR / "images"), name="images")
app.mount("/fonts", StaticFiles(directory=BASE_DIR / "fonts"), name="fonts")
app.mount("/resources", StaticFiles(directory=BASE_DIR / "resources"), name="resources")

@app.get("/", include_in_schema=False)
async def index():
    return FileResponse(BASE_DIR / "index.html")


@app.get("/index.html", include_in_schema=False)
async def index_html():
    return FileResponse(BASE_DIR / "index.html")


@app.get("/finaction.html", include_in_schema=False)
async def finaction():
    return FileResponse(BASE_DIR / "finaction.html")


@app.get("/creditportfolio.html", include_in_schema=False)
async def creditportfolio():
    return FileResponse(BASE_DIR / "creditportfolio.html")


@app.get("/policy.html", include_in_schema=False)
async def policy():
    return FileResponse(BASE_DIR / "policy.html")


@app.get("/soglasie.html", include_in_schema=False)
async def soglasie():
    return FileResponse(BASE_DIR / "soglasie.html")


@app.get("/favicon.svg", include_in_schema=False)
async def favicon():
    return FileResponse(BASE_DIR / "favicon.svg")


class CanonicalDomainMiddleware(BaseHTTPMiddleware):
    """
    Редиректит:
      - www.syflow.ru -> syflow.ru
      - http (если это видно по заголовку X-Forwarded-Proto) -> https

    Amvera терминирует SSL на своём входном контроллере (nginx) и передаёт
    запрос дальше уже как обычный HTTP. Поэтому смотреть на
    request.url.scheme бесполезно — он почти всегда будет "http", даже
    если пользователь зашёл по https. Чтобы понять, каким был запрос
    на самом деле, нужно смотреть заголовок X-Forwarded-Proto.

    Редирект на https делаем только если заголовок ЯВНО говорит "http" —
    если заголовка нет вовсе, лучше ничего не редиректить, чем случайно
    уйти в петлю редиректов.
    """

    async def dispatch(self, request: Request, call_next):
        host = request.headers.get("host", "").split(":")[0].lower()
        forwarded_proto = request.headers.get("x-forwarded-proto", "").lower()

        wrong_host = host and host != CANONICAL_HOST
        explicitly_http = forwarded_proto == "http"

        if wrong_host or explicitly_http:
            new_url = f"https://{CANONICAL_HOST}{request.url.path}"
            if request.url.query:
                new_url += f"?{request.url.query}"
            return RedirectResponse(new_url, status_code=301)

        return await call_next(request)


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Добавляем ПОСЛЕ CORSMiddleware, чтобы он оказался внешним слоем
# и редирект срабатывал раньше, чем запрос дойдёт до CORS-проверки.
app.add_middleware(CanonicalDomainMiddleware)


class ContactForm(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    company: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str | None = None
    message: str | None = None
    privacy_policy: bool
    personal_data_consent: bool


def build_email_body(form: ContactForm) -> str:
    return (
        "Новая заявка с сайта\n\n"
        f"Имя: {form.name}\n"
        f"Компания: {form.company}\n"
        f"Email: {form.email}\n"
        f"Телефон: {form.phone or '-'}\n"
        f"Сообщение: {form.message or '-'}\n\n"
        f"Согласие с политикой обработки ПД: {'да' if form.privacy_policy else 'нет'}\n"
        f"Согласие на обработку персональных данных: {'да' if form.personal_data_consent else 'нет'}\n"
    )


def send_email(form: ContactForm) -> None:
    if not all([SMTP_HOST, SMTP_USER, SMTP_PASSWORD]):
        raise HTTPException(
            status_code=500,
            detail="SMTP не настроен на сервере (проверьте .env)",
        )

    msg = EmailMessage()
    msg["Subject"] = f"Новое обращение с сайта от {form.name}"
    msg["From"] = SMTP_USER
    msg["To"] = MAIL_TO
    msg["Reply-To"] = form.email
    msg.set_content(build_email_body(form))

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500, detail=f"Не удалось отправить письмо: {exc}"
        ) from exc


@app.post("/api/contact")
async def contact(form: ContactForm):
    if not form.privacy_policy or not form.personal_data_consent:
        raise HTTPException(
            status_code=400,
            detail="Необходимо согласие с политикой и обработкой персональных данных",
        )

    send_email(form)
    return {"status": "ok"}


@app.get("/api/health")
async def health():
    return {"status": "ok"}
