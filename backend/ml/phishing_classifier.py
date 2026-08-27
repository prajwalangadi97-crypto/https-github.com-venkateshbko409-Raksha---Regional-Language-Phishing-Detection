"""
Omnikon / Raksha AI — Phishing Classifier
TF-IDF + Logistic Regression baseline for multilingual phishing detection.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

from ml.indic_processor import normalize_indic_text, detect_language, extract_entities, detect_coercion_triggers
from config import PHISHING_MODEL_PATH, THREAT_LEVEL_THRESHOLDS


# ── Archetype Explanation Templates ─────────────────────────────
ARCHETYPE_EXPLANATIONS: dict[str, dict[str, str]] = {
    "BESCOM_POWER_CUT": {
        "en": "This message impersonates BESCOM/HESCOM and threatens power disconnection to create panic. Electricity boards never send payment links via SMS or ask for UPI transfers.",
        "kn": "ಈ ಸಂದೇಶವು ಬೆಸ್ಕಾಂ ಅನ್ನು ಅನುಕರಿಸಿ ವಿದ್ಯುತ್ ಕಡಿತದ ಬೆದರಿಕೆ ಹಾಕುತ್ತದೆ. ಬೆಸ್ಕಾಂ ಎಂದಿಗೂ SMS ಮೂಲಕ ಪಾವತಿ ಲಿಂಕ್ ಕಳುಹಿಸುವುದಿಲ್ಲ.",
    },
    "SBI_YONO_KYC": {
        "en": "This is a fake banking KYC update scam. Banks never send KYC links via SMS. Always use the official banking app.",
        "kn": "ಇದು ನಕಲಿ ಬ್ಯಾಂಕ್ KYC ಅಪ್‌ಡೇಟ್ ವಂಚನೆ. ಬ್ಯಾಂಕ್‌ಗಳು ಎಂದಿಗೂ SMS ಮೂಲಕ KYC ಲಿಂಕ್ ಕಳುಹಿಸುವುದಿಲ್ಲ.",
    },
    "YOUTUBE_JOB": {
        "en": "This is a task-based job scam. They pay small amounts initially to build trust, then demand large deposits. No legitimate company pays for liking videos.",
        "kn": "ಇದು ಕಾರ್ಯ ಆಧಾರಿತ ಉದ್ಯೋಗ ವಂಚನೆ. ನಂಬಿಕೆ ಬೆಳೆಸಲು ಸಣ್ಣ ಮೊತ್ತ ಪಾವತಿಸಿ ನಂತರ ದೊಡ್ಡ ಠೇವಣಿ ಕೇಳುತ್ತಾರೆ.",
    },
    "FEDEX_DIGITAL_ARREST": {
        "en": "This is a Digital Arrest scam. No law enforcement agency conducts arrests via phone/video call. CBI/Police will never ask for money transfers.",
        "kn": "ಇದು ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ವಂಚನೆ. ಯಾವ ಕಾನೂನು ಜಾರಿ ಸಂಸ್ಥೆಯೂ ಫೋನ್/ವೀಡಿಯೋ ಕರೆ ಮೂಲಕ ಬಂಧಿಸುವುದಿಲ್ಲ.",
    },
    "LOAN_APP_BLACKMAIL": {
        "en": "This is a predatory loan app scam. They access your contacts and photos to blackmail you. Uninstall the app and report to police.",
        "kn": "ಇದು ಹಿಂಸಾತ್ಮಕ ಸಾಲ ಆ್ಯಪ್ ವಂಚನೆ. ಅವರು ನಿಮ್ಮ ಸಂಪರ್ಕಗಳು ಮತ್ತು ಫೋಟೋಗಳನ್ನು ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್‌ಗೆ ಬಳಸುತ್ತಾರೆ.",
    },
    "UPI_REVERSE_PAYMENT": {
        "en": "This is a UPI reverse payment scam. UPI credits are automatic — there is no 'accept' button. The link sends money FROM your account.",
        "kn": "ಇದು UPI ರಿವರ್ಸ್ ಪೇಮೆಂಟ್ ವಂಚನೆ. UPI ಕ್ರೆಡಿಟ್‌ಗಳು ಸ್ವಯಂಚಾಲಿತ — 'ಒಪ್ಪಿಕೊಳ್ಳಿ' ಬಟನ್ ಇಲ್ಲ.",
    },
    "CUSTOMS_IMPERSONATION": {
        "en": "This is a customs impersonation scam. Indian Customs never calls to threaten arrest or demand immediate payment.",
        "kn": "ಇದು ಕಸ್ಟಮ್ಸ್ ಅನುಕರಣೆ ವಂಚನೆ. ಭಾರತೀಯ ಕಸ್ಟಮ್ಸ್ ಎಂದಿಗೂ ಬಂಧನ ಬೆದರಿಕೆ ಹಾಕಲು ಕರೆ ಮಾಡುವುದಿಲ್ಲ.",
    },
    "AADHAAR_LINK_FRAUD": {
        "en": "This is an Aadhaar linking fraud. UIDAI never asks for Aadhaar details over phone or SMS.",
        "kn": "ಇದು ಆಧಾರ್ ಲಿಂಕಿಂಗ್ ವಂಚನೆ. UIDAI ಎಂದಿಗೂ ಫೋನ್ ಅಥವಾ SMS ಮೂಲಕ ಆಧಾರ್ ವಿವರಗಳನ್ನು ಕೇಳುವುದಿಲ್ಲ.",
    },
    "OTP_THEFT": {
        "en": "This is an OTP theft attempt. Never share OTP with anyone. Banks and companies never ask for OTP over phone.",
        "kn": "ಇದು OTP ಕಳ್ಳತನ ಪ್ರಯತ್ನ. ಯಾರಿಗೂ OTP ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಬ್ಯಾಂಕ್‌ಗಳು ಫೋನ್ ಮೂಲಕ OTP ಕೇಳುವುದಿಲ್ಲ.",
    },
    "INVESTMENT_PONZI": {
        "en": "This is a Ponzi/investment scam. No legitimate investment guarantees fixed daily returns. You will lose all invested money.",
        "kn": "ಇದು ಪೋಂಜಿ/ಹೂಡಿಕೆ ವಂಚನೆ. ಯಾವ ಕಾನೂನುಬದ್ಧ ಹೂಡಿಕೆಯೂ ಸ್ಥಿರ ದೈನಂದಿನ ಆದಾಯವನ್ನು ಖಾತ್ರಿಪಡಿಸುವುದಿಲ್ಲ.",
    },
    "CRYPTO_PONZI": {
        "en": "This is a cryptocurrency Ponzi scheme. No trading bot guarantees profits. Crypto investments carry high risk and no platform can guarantee returns. Your deposited funds will be stolen.",
        "kn": "ಇದು ಕ್ರಿಪ್ಟೋಕರೆನ್ಸಿ ಪೋಂಜಿ ಯೋಜನೆ. ಯಾವ ಟ್ರೇಡಿಂಗ್ ಬಾಟ್ ಲಾಭವನ್ನು ಖಾತ್ರಿಪಡಿಸುವುದಿಲ್ಲ. ನಿಮ್ಮ ಠೇವಣಿ ಹಣವನ್ನು ಕದಿಯಲಾಗುವುದು.",
    },
    "MATRIMONY_SCAM": {
        "en": "This is a matrimony/romance scam. Scammers create fake profiles to build emotional trust and then demand money for travel, visa, or emergency expenses. Never send money to someone you have not met in person.",
        "kn": "ಇದು ವೈವಾಹಿಕ/ರೊಮ್ಯಾನ್ಸ್ ವಂಚನೆ. ವಂಚಕರು ಭಾವನಾತ್ಮಕ ನಂಬಿಕೆ ಬೆಳೆಸಲು ನಕಲಿ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ ನಂತರ ಹಣ ಕೇಳುತ್ತಾರೆ. ನೇರವಾಗಿ ಭೇಟಿಯಾಗದ ವ್ಯಕ್ತಿಗೆ ಹಣ ಕಳುಹಿಸಬೇಡಿ.",
    },
    "LEGITIMATE": {
        "en": "This message appears to be legitimate. No scam indicators detected.",
        "kn": "ಈ ಸಂದೇಶವು ಕಾನೂನುಬದ್ಧವಾಗಿ ಕಾಣುತ್ತದೆ. ಯಾವುದೇ ವಂಚನೆ ಸೂಚಕಗಳು ಪತ್ತೆಯಾಗಿಲ್ಲ.",
    },
    "UNKNOWN": {
        "en": "This message contains some suspicious patterns but does not match a known scam archetype. Exercise caution.",
        "kn": "ಈ ಸಂದೇಶವು ಕೆಲವು ಅನುಮಾನಾಸ್ಪದ ಮಾದರಿಗಳನ್ನು ಹೊಂದಿದೆ. ಜಾಗರೂಕರಾಗಿರಿ.",
    },
}

RECOMMENDATIONS: dict[str, dict[str, list[str]]] = {
    "CRITICAL": {
        "en": [
            "Do NOT click any links in this message.",
            "Block the sender immediately.",
            "Report to Cyber Crime Helpline 1930.",
            "If money was sent, contact your bank's nodal officer within the Golden Hour.",
        ],
        "kn": [
            "ಈ ಸಂದೇಶದಲ್ಲಿರುವ ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.",
            "ಕಳುಹಿಸಿದವರನ್ನು ತಕ್ಷಣ ಬ್ಲಾಕ್ ಮಾಡಿ.",
            "1930 ಸೈಬರ್ ಕ್ರೈಮ್ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ದೂರು ನೀಡಿ.",
            "ಹಣ ಕಳುಹಿಸಿದ್ದರೆ ಗೋಲ್ಡನ್ ಅವರ್‌ನಲ್ಲಿ ಬ್ಯಾಂಕ್ ನೋಡಲ್ ಆಫೀಸರ್‌ಗೆ ಸಂಪರ್ಕಿಸಿ.",
        ],
    },
    "HIGH": {
        "en": [
            "Do not respond to this message.",
            "Block the sender.",
            "Report to cybercrime.gov.in.",
        ],
        "kn": [
            "ಈ ಸಂದೇಶಕ್ಕೆ ಉತ್ತರಿಸಬೇಡಿ.",
            "ಕಳುಹಿಸಿದವರನ್ನು ಬ್ಲಾಕ್ ಮಾಡಿ.",
            "cybercrime.gov.in ನಲ್ಲಿ ದೂರು ನೀಡಿ.",
        ],
    },
    "MEDIUM": {
        "en": [
            "Verify the sender through official channels before responding.",
            "Do not share any personal information.",
        ],
        "kn": [
            "ಉತ್ತರಿಸುವ ಮೊದಲು ಅಧಿಕೃತ ಮಾರ್ಗಗಳ ಮೂಲಕ ಕಳುಹಿಸಿದವರನ್ನು ಪರಿಶೀಲಿಸಿ.",
            "ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
        ],
    },
    "LOW": {
        "en": ["Exercise general caution with this message."],
        "kn": ["ಈ ಸಂದೇಶದ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಎಚ್ಚರಿಕೆ ವಹಿಸಿ."],
    },
    "SAFE": {
        "en": ["This message appears safe. No action needed."],
        "kn": ["ಈ ಸಂದೇಶ ಸುರಕ್ಷಿತವಾಗಿ ಕಾಣುತ್ತದೆ. ಯಾವುದೇ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ."],
    },
}


class PhishingClassifier:
    """TF-IDF + Logistic Regression phishing classifier."""

    def __init__(self):
        self.pipeline: Pipeline | None = None
        self._loaded = False

    def load(self) -> bool:
        """Load a pre-trained model from disk."""
        if PHISHING_MODEL_PATH.exists():
            self.pipeline = joblib.load(PHISHING_MODEL_PATH)
            self._loaded = True
            return True
        return False

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    def predict(self, text: str) -> dict:
        """
        Run phishing analysis on input text.
        Returns a full analysis dict compatible with PhishingAnalysisResponse.
        """
        if not self._loaded or self.pipeline is None:
            raise RuntimeError("Model not loaded. Run train_baseline.py first.")

        # Preprocess
        normalized = normalize_indic_text(text)
        language = detect_language(text)
        entities = extract_entities(text)
        coercion = detect_coercion_triggers(text)

        # Predict archetype probabilities
        proba = self.pipeline.predict_proba([normalized])[0]
        classes = self.pipeline.classes_

        predicted_idx = int(np.argmax(proba))
        predicted_label = str(classes[predicted_idx])
        confidence = float(proba[predicted_idx])

        # Convert confidence to 0-100 score
        overall_score = int(confidence * 100)

        # If predicted LEGITIMATE, lower the score
        if predicted_label == "LEGITIMATE":
            overall_score = max(0, 100 - overall_score)

        # Boost score if entities found
        if entities["urls"]:
            overall_score = min(100, overall_score + 10)
        if entities["upiIds"]:
            overall_score = min(100, overall_score + 8)
        if entities["phones"]:
            overall_score = min(100, overall_score + 3)

        # Determine threat level
        if predicted_label == "LEGITIMATE" and confidence > 0.6:
            threat_level = "SAFE"
            overall_score = min(overall_score, 14)
        elif overall_score >= THREAT_LEVEL_THRESHOLDS["CRITICAL"]:
            threat_level = "CRITICAL"
        elif overall_score >= THREAT_LEVEL_THRESHOLDS["HIGH"]:
            threat_level = "HIGH"
        elif overall_score >= THREAT_LEVEL_THRESHOLDS["MEDIUM"]:
            threat_level = "MEDIUM"
        elif overall_score >= THREAT_LEVEL_THRESHOLDS["LOW"]:
            threat_level = "LOW"
        else:
            threat_level = "SAFE"

        # Final archetype
        scam_archetype = predicted_label if predicted_label != "LEGITIMATE" else "UNKNOWN"
        if threat_level == "SAFE":
            scam_archetype = "UNKNOWN"

        # Explanations
        explanations = ARCHETYPE_EXPLANATIONS.get(
            predicted_label, ARCHETYPE_EXPLANATIONS["UNKNOWN"]
        )
        recs = RECOMMENDATIONS.get(threat_level, RECOMMENDATIONS["SAFE"])

        return {
            "inputText": text,
            "language": language,
            "threatLevel": threat_level,
            "overallScore": overall_score,
            "scamArchetype": scam_archetype,
            "coercionTriggers": coercion,
            "suspiciousEntities": entities,
            "explanation": explanations["en"],
            "explanationKn": explanations["kn"],
            "recommendations": recs["en"],
            "recommendationsKn": recs["kn"],
        }


# ── Singleton ───────────────────────────────────────────────────
classifier = PhishingClassifier()
