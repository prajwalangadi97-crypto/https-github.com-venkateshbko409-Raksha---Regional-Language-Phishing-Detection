"""
Omnikon / Raksha AI — FastAPI Backend Server
Entry point: uvicorn main:app --reload --port 8000
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import API_PREFIX, CORS_ORIGINS
from schemas import HealthResponse
from ml.phishing_classifier import classifier

# ── API Router Imports ──────────────────────────────────────────
from api.phishing import router as phishing_router
from api.url_analysis import router as url_router
from api.voice import router as voice_router
from api.honeypot import router as honeypot_router
from api.breach import router as breach_router
from api.incident import router as incident_router
from api.data_endpoints import router as data_router
from api.ocr import router as ocr_router
from api.apk_analyzer import router as apk_router


# ── App Lifespan ────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML model on startup."""
    loaded = classifier.load()
    if loaded:
        print("[OK] Phishing ML model loaded successfully")
    else:
        print("[WARN] Phishing ML model not found -- run: python -m ml.train_baseline")
    yield


# ── App ─────────────────────────────────────────────────────────
app = FastAPI(
    title="Omnikon — Raksha AI API",
    description="Regional Language Phishing Detection & Cyber Threat Intelligence Backend",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS Middleware ─────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Mount Routers ───────────────────────────────────────────────
app.include_router(phishing_router, prefix=API_PREFIX)
app.include_router(url_router, prefix=API_PREFIX)
app.include_router(voice_router, prefix=API_PREFIX)
app.include_router(honeypot_router, prefix=API_PREFIX)
app.include_router(breach_router, prefix=API_PREFIX)
app.include_router(incident_router, prefix=API_PREFIX)
app.include_router(data_router, prefix=API_PREFIX)
app.include_router(ocr_router, prefix=API_PREFIX)
app.include_router(apk_router, prefix=API_PREFIX)


# ── Health Check ────────────────────────────────────────────────
@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="ok",
        version="1.0.0",
        model_loaded=classifier.is_loaded,
    )


@app.get("/")
async def root():
    return {
        "name": "Omnikon — Raksha AI API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
    }
