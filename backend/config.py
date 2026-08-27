"""
Omnikon / Raksha AI — Backend Configuration
"""
import os
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"

# Ensure model directory exists
MODELS_DIR.mkdir(exist_ok=True)

# ── Model Files ────────────────────────────────────────────────
PHISHING_MODEL_PATH = MODELS_DIR / "phishing_baseline.joblib"

# ── ML Thresholds ──────────────────────────────────────────────
THREAT_LEVEL_THRESHOLDS = {
    "CRITICAL": 75,
    "HIGH": 55,
    "MEDIUM": 35,
    "LOW": 15,
    # Below LOW → SAFE
}

# ── Supported Languages ───────────────────────────────────────
SUPPORTED_LANGUAGES = ["en", "kn", "hi", "te", "ta", "code-mixed"]

# ── Scam Archetypes ───────────────────────────────────────────
SCAM_ARCHETYPES = [
    "BESCOM_POWER_CUT",
    "SBI_YONO_KYC",
    "YOUTUBE_JOB",
    "FEDEX_DIGITAL_ARREST",
    "LOAN_APP_BLACKMAIL",
    "UPI_REVERSE_PAYMENT",
    "CUSTOMS_IMPERSONATION",
    "AADHAAR_LINK_FRAUD",
    "OTP_THEFT",
    "INVESTMENT_PONZI",
    "CRYPTO_PONZI",
    "MATRIMONY_SCAM",
    "LEGITIMATE",
    "UNKNOWN",
]

# ── URL Analysis ──────────────────────────────────────────────
SUSPICIOUS_TLDS = {
    ".top", ".xyz", ".click", ".link", ".info", ".online",
    ".site", ".club", ".buzz", ".space", ".fun", ".icu",
    ".live", ".store", ".best", ".rest", ".world",
}

KNOWN_BRANDS = [
    "sbi", "yono", "hdfc", "icici", "axis", "canara", "kotak",
    "bescom", "hescom", "mescom", "paytm", "phonepe", "gpay",
    "google", "amazon", "flipkart", "razorpay", "aadhaar", "uidai",
    "epfo", "fedex", "bluedart", "customs", "cbi", "rbi",
]

SUSPICIOUS_PATH_KEYWORDS = [
    "kyc", "verify", "login", "update", "otp", "secure",
    "confirm", "activate", "unlock", "suspend", "block",
    "pending", "expire", "urgent",
]

URL_SHORTENERS = [
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly",
    "is.gd", "buff.ly", "shorturl.at", "rb.gy",
]

# ── Server ────────────────────────────────────────────────────
API_PREFIX = "/api/v1"
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
]
